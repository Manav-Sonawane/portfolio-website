import Link from "next/link";

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "skills", href: "/skills" },
  { name: "projects", href: "/projects" },
  { name: "experience", href: "/experience" },
  { name: "contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center">
        <ul className="flex gap-6 text-sm">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-base md:text-lg text-gray-400 tracking-wide hover:text-green-400 transition-colors duration-200"
              >
                {">"} {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="/Resume_Manav.pdf"
          download
          className="border border-green-500 px-4 py-1 text-green-400 hover:bg-green-500 hover:text-black transition"
        >
          Download Resume
        </a>
      </div>
    </nav>
  );
}
