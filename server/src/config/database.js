import pgp from 'pg-promise';
import dotenv from "dotenv";
dotenv.config();
const db = pgp();

const dbConfig = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
};

const dbInstance = db(dbConfig);

const connectDatabase = () => {
    dbInstance.connect()
        .then(obj => {
            console.log(`Connected to database: ${obj.client.database}`);
            obj.done();
        })
        .catch(error => {
            console.error('Error connecting to database:', error);
        });
};

export { dbInstance, connectDatabase }