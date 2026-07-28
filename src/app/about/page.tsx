import Image from "next/image";
import TerminalProfileCard from "@/components/TerminalProfileCard";

export default function About() {
  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col justify-center items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
        {/* LEFT: TEXT (terminal-style, flush left) */}
        <section className="max-w-3xl">
          <p className="text-green-400 mb-2 text-sm">
            manav-sonawane@portfolio:~/about$
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold mb-4">
            About Me
          </h2>

          <p className="text-green-100 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
            I’m an I.T. Engg Student @TSEC, Mumbai, with a strong inclination
            toward backend development.
            <br />
            <br />I am learning ethical hacking and cloud computing
            while actively participating in hackathons and contributing to
            open-source projects.
            <br />
            <br />
            I’ve worked across startups and technical teams, building scalable
            web applications, RESTful APIs, and backend systems using Python,
            Django, Node.js, and databases like PostgreSQL and MongoDB.
            <br />
            <br />
            Beyond development, I’ve taken up leadership and coordination roles
            — managing teams, organizing hackathons, and contributing to college
            technical committees.
          </p>
        </section>

        {/* RIGHT: IMAGES (pushed to extreme right) */}
        <section className="flex flex-col gap-4 justify-center items-center">
          {/* Personal Photo */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-green-500/30 bg-black/40">
            <Image
              src="/manav.jpg"
              alt="Manav Sonawane"
              width={320}
              height={320}
              className="object-cover opacity-90 mix-blend-screen hover:opacity-100 transition-opacity"
              priority
            />
          </div>

          {/* Terminal Profile Card */}
          <TerminalProfileCard />
        </section>
      </div>
    </main>
  );
}
