import db from "./db-init.js";
import type { ConversationWithMessages, Message } from "./types.js";

export const all_messages_query = async (conversationId: string):Promise<ConversationWithMessages |null> => {
    try {
        const result = await db.query(`
            SELECT * FROM messages WHERE conversation_id = $1    
        `, [conversationId]);
        
        //if (result) {
        return buildConversationWithMessages(conversationId);
        
    } catch ( error:any ) {
        console.log('all_messages_query error: ', error.message);
        return null;
    };
};

const buildConversationWithMessages = async(conversationId: string):Promise<ConversationWithMessages | null> => {
   try {
        const result = await db.query(`
            SELECT m.id, m.body, m.sender_id, m.conversation_id, m.created_at,
                m.updated_at ,c.id AS conversation_id, c.created_at AS conversation_created_at, 
                c.updated_at AS conversation_updated_at
            FROM conversations c
            LEFT JOIN messages m ON m.conversation_id = c.id
            WHERE c.id IN ($1)
        `,[conversationId]);

        let conversationWithMessages:ConversationWithMessages;
        conversationWithMessages = {
            id: result.rows[0].conversation_id,
            created_at: result.rows[0].created_at,
            updated_at: result.rows[0].updated_at,
            messages: []
        };
        
        result.rows.forEach((row: any) => {
            let message:Message = {
                id: row.id,
                body: row.body,
                sender_id: row.sender_id,
                conversation_id: row.sender_id,
                created_at: row.created_at, 
                updated_at: row.updated_at,
            }
            conversationWithMessages.messages.push(message);
        });

        return conversationWithMessages;
   } catch (error: any) {
        console.log(error.message);
        return null;
   }     
};