import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

let db: any = null;

export async function getDb() {
  if (db) return db;

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL не найден в .env');
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  db = drizzle(client);
  return db;
}