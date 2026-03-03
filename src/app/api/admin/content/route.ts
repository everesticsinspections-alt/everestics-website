import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, saveContent, SiteContent } from "@/lib/content";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("everestics_admin");
  return session?.value === process.env.ADMIN_SESSION_TOKEN;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json() as SiteContent;
  await saveContent(body);
  return NextResponse.json({ ok: true });
}
