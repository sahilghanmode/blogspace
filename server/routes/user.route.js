import { Router } from "express";
import { forgotPassword, getCurrentUser, login, resetPassword, sendOtp, Signup, verifyOtp } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const userRoutes=Router()

userRoutes.post('/signup',Signup)

userRoutes.post('/verify',verifyOtp)

userRoutes.post('/send-otp',sendOtp)

userRoutes.get('/login',login)

userRoutes.post('/forgotpassword',forgotPassword)

userRoutes.get('/getCurrentUser',verifyJWT, getCurrentUser)

userRoutes.post('/resetpassword/:resetToken',resetPassword)

export default userRoutes