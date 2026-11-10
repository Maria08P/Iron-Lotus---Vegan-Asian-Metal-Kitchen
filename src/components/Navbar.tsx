import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#08080a]/90 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <span className="w-9 h-9 rounded-lg bg-[#9e1a22] text-black font-metal font-black text-xl flex items-center justify-center shadow-lg shadow-[#9e1a22]/30 group-hover:scale-105 transition-transform">
              蓮
            </span>
            <span className="font-metal tracking-widest text-lg sm:text-xl font-bold">
              IRON LOTUS
            </span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-zinc-300">
            <a href="#sanctuary" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              The Sanctuary
            </a>
            <a href="#menu" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Ritual Menu
            </a>
            <a href="#sound" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Sound System
            </a>
            <a href="#reserve" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Crypt Booths
            </a>
            <a href="#location" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Downtown Tampa
            </a>
          </nav>

          {/* Zone 3: Primary action + Cart toggle & Audio affordance */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Audio Toggle Button */}
            <button
              onClick={onToggleAudio}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-semibold ${
                isPlayingAudio
                  ? 'bg-[#9e1a22]/20 border-[#9e1a22] text-[#ff3a4d]'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
              title={isPlayingAudio ? 'Mute Sanctuary Drone' : 'Play Sanctuary Tube Audio'}
              aria-label="Toggle sanctuary audio"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="hidden lg:inline whitespace-nowrap">Analog Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden lg:inline whitespace-nowrap">Muted</span>
                </>
              )}
            </button>

            {/* Takeout Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white transition-colors flex items-center gap-2"
              aria-label="View takeout cart"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-300" />
              <span className="hidden sm:inline text-xs font-semibold">Takeout</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#9e1a22] text-white text-[11px] font-bold flex items-center justify-center -ml-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action: Summon a Table */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex px-4 py-2.5 rounded-xl bg-[#9e1a22] hover:bg-[#b5202a] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#9e1a22]/25 whitespace-nowrap shrink-0"
            >
              Summon a Booth
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#121217] border-b border-white/10 px-6 py-6 space-y-4">
            <a
              href="#sanctuary"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-zinc-200 hover:text-white py-1"
            >
              The Sanctuary
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-zinc-200 hover:text-white py-1"
            >
              Ritual Menu
            </a>
            <a
              href="#sound"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-zinc-200 hover:text-white py-1"
            >
              Sound System
            </a>
            <a
              href="#reserve"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-zinc-200 hover:text-white py-1"
            >
              Crypt Booths
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-zinc-200 hover:text-white py-1"
            >
              Downtown Tampa
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-xl bg-[#9e1a22] text-white font-bold text-xs uppercase tracking-wider text-center"
              >
                Summon a Booth
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
