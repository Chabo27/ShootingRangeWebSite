import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import streljaneRoute from "./routes/streljane.js"
import ponudeRoute from "./routes/ponude.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express()
dotenv.config()

const connect=async()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Povezan na MongoDB")
  } catch (error) {
    throw error
  }
};

mongoose.connection.on("disconnected",()=>{
    console.log("monogDB diskonektovan")
})



//middlewares
app.use(cors())
app.use(cookieParser())

app.use(express.json())

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/streljane",streljaneRoute);
app.use("/api/ponude",ponudeRoute);

app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500
  const errorMessage=err.message || "Nesto nije u redu!"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  })

})

app.listen(8800,()=>{
    connect()
    console.log("Konektovan na bekend.");
});