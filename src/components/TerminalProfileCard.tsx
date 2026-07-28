export default function TerminalProfileCard() {
  return (
    <aside className="text-white p-5 rounded font-mono text-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-[--ghost-400] text-xs">bash</p>
      </div>
      <div className="space-y-2">
        <p className="text-[--phosphor-400]">&gt;&gt; cat system_profile.txt</p>
        <div className="mt-3 space-y-1.5 text-[--ghost-400]">
          <p className="text-[--phosphor-100] font-semibold">SYSTEM PROFILE</p>
          <p><span className="text-[--phosphor-400]">Role:</span> Backend / Full-Stack</p>
          <p><span className="text-[--phosphor-400]">Focus:</span> APIs, backend systems, scalability</p>
          <p><span className="text-[--phosphor-400]">Exp:</span> Internships, tech teams, ambassador</p>
          <p><span className="text-[--phosphor-400]">Leadership:</span> Yes</p>
          <p><span className="text-[--phosphor-400]">Location:</span> Mumbai, India</p>
          <p className="mt-2 text-[--ghost-700] italic">Status: Designing systems. Shipping code.</p>
        </div>
        <p className="text-[--phosphor-400] mt-3">&gt;&gt; <span className="cursor-blink">_</span></p>
      </div>
    </aside>
  );
}
