import React from 'react';
import { AMBIENCE_PILLARS, TESTIMONIALS } from '../data/menuData';
import { Sparkles, Headphones, Flame, Disc } from 'lucide-react';

export const SanctuaryVibe: React.FC = () => {
  const getIcon = (num: string) => {
    switch (num) {
      case '01':
        return <Flame className="w-5 h-5 text-[#e62335]" />;
      case '02':
        return <Disc className="w-5 h-5 text-[#c99738]" />;
      case '03':
        return <Headphones className="w-5 h-5 text-zinc-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#e62335]" />;
    }
  };

  return (
    <section id="sanctuary" className="py-20 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Editorial Header */}
      <div className="max-w-2xl space-y-3">
        <div className="text-xs font-semibold text-[#e62335] uppercase tracking-widest">
          The Aesthetic &amp; Architecture
        </div>
        <h2 className="font-metal text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Old Temple Structure. <br />
          <span className="text-zinc-400">Underground Cellar Grit.</span>
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Inspired by secluded mountain temples in Kyoto and subterranean amplifier dens in Gothenburg,
          Iron Lotus strips away modern plastic commercialism. Every texture is raw, fire-treated, and built for sound.
        </p>
      </div>

      {/* 4 Ambience Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AMBIENCE_PILLARS.map((pillar) => (
          <div
            key={pillar.number}
            className="p-6 rounded-2xl bg-[#121217] border border-white/5 hover:border-[#9e1a22]/50 transition-colors flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-metal text-xs text-zinc-500 tracking-wider">
                  {pillar.number}.
                </span>
                <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                  {getIcon(pillar.number)}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-metal text-[#e62335] tracking-widest block mb-1">
                  {pillar.japanese}
                </span>
                <h3 className="text-base font-bold text-white font-metal leading-snug">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Authentic Craft</span>
              <span className="text-zinc-600">&middot;</span>
              <span>Downtown Tampa</span>
            </div>
          </div>
        ))}
      </div>

      {/* Claim-to-Proof Adjacency: Attributable Testimonials */}
      <div className="pt-8">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
            Underground Word-of-Mouth
          </span>
          <h3 className="font-metal text-xl sm:text-2xl font-bold text-white mt-1">
            Reverberations from the Pit
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#121217]/60 border border-white/5 flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-white/5 pt-4">
                <div className="text-sm font-bold text-white font-metal">{t.author}</div>
                <div className="text-xs text-zinc-400">{t.role}</div>
                <div className="text-[11px] text-[#e62335] mt-0.5">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
