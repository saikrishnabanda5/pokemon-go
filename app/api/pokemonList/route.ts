import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const responses = await Promise.all(
      data?.pokemonList?.map((pokemon: any) =>
        fetch(pokemon.url).then((res) => res.json())
      )
    );

    const pokemonData = responses?.map((data) => {
      return {
        abilities: data.abilities,
        moves: data.moves,
        name: data.name,
        stats: data.stats,
        sprites: data.sprites,
        types: data.types,
      };
    });
    return NextResponse.json(
      { message: "Data received successfully", pokemonData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
}
