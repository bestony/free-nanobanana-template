import { and, desc, eq, gte, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db";
import { generation } from "@/db/schema";
import { auth } from "@/lib/auth";

const parseDateValue = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
};

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const filters = [eq(generation.userId, session.user.id)];

  if (fromParam) {
    const fromDate = parseDateValue(fromParam);
    if (fromDate) {
      filters.push(gte(generation.createdAt, fromDate));
    }
  }

  if (toParam) {
    const toDate = parseDateValue(toParam);
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
      filters.push(lte(generation.createdAt, toDate));
    }
  }

  const records = await db
    .select({
      id: generation.id,
      prompt: generation.prompt,
      imageUrl: generation.imageUrl,
      imageRecordId: generation.imageRecordId,
      createdAt: generation.createdAt,
    })
    .from(generation)
    .where(and(...filters))
    .orderBy(desc(generation.createdAt));

  return NextResponse.json({ data: records });
}
