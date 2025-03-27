"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PokemonType {
  name: string;
  url: string;
}

export default function PokemonDetails({ pokemonList }: any) {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTypes() {
      setLoading(true);

      try {
        const res = await fetch("/api/pokemonList", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pokemonList }),
        });

        const data = await res.json();
        setPokemonDetails(data.pokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    }
    if (pokemonList?.length) {
      fetchTypes();
    }
  }, [pokemonList]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="m-4 mx-auto p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white rounded-2xl">
      {pokemonDetails?.map((pokemon: any, index) => {
        return (
          <Link
            href={`/pokemon/${pokemon?.name.toLowerCase()}`}
            key={index}
            className="cursor-pointer shadow-lg rounded-2xl m-2 p-4 w-64 text-center border border-gray-200"
          >
            <div>
              <div className="bg-gray-100 rounded-xl p-4">
                {pokemon?.sprites && (
                  <Image
                    src={
                      pokemon?.sprites?.other?.["official-artwork"]
                        ?.front_default
                    }
                    alt={pokemon?.name}
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {pokemon?.name}
              </h3>

              <p className="text-blue-600 text-sm font-medium mt-2 inline-block hover:underline">
                Details →
              </p>
            </div>
          </Link>
        );
      })}
      {/* <Breadcrumb paths={["Home", pokemon.name]} /> */}
    </div>
  );
}
