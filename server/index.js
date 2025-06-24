import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js";
import mongoose from "mongoose"
import cors from "cors"


const app=express();

dotenv.config()

const port=process.env.PORT

app.use(express.json())

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use('/api/user',(userRoutes))

app.listen(port,()=>{console.log(`port running on ${port}`)})

mongoose.connect(process.env.DATABASE_CONNECTION_STRING).then(
    console.log("database connection successfully")
).catch((e)=>console.log("error while connecting to database",{e}))