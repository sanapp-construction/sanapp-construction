import { getDb } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const db = await getDb();
    const result = await db.execute(sql`SELECT NOW() as server_time, version() as pg_version`);
    return Response.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: (error as Error).message,
    }, { status: 500 });
  }
}