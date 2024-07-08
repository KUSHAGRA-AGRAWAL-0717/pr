import { Conversation } from "../models/Conversation.js";

import { Message } from "../models/Message.js";

export const sendMessage=async (req,res,next)=>{
    try{
        const senderId=req.id;
        const receiverId=req.params.id;
        const {message}=req.body;
        let gotConversation=await Conversation.findOne({
            participants: {$all : [senderId,receiverId]}  
        })
        if(!gotConversation){
            gotConversation=await Conversation.create({
                participants: [senderId,receiverId]
            })
        };
        const newMessage=await Message.create({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }
        await gotConversation.save();

        return res.status(201).json({
            newMessage
        })
    }catch(error){
        next(error);
    }
}


export const getMessage = async (req,res,next) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages")
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        next(error);
    }
} 