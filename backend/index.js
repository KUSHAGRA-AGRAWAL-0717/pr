import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth_route from "./routes/auth_route.js"
import message_route from "./routes/message_route.js"
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to the mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
});


//middlewares
app.use(express.json())
app.use(cookieParser());



app.use("/user",auth_route);
app.use("/message",message_route);





app.listen(6000, () => {
    connect();
    console.log("connected to backend");
});
  