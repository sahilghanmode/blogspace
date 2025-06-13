import { Router } from "express";

const userRoutes=Router()

userRoutes.get('/test',(req,res)=>{
    console.log("wosfasafa")
    res.json({message:"working"})
})

export default userRoutes