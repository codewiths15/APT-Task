import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.log("✅ Connected to Postgres"))
  .catch((err) => console.error("❌ DB connection error:", err));

export default client;
