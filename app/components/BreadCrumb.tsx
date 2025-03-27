import Link from "next/link";

export function Breadcrumb({ name }: any) {
  return (
    <nav className="mb-4">
      <ul className="flex space-x-2 text-gray-500">
        Home -&gt; &nbsp;
        <li>
          <Link href={`/${name?.toUpperCase()}`}>{name && name[0]?.toUpperCase() + name?.slice(1).toLowerCase()}</Link>
        </li>
      </ul>
    </nav>
  );
}
