import db from "./db-init.js";
import type { Conversation } from "./types.js";

export const find_conversations_between_users_query = async (userId1: string, userId2: string):Promise<Conversation | null> => {
    try {
        
        const result = await db.query(`
            SELECT uc.conversation_id
            FROM user_conversations uc
            WHERE uc.user_id IN ($1, $2)
            GROUP BY uc.conversation_id
            HAVING COUNT(DISTINCT uc.user_id) = 2;
        `, [userId1, userId2]);
        console.log('join_user_conversation_query', result.rows);
        return buildConversation(result.rows[0].conversation_id);   
    } catch ( error: any ) {
        console.log();
        return null;
    }
};

//TODO overloaded?
const buildConversation = async(conversationId: string):Promise<Conversation | null> => {
    try {
        const result = await db.query(`
            SELECT * FROM conversations WHERE id = $1
        `, [conversationId]); 
    
        const newConversation:Conversation = {
            id: conversationId,
            created_at: result.rows[0].created_at,
            updated_at: result.rows[0].updated_at,
        }
        console.log("build conversation",newConversation);
        return newConversation;
    } catch (error: any) { 
        console.log(error.message);
        return null;
    }

};