"use server";

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

let dbPromise: Promise<any> | null = null;

export async function getDb() {
  if (dbPromise) return dbPromise;

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL не найден в .env.local');
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  const db = drizzle(client);

  dbPromise = Promise.resolve(db);
  return db;
}