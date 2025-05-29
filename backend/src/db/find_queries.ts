import db from "./db.js";
import type { Conversation, User } from "./types.js";

export const find_username_query = async (username: string | undefined):Promise<User | null>  => {
   try {
        const result = await db.query(`
        SELECT * FROM users WHERE username = $1 LIMIT 1 
        `, [username]);
     

        return result.rows[0];
    } catch ( error: any ) {
        console.log('find_username() error', error.message);
        return null;
    };
};

export const find_by_id_query = async (id: string):Promise<User | null> => {
    try {
        const result = await db.query(`
        SELECT * FROM users WHERE id = $1 LIMIT 1 
        `, [id]);
            

        return result.rows[0];
    } catch ( error: any ) {
        console.log('find_by_id() error', error.message);
        return null;
    };
};

export const join_user_conversation_query = async (userId1: string, userId2: string):Promise<Conversation | null> => {
    try {
        console.log('join_user_conversation_query id1: ', userId1 );
        console.log('join_user_conversation_query id2: ', userId2 );
        // const result = await db.query(`
        //     SELECT 1
        //     FROM user_conversations uc1
        //     JOIN user_conversations uc2
        //         ON uc1.conversations_id = uc2.converation_id
        //     WHERE uc1.user_id = $1
        //     AND uc2.user_id = $2
        //     LIMIT 1;
        // `);
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

//TODO to move out and overloaded
const buildConversation = async(conversationId: string):Promise<Conversation | null> => {
    try {
        console.log("hiiiii!");
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