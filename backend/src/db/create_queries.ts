import db from "./db-init.js";
import type { ConversationWithUsers, Message, NewUserData, User } from "./types.js";

export const create_user = async (user: NewUserData): Promise<User | null> => {
    const values = Object.values(user);
    console.log(values);
    try {
        const result = await db.query(`
                INSERT INTO users(full_name, username, password, gender, profile_pic)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `, 
            values
        );
        console.log(result.rows[0]);
        return result.rows[0];

    } catch (error: any) {

        console.log('create_user() error: ', error.message);
        return null;

    };
}

export const create_conversation = async (userId1: string, userId2: string):Promise<ConversationWithUsers | null> => {
    try{
        const conversationId = await db.query(`INSERT INTO conversations DEFAULT VALUES RETURNING id`);
        // console.log(userId1, userId2);
        // console.log('conversationId', conversationId.rows[0].id);

        const result2 = await db.query(`
            INSERT INTO user_conversations (user_id, conversation_id)
            VALUES 
                ($2,$1),
                ($3,$1)
            ON CONFLICT DO NOTHING
            RETURNING *;
        `, [conversationId.rows[0].id, userId1, userId2]);
        // console.log('create_conversation() rows: ', result2.rows);
            
        return buildConversationWithUsers(result2.rows[0].conversation_id);

    } catch ( error: any ) {

        console.log("Error in create_conversation(): ", error.message);
        return null;

    }; 
};

export const create_message = async (senderId: string, conversationId: string, body: string):Promise<Message | null>  => {
    try {
        console.log('create_message() conversationId: ',conversationId);
        const result = await db.query(`
            INSERT INTO messages (sender_id, conversation_id, body)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,[senderId, conversationId, body]);
        return result.rows[0];
    } catch ( error: any ) {
        console.log('create_message query error: ', error.message);
        return null;
    };
};


//TODO to move out
const buildConversationWithUsers = async (conversationId: string):Promise<ConversationWithUsers> => {
    const result = await db.query(`
        SELECT c.id, c.created_at, c.updated_at, u.id AS user_id, u.full_name, u.username, u.gender, u.profile_pic
        FROM conversations c
        LEFT JOIN user_conversations uc ON c.id = uc.conversation_id
        LEFT JOIN users u ON uc.user_id = u.id
        WHERE c.id IN ($1)  
        `, [conversationId]);

        // console.log("buildConversationWithUsers query result: ", result.rows);

        let conversationsWithUsers: ConversationWithUsers;
        conversationsWithUsers = {
            id: result.rows[0].id,
            created_at: result.rows[0].created_at,
            updated_at: result.rows[0].updated_at,
            participants: [],
        };

        result.rows.forEach((row: any) => {

            conversationsWithUsers.participants.push({
                id: row.user_id,
                full_name: row.full_name,
                username: row.username,
                gender: row.gender,
                profile_pic: row.profile_pic,
            });
        });

        // console.log("participants in the same conversation",);

    return conversationsWithUsers;
};