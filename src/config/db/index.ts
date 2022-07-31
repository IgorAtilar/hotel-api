import "dotenv/config";
import { Pool } from "pg";

const port = Number(process.env.PG_PORT);
const host = process.env.PG_HOST;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const database = process.env.PG_DATABASE;

export const db = new Pool({
    host,
    port,
    user,
    password,
    database,
});
