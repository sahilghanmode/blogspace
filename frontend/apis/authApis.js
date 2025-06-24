import { axiosInstance } from "../utils/axios.js"
import toast from "react-hot-toast"

export const signupApi=async(formData)=>{
    const {username,email,password}=formData
    const res=await axiosInstance.post('/user/signup',{username,email,password})
    if(res.data.success){
        const otpres=await axiosInstance.post('/user/send-otp',{email})
        toast(otpres.data.message)
    }
    return true
    
}