import { genSalt, hash } from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    password:{
      type:String,
      required:[true,"Password is required"],
      minLength:[8, "Password must be at least 8 characters long"]
    },
    otp: {
        code: {
          type: String
        },
        expiresAt: {
          type: Date
        },
        createdAt: {
          type: Date
        },
        attempts: {
          type: Number,
          default: 0
        }
    },
    role:{
      type:String,
      default:"user"
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    contactInfo: {
      phone: String,
      address: String,
      socialLinks: {
        twitter: String,
        linkedin: String,
      },
    },
    bio:{
      type:String,
      required:false,
      maxLenght:[250, "Maximum length should be 250 characters"]
    },
    avatar:{
      type: String,
      required:false
    },
    Suspended:{
      type:Boolean,
      default:false
    },
    blocked:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }],
    deactivate:{
      type:Boolean,
      default:false
    },
    isVerified:{
      type:Boolean,
      default:false
    },  
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    likedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.isOTPValid = function(otpToVerify) {
    return (
      this.otp && 
      this.otp.code === otpToVerify && 
      this.otp.expiresAt > Date.now()
    );
  };

userSchema.methods.generateOTP = function() {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

    this.otp = {
        code: newOTP,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        createdAt: new Date(),
        attempts: 0
    };

    return newOTP;
};

userSchema.methods.clearOTP = function() {
    this.otp = undefined;
};

userSchema.methods.incrementOTPAttempts = function() {
    if (this.otp) {
        this.otp.attempts = (this.otp.attempts || 0) + 1;
    }
};

userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))return next();
    const salt=await genSalt();
    this.password=await hash(this.password,salt);
    next();
})

const User = mongoose.model('User', userSchema);
export default User;
