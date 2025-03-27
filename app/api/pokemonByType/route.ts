import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type)
    return NextResponse.json({ error: "Type is required" }, { status: 400 });

  const res = await fetch(`${process.env.BASE_URL}type/${type}`);
  const data = await res.json();

  const pokemonList = data.pokemon.slice(0, 50).map((p: any) => ({
    name: p.pokemon.name,
    url: p.pokemon.url,
  }));

  return NextResponse.json(pokemonList);
}
