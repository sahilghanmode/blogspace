import { Router } from "express";
import { sendOtp, Signup, verifyOtp } from "../controllers/userController.js";

const userRoutes=Router()

userRoutes.post('/signup',Signup)

userRoutes.post('/verify',verifyOtp)

userRoutes.post('/send-otp',sendOtp)

export default userRoutes