"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon } from "../../components/Pokemon";

export default function PokemonFetcher() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      try {
        const res = await fetch(`/api/pokemonDetails?name=${name}`);
        const data = await res.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  return <Pokemon pokemon={pokemonList} />;
}
