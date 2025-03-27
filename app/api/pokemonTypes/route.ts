 import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.BASE_URL}/type/`);
  const data = await res.json();
   return NextResponse.json(data);
}
