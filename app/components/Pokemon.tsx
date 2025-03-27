import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "./BreadCrumb";
import Image from "next/image";

interface Pokemon {
  name: string;
  url: string;
  abilities: any;
  sprites: any;
  types: any;
  stats: any;
  moves: any;
}

export function Pokemon({ pokemon }: any) {
  const [pokemonDetails, setPokemonDetails] = useState<any>({});
  const { abilities, sprites, types, stats, moves, name } = pokemonDetails;

  useEffect(() => {
    if (pokemon?.message) setPokemonDetails(pokemon?.pokemon);
  }, [pokemon]);

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-6">
      <Breadcrumb name={name} />

      <Link href="/" className="self-start text-green-500 mb-4">
        &lt; Back
      </Link>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
        <div className="bg-teal-300 rounded-t-xl p-4 flex justify-center">
          {sprites && (
            <Image
              src={sprites?.other?.["official-artwork"]?.front_default}
              alt={name}
              width={200}
              height={200}
              className="w-40 h-40 object-contain"
            />
          )}
        </div>

        <div className="bg-orange-300 p-4 rounded-b-xl">
          <p className="text-lg">
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Type:</strong>
            {types?.map((type: any) => type.type.name).join(", ")}
          </p>
          <p>
            <strong>Stats:</strong>
            {stats?.map((stat: any) => stat.stat.name).join(", ")}
          </p>
          <p>
            <strong>Abilities:</strong>
            {abilities?.map((ability: any) => ability.ability.name).join(", ")}
          </p>
          <p>
            <strong>Some Moves:</strong>
            {moves
              ?.slice(0, 5)
              .map((m: any) => m.move.name)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
