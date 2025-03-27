import { PokemonSearch } from "./components/Search";

export default async function Home() {
  return (
    <main className="flex items-center justify-center pt-12 px-4">
      <PokemonSearch />
    </main>
  );
}
