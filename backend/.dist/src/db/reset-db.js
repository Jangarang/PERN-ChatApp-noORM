import db from "./db.js";
export const dbDropUsers = async () => {
    await db.query(`
    DROP TABLE IF EXISTS users;
  `);
    await db.query(`
    DROP TYPE IF EXISTS gender;
  `);
};
export const dbDropConversations = async () => {
    await db.query(`
    DROP TABLE IF EXISTS conversations;
    `);
};
export const dbDropUserConversationJunction = async () => {
    await db.query(`
    DROP TABLE IF EXISTS user_conversations`);
};
export const dbDropMessageTable = async () => {
    await db.query(`
    DROP TABLE IF EXISTS messages
    `);
};
export const dbReset = async () => {
    await dbDropUserConversationJunction();
    await dbDropMessageTable();
    await dbDropUsers();
    await dbDropConversations();
};
