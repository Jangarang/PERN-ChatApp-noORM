import db from "./db.js";
export const create_user = async (user) => {
    const values = Object.values(user);
    console.log(values);
    try {
        const result = await db.query(`
                INSERT INTO users(full_name, username, password, gender, profile_pic)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `, values);
        console.log(result.rows[0]);
        return result.rows[0];
    }
    catch (error) {
        console.log('create_user() error: ', error.message);
        return null;
    }
    ;
};
