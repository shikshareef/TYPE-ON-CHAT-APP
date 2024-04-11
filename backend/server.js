import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js';


const PORT = process.env.PORT || 5000;
dotenv.config();


app.use(express.json()); // to parse the incoming requests with json payloads
app.use(cookieParser()) 
app.use("/api/auth" , authRoutes)  //middlle ware for authentication 
app.use("/api/messages" , messageRoutes)  
app.use("/api/users" , userRoutes) 

app.get("/", (req, res) => {
    res.send("hello world");
});



server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server is running on port ${PORT}`);
});
