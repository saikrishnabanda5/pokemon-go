import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name)
    return NextResponse.json({ error: "Type is required" }, { status: 400 });

  const res = await fetch(`${process.env.BASE_URL}/pokemon/${name}`);
  const data = await res.json();

  return NextResponse.json(
    {
      message: "Data received successfully",
      pokemon: {
        abilities: data.abilities,
        moves: data.moves,
        name: data.name,
        stats: data.stats,
        sprites: data.sprites,
        types: data.types,
      },
    },
    { status: 200 }
  );
}
