import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "src/data/site-content.json");

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("everestics_admin");
  return session?.value === process.env.ADMIN_SESSION_TOKEN;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const raw = await fs.readFile(CONTENT_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  // NOTE: Writing to the filesystem works in local dev.
  // In production on Vercel, use Vercel KV or Edge Config instead.
  await fs.writeFile(CONTENT_PATH, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
