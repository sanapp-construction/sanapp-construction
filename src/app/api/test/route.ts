import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db.execute(sql`SELECT NOW() as time, version() as pg_version`);
    return Response.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return Response.json({ success: false, error: (error as Error).message });
  }
}