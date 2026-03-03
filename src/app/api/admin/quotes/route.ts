import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getQuotes } from "@/lib/quoteStore";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("everestics_admin");
  return session?.value === process.env.ADMIN_SESSION_TOKEN;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const quotes = await getQuotes();
  return NextResponse.json(quotes);
}
