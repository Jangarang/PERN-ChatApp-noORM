import db from "./db.js";
import type { Conversation, ConversationWithMessages, Message, User } from "./types.js";

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

/*
//TODO: rename
*/
export const join_user_conversation_query = async (userId1: string, userId2: string):Promise<Conversation | null> => {
    try {
        // console.log('join_user_conversation_query id1: ', userId1 );
        // console.log('join_user_conversation_query id2: ', userId2 );
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

export const find_users_query = async (userId: string) => {
    try{
       const result = await db.query(`
           SELECT u.id, u.profile_pic, u.full_name
           FROM users u 
           JOIN user_conversations uc ON u.id = uc.user_id
           WHERE uc.conversation_id IN (
                SELECT conversation_id 
                FROM user_conversations 
                WHERE user_id = $1
            ) 
            AND user_id != $1
        `,[userId]);
        return result.rows[0]; 
    } catch (error: any) {

    };
};


//TODO to move out and overloaded
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