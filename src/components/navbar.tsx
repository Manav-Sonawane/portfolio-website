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
    <nav className="border-b border-gray-700 px-4 md:px-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <ul className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-sm">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm sm:text-base md:text-lg text-gray-400 tracking-wide hover:text-green-400 transition-colors duration-200"
              >
                {">"} {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="/Resume_Manav.pdf"
          download
          className="border border-green-500 px-4 py-1 text-sm text-green-400 hover:bg-green-500 hover:text-black transition whitespace-nowrap"
        >
          Download Resume
        </a>
      </div>
    </nav>
  );
}
