export default function TerminalProfileCard() {
  return (
    <aside className="bg-black text-white p-6 rounded-lg w-full font-mono border border-white/10 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm text-gray-400">bash</p>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-green-400">&gt;&gt; cat system_profile.txt</p>
        <div className="mt-4 space-y-1.5 text-gray-300">
          <p className="text-white font-semibold text-base">SYSTEM PROFILE</p>
          <p>
            <span className="text-green-400">Role:</span> Backend / Full-Stack
          </p>
          <p>
            <span className="text-green-400">Focus:</span> APIs, backend
            systems, scalability
          </p>
          <p>
            <span className="text-green-400">Experience:</span> Internships,
            tech teams, campus ambassadorship
          </p>
          <p>
            <span className="text-green-400">Leadership:</span> Yes
          </p>
          <p>
            <span className="text-green-400">Location:</span> Mumbai, India
          </p>
          <p className="mt-3 text-gray-400 italic">
            Status: Designing systems. Shipping code.
          </p>
        </div>
        <p className="text-green-400 mt-4">&gt;&gt; _</p>
      </div>
    </aside>
  );
}
