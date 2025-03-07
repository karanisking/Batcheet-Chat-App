import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from './routes/userRoute.js'
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import { app,server} from './socket/socket.js'

dotenv.config({});


const PORT = process.env.PORT || 2000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'https://baatcheet-gamma.vercel.app',
    credentials:true
};
app.use(cors(corsOption));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message",messageRoute);


server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on ${PORT}`);
});
