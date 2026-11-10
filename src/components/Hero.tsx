import React from 'react';
import { Volume2, ChevronRight, Disc3 } from 'lucide-react';
import { HERO_IMAGE } from '../data/menuData';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  activeTrackTitle: string;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReservation,
  onExploreMenu,
  isPlayingAudio,
  onToggleAudio,
  activeTrackTitle,
}) => {
  return (
    <section className="relative pt-6 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* 2-Column Split Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative & Primary CTAs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Unboxed Kicker Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-medium">
            <span className="text-[#e62335] font-semibold">Downtown Tampa, FL</span>
            <span aria-hidden="true">·</span>
            <span>512 N Franklin Street</span>
            <span aria-hidden="true">·</span>
            <span>100% Plant-Forward Kitchen</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-metal text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            Plant Flesh. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e62335] via-[#ff4d5e] to-[#f59e0b]">
              Heavy Riffs.
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-zinc-300 text-base sm:text-lg font-normal leading-relaxed">
            Step through the blackened cedar doors into an underground sound sanctuary.
            Traditional Japanese charred timber (Shou Sugi Ban), temple lanterns, and warm analog
            McIntosh tube amplifiers meet artisanal vegan Asian street craft.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreMenu}
              className="px-6 py-3.5 rounded-xl bg-white text-black font-extrabold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl"
            >
              <span>Explore The Feast</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenReservation}
              className="px-6 py-3.5 rounded-xl bg-[#18181f] border border-white/10 hover:border-[#9e1a22] text-white font-bold text-sm uppercase tracking-wider transition-all"
            >
              Summon a Booth
            </button>

            <button
              onClick={onToggleAudio}
              className="px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-[#e62335]' : 'text-zinc-500'}`} />
              <span>{isPlayingAudio ? 'Mute Sanctuary Drone' : 'Audition Vinyl Sound'}</span>
            </button>
          </div>

          {/* Live Turntable Ticker */}
          <div className="pt-2 flex items-center gap-3 text-xs text-zinc-400">
            <Disc3 className={`w-4 h-4 text-[#e62335] ${isPlayingAudio ? 'animate-spin' : ''}`} />
            <span className="uppercase text-[11px] tracking-wider text-zinc-500 font-semibold">Turntable Live:</span>
            <span className="text-zinc-200 font-medium truncate">{activeTrackTitle}</span>
          </div>
        </div>

        {/* Right Column: Hero Sanctuary Photography with Framed Presentation */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121217] shadow-2xl">
            {/* High-res generated photograph */}
            <img
              src={HERO_IMAGE}
              alt="Iron Lotus underground Asian vegan kitchen and vinyl bar in Downtown Tampa"
              className="w-full h-[460px] object-cover filter contrast-110 brightness-95 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Scrim for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-90" />

            {/* Grounding Card */}
            <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-left">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-metal tracking-wider text-[#e62335] uppercase">The Listening Room</span>
                <span className="font-mono text-[11px]">Downtown Tampa</span>
              </div>
              <h3 className="text-base font-bold text-white font-metal">Shou Sugi Ban &amp; Analog Vinyl Altar</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Charred Japanese cedar walls paired with McIntosh tube electronics, serving 100% plant-based bowls until 2:00 AM.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Item Proof & Spec Strip (Full-Width Row Below Hero Split) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/5 text-center sm:text-left">
        <div className="p-4 rounded-2xl bg-[#121217]/50 border border-white/5">
          <div className="text-2xl font-black text-white font-metal tabular-nums">100%</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Plant-Based Umami</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Cruelty-free broths &amp; bao</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121217]/50 border border-white/5">
          <div className="text-2xl font-black text-[#e62335] font-metal tabular-nums">120dB</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Analog Tube Audio</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Vintage McIntosh &amp; Klipsch</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121217]/50 border border-white/5">
          <div className="text-2xl font-black text-white font-metal tabular-nums">02:00 AM</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Late Night Kitchen</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Full ramen menu after dark</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121217]/50 border border-white/5">
          <div className="text-2xl font-black text-[#c99738] font-metal">Franklin St</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Downtown Tampa</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Arts District near Riverwalk</div>
        </div>
      </div>
    </section>
  );
};
