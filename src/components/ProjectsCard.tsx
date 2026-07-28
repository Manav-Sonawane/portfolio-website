"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GlassPanel from "@/components/fx/GlassPanel";
import Typewriter from "@/components/fx/Typewriter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Project = {
  title: string;
  tagline: string;
  tech: string[];
  role: string;
  highlights: string[];
  github: string;
  live?: string | null;
};

export default function ProjectsCard({ project, isPrime }: { project: Project; isPrime: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const cardFront = useRef<HTMLDivElement>(null);
  const cardBack = useRef<HTMLDivElement>(null);
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const { contextSafe } = useGSAP({ scope: container });

  const flipCard = contextSafe(() => {
    const nextState = !isFlipped;
    setIsFlipped(nextState);

    // Front starts at 0, back starts at 180 (hidden).
    // When flipping to back: front goes to -180, back goes to 0
    gsap.to(cardFront.current, {
      rotateY: nextState ? -180 : 0,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "back.out(1.2)",
    });

    gsap.to(cardBack.current, {
      rotateY: nextState ? 0 : 180,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "back.out(1.2)",
    });
  });

  useGSAP(() => {
    gsap.set(container.current, { perspective: 1000 });
    gsap.set([cardFront.current, cardBack.current], { 
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d"
    });
    gsap.set(cardBack.current, { rotateY: 180 });
  }, { scope: container });

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      ref={container} 
      className={`relative cursor-pointer w-full max-w-sm sm:max-w-md h-[420px] flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--phosphor-400] focus-visible:ring-offset-2 focus-visible:ring-offset-[--void] rounded-md`} 
      onClick={flipCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flipCard();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
    >
      {/* FRONT OF CARD */}
      <div ref={cardFront} className="absolute inset-0 w-full h-full">
        <GlassPanel className="w-full h-full flex flex-col justify-between p-6 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[--phosphor-400]/5 to-transparent opacity-50 pointer-events-none" />
          
          <div>
            <h3 className={`font-bold ${isPrime ? 'text-3xl text-[--amber-400]' : 'text-2xl text-[--phosphor-400]'}`}>
              {project.title}
            </h3>
            <p className="mt-2 text-[--ghost-400] font-mono text-sm">
              &gt; {project.role}
            </p>
          </div>

          <div className="mt-auto">
            {/* Live typed tagline on hover */}
            <div className="h-20 flex items-end mb-5">
              {isHovered && !isFlipped ? (
                 <p className="text-[--phosphor-100] text-sm leading-relaxed">
                   <Typewriter text={project.tagline} speed={30} />
                 </p>
              ) : (
                <p className="text-[--phosphor-100] text-sm leading-relaxed opacity-30">
                  {/* Placeholder hint before hover */}
                  Hover to decrypt //
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className={`text-xs font-mono px-2 py-1 rounded border ${isPrime ? 'border-[--amber-900]/50 text-[--amber-400]' : 'border-[--phosphor-900]/50 text-[--phosphor-400]'}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* BACK OF CARD */}
      <div ref={cardBack} className="absolute inset-0 w-full h-full">
        <GlassPanel className="w-full h-full flex flex-col p-6 overflow-hidden">
          <div className="border-b border-[--phosphor-900] pb-3 mb-4">
            <h4 className="text-[--phosphor-100] font-bold">What I Built</h4>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide text-sm text-[--ghost-400] space-y-4">
            {project.highlights.map((item, index) => (
              <p key={index} className="flex gap-2 leading-relaxed">
                <span className={isPrime ? 'text-[--amber-400]' : 'text-[--phosphor-400]'}>›</span>
                <span>{item}</span>
              </p>
            ))}
          </div>

          <div className="flex gap-3 mt-4 pt-4 border-t border-[--phosphor-900]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex-1 text-center py-2 text-xs font-mono border border-[--phosphor-600] text-[--phosphor-400] rounded hover:bg-[--phosphor-600] hover:text-[#000] transition-colors"
              >
                [ GitHub ]
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex-1 text-center py-2 text-xs font-mono border border-[--ghost-700] text-[--ghost-400] rounded hover:border-[--phosphor-400] hover:text-[--phosphor-400] transition-colors"
              >
                [ Live ]
              </a>
            )}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
