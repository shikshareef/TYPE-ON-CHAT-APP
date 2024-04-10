import express from 'express';
import { sendMessage ,getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoutes.js';

const router = express.Router();


router.post("/send/:id" , protectRoute , sendMessage)  //route to send Message
router.get("/:id" , protectRoute , getMessages)  //route to get message betwwen current user and userid in the parmas 

export default router;