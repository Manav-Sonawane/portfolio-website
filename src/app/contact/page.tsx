import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Manav Sonawane for collaborations, hiring, or tech discussions.",
};

export default function Contact() {
  return (
    <main className="px-10 py-20 max-w-4xl mx-auto">
      <p className="text-green-400 mb-4">manav@portfolio:~/contact$</p>

      <h2 className="text-7xl font-semibold mb-10">Contact Me</h2>

      <p className="text-green-100 text-xl mb-12 max-w-2xl">
        Interested in collaborating, hiring, or just having a tech chat? You can
        reach me through the platforms below.
      </p>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactItem
          label="Email"
          value="manavsonawane@zohomail.in"
          link="mailto:manavsonawane@zohomail.in"
        />

        <ContactItem
          label="GitHub"
          value="github.com/Manav-Sonawane"
          link="https://github.com/Manav-Sonawane"
        />

        <ContactItem
          label="LinkedIn"
          value="linkedin.com/in/manav-sonawane"
          link="https://linkedin.com/in/manav-sonawane"
        />

        <ContactItem
          label="LeetCode"
          value="leetcode.com/Manav_Sonawane"
          link="https://leetcode.com/Manav_Sonawane"
        />

        <ContactItem
          label="Instagram"
          value="instagram.com/_manav_sonawane"
          link="https://www.instagram.com/_manav_sonawane"
        />

        <ContactItem
          label="X"
          value="x.com/Code_with_Manav"
          link="https://x.com/Code_with_Manav"
        />
      </div>

      {/* Closing */}
      <p className="mt-16 text-white/50 text-sm">
        manav@portfolio:~$ echo {"Let’s build something meaningful."}
      </p>
    </main>
  );
}

function ContactItem({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="border border-white/10 p-6 hover:border-green-500 transition group"
    >
      <p className="text-green-400 mb-2">{label}</p>
      <p className="text-white group-hover:text-green-300 transition">
        {value}
      </p>
    </a>
  );
}
