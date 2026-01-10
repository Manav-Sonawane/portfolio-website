export default function Home() {
  return (
    <main className="px-6 py-12 max-w-3xl">
      <p className="text-green-400 mb-4">manav-sonawane@portfolio:~$</p>

      <h1 className="text-3xl font-bold mb-4">Hi, I'm Manav Sonawane.</h1>

      <p className="text-gray-300 mb-6">
        S.Y. IT Engg | Python-Backend Developer |
      </p>

      <div className="flex gap-4">
        <a
          href="/projects"
          className="border border-gray-600 px-4 py-2 hover:border-green-400"
        >
          View Projects
        </a>

        <a
          href="/contact"
          className="border border-gray-600 px-4 py-2 hover:border-green-400"
        >
          Contact Me
        </a>
      </div>
    </main>
  );
}
