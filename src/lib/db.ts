import 'server-only'; // ✅ Optional: ensures this code never leaks to the client
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

// This is fine as a internal module variable
let db: any | null = null;

export async function getDb() {
  if (db) return db;

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not found in .env');
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  db = drizzle(client);
  return db;
}