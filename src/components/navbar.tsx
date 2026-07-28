"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "skills", href: "/skills" },
  { name: "projects", href: "/projects" },
  { name: "experience", href: "/experience" },
  { name: "contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="glass-panel px-4 md:px-6 py-4 sticky top-0 z-50 rounded-none border-l-0 border-r-0 border-t-0"
      style={{ borderRadius: 0 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <ul className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-sm sm:text-base md:text-lg tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-[--phosphor-400]"
                      : "text-[--ghost-400] hover:text-[--phosphor-400]"
                  }`}
                >
                  {">"} {item.name}
                  {/* Active indicator: blinking underscore cursor */}
                  {isActive && (
                    <span className="cursor-blink ml-0.5">_</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <a
          href="/Resume_Manav.pdf"
          download
          className="border border-[--phosphor-600] px-4 py-1 text-sm text-[--phosphor-400] hover:bg-[--phosphor-400] hover:text-black transition-all duration-200 rounded-sm"
          style={{ boxShadow: "0 0 0 0 rgba(74,222,128,0)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "var(--glow-phosphor-tight)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 0 0 rgba(74,222,128,0)")
          }
        >
          Download Resume
        </a>
      </div>
    </nav>
  );
}
