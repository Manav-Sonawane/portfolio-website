import Image from "next/image";

export default function About() {
  return (
    <main className="px-10 py-16 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        {/* LEFT: TEXT (terminal-style, flush left) */}
        <section className="max-w-3xl">
          <p className="text-green-400 mb-4">
            manav-sonawane@portfolio:~/about$
          </p>

          <h2 className="text-7xl font-semibold mb-6">About Me</h2>

          <p className="text-green-100 text-2xl leading-relaxed">
            I’m an I.T. Engg Student @TSEC, Mumbai, with a strong inclination
            toward backend and full-stack development.
            <br />
            <br />
            I’ve worked across startups and technical teams, building scalable
            web applications, RESTful APIs, and backend systems using Python,
            Django, FastAPI, Flask, and Node.js.
            <br />
            <br />
            Beyond development, I’ve taken up leadership and coordination roles
            — managing teams, organizing hackathons, and contributing to college
            technical committees.
          </p>
        </section>

        {/* RIGHT: IMAGE (pushed to extreme right) */}
        <section className="hidden md:flex justify-center">
          <div
            className="relative w-[800px] h-[500px] rounded-2xl overflow-hidden
                          border border-white/10 bg-black/40"
          >
            <Image
              src="/code.png"
              alt="System profile"
              width={800}
              height={318}
              className="object-contain opacity-95 mix-blend-screen"
              priority
            />
          </div>  
        </section>
      </div>
    </main>
  );
}
