"use client";
import { useEffect, useState } from "react";
import PokemonDetails from "./PokemonDetails";

interface PokemonType {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  url: string;
}

export function PokemonSearch() {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>();
  const [search, setSearch] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: any) => {
    e.preventDefault();
    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await fetch("/api/pokemonTypes");
        const data = await res.json();
        setTypes(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon types:", error);
      } finally {
      }
    }
    fetchTypes();
  }, []);

  useEffect(() => {
    if (!selectedType) return;

    async function fetchPokemonByType() {
      setLoading(true);
      try {
        const res = await fetch(`/api/pokemonByType?type=${selectedId}`);
        const data = await res.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonByType();
  }, [selectedType]);

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-2 mb-4"
      >
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setSelectedId(e.target.selectedIndex);
          }}
        >
          <option value="">Select a Type</option>
          {types.map((type, index) => (
            <option key={type.name} value={type.name} data-id={index + 1}>
              {type.name.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokemon"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      <PokemonDetails pokemonList={pokemonList} />
    </div>
  );
}
