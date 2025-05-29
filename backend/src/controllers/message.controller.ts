import type { Request, Response } from "express";
import type { User } from "../db/types.js";
import { join_user_conversation_query } from "../db/find_queries.js";
import { create_conversation, create_message } from "../db/create_queries.js";

export const sendMessage = async (req: Request, res: Response):Promise<any> => {
    try {
        const { message } = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user?.id;

        if (!senderId) {
            return res.status(400).json({error:"There is no senderID"});
        };

        let conversation = await join_user_conversation_query(senderId, receiverId);

        if (!conversation) {
            console.log("sendMessage() conversation doesn't exist between users. Creating...");
            conversation = await create_conversation(senderId, receiverId);
        
        };

        if (!conversation) {
            return res.status(400).json({error: "There is no conversation ID"});
        };


        const newMessage = await create_message(senderId, conversation.id, message )

        if (!newMessage) {
            return res.status(400).json({error: "There is no new message ID"});
        };

        return res.status(200).json({message: newMessage.body});
    } catch (error: any) {
        console.log('Error in sendMessage() controller: ', error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req: Request, res: Response):Promise<any> => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user?.id 

        if (!senderId) {
            return res.status(400).json({error:"There is no senderID"});
        };




    } catch (error) {

    }
};