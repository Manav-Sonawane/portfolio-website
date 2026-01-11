/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] px-10 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <section>
          <p className="text-green-500 mb-3">manav-sonawane@portfolio:~$</p>

          <h1 className="text-8xl font-semibold mb-4">
            Hi, I'm
            <br />
            <span className="text-green-500">Manav Sonawane</span>.
          </h1>

          <p className="text-gray-300 mb-6 max-w-xl text-3xl">
            B.E. Information Technology |<br /> Python and Web Developer |
          </p>

          <ul className="text-xl text-green-200 space-y-1 mb-8">
            <li>Location: Mumbai, India</li>
            <li>
              Focus: backend systems, ethical hacking, full-stack web apps
            </li>
            <li>Currently: SE IT @ TSEC (CGPA 9.3)</li>
          </ul>

          <div className="flex gap-4">
            <button className="border border-gray-600 px-4 py-2 hover:border-green-500 hover:text-green-200">
              View Projects
            </button>
            <button className="border border-gray-600 px-4 py-2 hover:border-green-500 hover:text-green-200">
              Contact Me
            </button>
          </div>
        </section>

        <section className="hidden md:flex justify-center">
          <Image
            src="/manav3.jpg"
            alt="Manav Sonawane"
            width={764}
            height={764}
            className="w-150
                    opacity-100
                    rounded-full
                    mix-blend-screen
                    transition"
          />
        </section>
      </div>
    </main>
  );
}
