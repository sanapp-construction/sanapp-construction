"use server";

export async function GET() {
  return Response.json({
    envLoaded: !!process.env.DATABASE_URL,
    value: process.env.DATABASE_URL || "переменная не найдена",
  });
}