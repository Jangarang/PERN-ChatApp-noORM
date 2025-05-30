import db from "./db-init.js";
import type { User } from "./types.js";

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