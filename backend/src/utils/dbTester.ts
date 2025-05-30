import { dbSetup } from "@/db/db-init.js";
import { dbReset } from "@/db/db-reset.js";

if (process.env.NODE_ENV === 'development') {
  process.stdin.on('data', async (data) => {
    const input = data.toString().trim();
    if (input === 'drop') {
      console.log('Dropping tables...');
       dbReset().catch((err) => {
            console.error('Error dropping tables: ', err);
            process.exit(1);
        });
      console.log('Tables dropped 🚨');
    }
  });
};

if (process.env.NODE_ENV === 'development') {
    process.stdin.on('data', async (data) => {
        const input = data.toString().trim();
        if (input === 'create tables'){
            console.log('Creating tables...');
            dbSetup().catch((err) => {
                console.error('Error setting up tables: ', err);
                process.exit(1);
            });
            console.log('Tables created!');
        }
    });
};

if (process.env.NODE_ENV === 'development') {
    process.stdin.on('data', async (data) => {
        const input = data.toString().trim();
        if (input === 'reset'){
            console.log('Dropping tables');
            await dbReset().catch((err) => {
              console.error('Error dropping tables: ', err);
              process.exit(1);
            });
            console.log('Creating tables')
            await dbSetup().catch((err) => {
                console.error('Error dropping tables: ', err);
                process.exit(1);
            });
            console.log('Tables created!');
        }
    });
};