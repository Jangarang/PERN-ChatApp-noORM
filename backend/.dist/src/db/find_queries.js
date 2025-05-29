import db from "./db.js";
export const find_username_query = async (username) => {
    try {
        const result = await db.query(`
        SELECT * FROM users WHERE username = $1 LIMIT 1 
        `, [username]);
        return result.rows[0];
    }
    catch (error) {
        console.log('find_username() error', error.message);
        return null;
    }
    ;
};
export const find_by_id_query = async (id) => {
    try {
        const result = await db.query(`
        SELECT * FROM users WHERE id = $1 LIMIT 1 
        `, [id]);
        return result.rows[0];
    }
    catch (error) {
        console.log('find_by_id() error', error.message);
        return null;
    }
    ;
};
export const join_user_conversation_query = async (userId1, userId2) => {
    try {
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
            WHERE uc.user_id IN ($2, $3)
            GROUP BY uc.conversation_id
            HAVING COUNT(DISTINCT uc.user_id) = 2;
        `, [userId1, userId2]);
        return result.rows[0];
    }
    catch (error) {
        console.log();
        return null;
    }
};
