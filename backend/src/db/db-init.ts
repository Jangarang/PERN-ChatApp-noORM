import '../config/env.js';
import pg from 'pg';


const db = new pg.Client({
  // connectionString: process.env.DATABASE_CONNECTION_STRING
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export const dbConnection = async () => {
  // await db.connect().then(() => console.log('📡 Connect to PostgreSQL'))
  // .catch(err => {
  //   console.error('❌ Failed to connect to DB:', err);
  //   process.exit(1);
  // });
  try {
    await db.connect();
    console.log('📡 Connected to PostgreSQL');
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
  }
};

export const dbSetup = async () => {
  
  try {
    await db.query(`
    CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'OTHER');  
  `);

  } catch (error: any) {
    console.log('gender type already created');
  }

  await createUserTable();
  await dbUpdateAtTrigger();
  await dbCreateConversationTable();
  await dbCreateUserConversation();
  await dbCreateMessage();
};

const createUserTable = async () => {
  try {
    await db.query(`
      CREATE TABLE users (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        password TEXT NOT NULL,
        profile_pic TEXT NOT NULL,
        gender gender NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      );
    `);
  } catch (error: any) {
    console.log("error ", error.message);
  } 
};

const dbUpdateAtTrigger = async () => {
  try {
  
    await db.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS
      TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await db.query(`
      CREATE TRIGGER updated_at_users
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column()
    `);
  } catch ( error: any ) {
    console.log('error: ', error.message);
  }
};

const dbCreateConversationTable = async () => {
  
  try{
    await db.query(`
      CREATE TABLE conversations (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      );
    `);

  } catch (error: any ){
    console.log("", error.message);
  }
};

const dbCreateUserConversation = async () => {
  try{db.query(`
    CREATE TABLE user_conversations (
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
      conversation_id TEXT REFERENCES conversations(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, conversation_id)
    );
  `);
  } catch(error: any) {
    console.log("", error.message);
  }
};

const dbCreateMessage = async () => {
  try {
    await db.query(`
      CREATE TABLE messages (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        sender_id TEXT NOT NULL,
        conversation_id TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (conversation_id) REFERENCES conversations(id)
      ); 
      `);
  } catch ( error: any ) {
    console.log("", error.message);
  }
}

export default db;


