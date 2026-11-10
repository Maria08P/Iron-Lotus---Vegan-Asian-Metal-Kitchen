import React from 'react';
import { Disc, Radio, Instagram, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#9e1a22] flex items-center justify-center font-metal text-xl text-black font-extrabold shadow-lg shadow-[#9e1a22]/30">
                蓮
              </div>
              <span className="font-metal tracking-widest text-xl text-white font-bold">
                IRON LOTUS 鉄蓮
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Downtown Tampa’s underground sanctuary for plant-forward Asian street craft, charred cedar temple aesthetics, and analog heavy metal soundscapes.
            </p>

            <div className="text-[11px] text-zinc-500">
              512 N Franklin St &middot; Tampa, FL 33602 &middot; (813) 555-6660
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white font-metal">
              The Sanctuary
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#sanctuary" className="hover:text-white transition-colors">
                  Atmosphere &amp; Woodcraft
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Ritual Vegan Menu
                </a>
              </li>
              <li>
                <a href="#sound" className="hover:text-white transition-colors">
                  Analog Sound System
                </a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-white transition-colors">
                  Crypt Booth Bookings
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Downtown Tampa Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white font-metal">
              Operating Hours
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Tuesday – Thursday:</span>
                <span className="text-white">5 PM – 1 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday – Saturday:</span>
                <span className="text-white">5 PM – 2 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white">5 PM – Midnight</span>
              </div>
              <div className="flex justify-between text-zinc-500 pt-1">
                <span>Monday:</span>
                <span className="italic">Closed for Vinyl Curation</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; 2026 IRON LOTUS. Zero animals harmed. Max wattage pushed. Downtown Tampa, FL.
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#e62335] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#sound"
              className="text-zinc-400 hover:text-[#e62335] transition-colors"
              aria-label="Vinyl playlist"
            >
              <Disc className="w-4 h-4" />
            </a>
            <a
              href="#sound"
              className="text-zinc-400 hover:text-[#e62335] transition-colors"
              aria-label="Analog radio"
            >
              <Radio className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
