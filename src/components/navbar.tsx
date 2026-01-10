import Link from "next/link";

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "skills", href: "/skills" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-gray-700 px-6 py-4">
      <ul className="flex gap-6 text-sm">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="hover:text-green-400 transition">
              {">"} {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
