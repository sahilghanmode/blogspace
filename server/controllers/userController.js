import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import { compare } from "bcrypt";

const maxAge = 30 * 24 * 60 * 60 * 1000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thorsthorkel@gmail.com',
        pass: 'zksl gett jana gtue'
    }
});

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: maxAge })
};

export const login=async(req,res)=>{
    try {

        const {usernameoremail, password}=req.body
        if(!usernameoremail || !password){
            return res.status(400).json({success:false, message:"Username/Email and password is required"})
        }
        const user=await User.findOne({email:usernameoremail})
        if(!user){
            user=await User.findOne({username:usernameoremail})
        }
        
        if(!user){
            return res.status(400).json({success:false, message:"username or email does not match"})
        }

        if(!user.isVerified){
            return res.status(400).json({success:false, message:"User is not verified"})
        }   

        const auth =await compare(password, user.password)
        if(!auth){
            return res.status(400).json({success:false,message:"Password does not match"})
        }

        res.cookie("authToken",createToken(email, user.id),{
            maxAge,
            secure:true,
            sameSite:"None"
        })


        
    } catch (error) {
        console.log("error in login controller",{error})
        return res.status(500).json({success:false, message:"Something went wrong"})
    }
}

export const sendOtp=async(req,res)=>{
    try {

        const {email}=req.body;
        if(!email){
            return res.status(400).json({success:false, message:"email is required"})
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false, message:"user not found"})
        }
        if(user.otp.attempts>=5){
            return res.status(400).json({success:false, message:"too many attempts try again later"})
        }

        const otp=user.generateOTP()
        await user.save()

        const mailOptions = {
            from: 'thorsthorkel@gmail.com',
            to: email,
            subject: 'Your OTP Verification Code',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>OTP Verification</h2>
                <p>Your One-Time Password (OTP) for verification is:</p>
                <h1 style="color: #4a90e2; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
                <p>This OTP will expire in 15 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({success:true, message:"otp sent successfully"})

        
    } catch (error) {
        console.log("error in sendOtp controller",{error})
        return res.status(500).json({success:false, message:"Something went wrong"})
    }
}

export const verifyOtp = async (req, res) => {

    try {
        const { email, otp } = req.body

        if (!email) {
            res.status(400).json({
                success: false,
                message: "email is missing"
            })
        }

        if (!otp) {
            res.status(400).json({
                success: false,
                message: "otp is required"
            })
        }

        const user = await User.findOne({ email }).select('-password')

        user.incrementOTPAttempts();

        if (user.otp.attempts >= 5) {
            user.clearOTP();
            await user.save();

            return res.status(400).json({
                success: false,
                message: "Too many failed attempts. Please request a new OTP."
            });
        }

        if (!user.isOTPValid(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        user.isVerified = true;
        user.clearOTP();
        await user.save();
        console.log("control is here")

        res.cookie("authToken", createToken(email, user.id),{
            maxAge,
            secure: true,
            sameSite: "None"
        })

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user
        });


    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({
            success: false,
            message: "Failed to verify OTP",
            error: error.message
        });
    }

}

export const Signup=async(req,res)=>{
    try {
        const {email,password,username}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false, message:"email and password are required"})
        }

        const usernameAvailable=await User.findOne({username})
        if(usernameAvailable){
            return res.status(409).json({success:false, message:"Username already exists"})
        }
        const emailAvailable=await User.findOne({email})
        if(emailAvailable){
            return res.status(400).json({success:false, message:"Email is already in Use please log in"})
        }
        const user=await User.create({email,password, username})
        
        return res.status(200).json({success:true, user})

    } catch (error) {
        console.log("error in signup controller ",{error})
        return res.status(500).json({success:false, message:"Something went wrong"})
    }
}

export const forgotPassword=async(req,res)=>{
    try {
        const {email}=req.body;
        if(!email){
            return res.status(400).json({success:false,message:"Email is required"})
        }

         
    } catch (error) {
        console.log("error in forgot password controller",{error})
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}