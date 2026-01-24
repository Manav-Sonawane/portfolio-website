export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
        {/* Left */}
        <p>© {new Date().getFullYear()} Manav Sonawane</p>

        {/* Center */}
        <p className="text-green-400">
          built_with_next.js • tailwind • terminal_ui
        </p>

        {/* Right */}
        <div className="flex gap-6">
          <a
            href="https://github.com/Manav-Sonawane"
            target="_blank"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/manav-sonawane"
            target="_blank"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
          <a
            href="mailto:sonawanemanav96@gmail.com"
            className="hover:text-white transition"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
