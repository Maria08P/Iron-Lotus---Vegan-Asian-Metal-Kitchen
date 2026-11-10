import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Copy, Check, Car, Train } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const address = '512 N Franklin St, Tampa, FL 33602';

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if restaurant is currently open (5pm to 2am, Tue-Sun)
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const isOpenToday = day !== 1; // Closed Mondays
  const isOpenNow = isOpenToday && (hour >= 17 || hour < 2);

  return (
    <section id="location" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Details & Practical Logistics */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#e62335] font-semibold block">
              The Threshold &middot; Downtown Tampa, FL
            </span>
            <h2 className="font-metal text-3xl sm:text-4xl font-bold text-white">
              Find the Red Lanterns
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Tucked along the historic North Franklin Street arts corridor in Downtown Tampa, one block north
              of Twiggs and minutes from the Tampa Theatre and Riverwalk. Look for the charred Shou Sugi Ban facade
              and the glowing iron kanji lantern.
            </p>
          </div>

          {/* Real-time Status Banner */}
          <div className="p-4 rounded-2xl bg-[#121217] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full ${
                  isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'
                }`}
              />
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  {isOpenNow ? 'Doors Open Now · Sound Playing' : 'Currently Resting · Opens at 5:00 PM'}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {isOpenToday ? 'Tonight: 5:00 PM – 2:00 AM (Late Kitchen)' : 'Closed Mondays for vinyl hunting'}
                </span>
              </div>
            </div>

            <span className="text-xs font-mono text-zinc-400">
              Downtown Tampa
            </span>
          </div>

          {/* Key Facts List */}
          <div className="space-y-3 text-xs">
            {/* Address */}
            <div className="p-3.5 rounded-xl bg-[#121217] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#e62335] shrink-0" />
                <span className="text-zinc-200 font-medium">{address}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                aria-label="Copy address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Hours */}
            <div className="p-3.5 rounded-xl bg-[#121217] border border-white/5 flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#e62335] shrink-0" />
              <div>
                <div className="text-zinc-200 font-medium">Tue – Sun: 5:00 PM – 2:00 AM</div>
                <div className="text-[11px] text-zinc-500">Late Night Vegan Kitchen runs until 1:30 AM &middot; Closed Mondays</div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+18135556660"
                className="p-3.5 rounded-xl bg-[#121217] border border-white/5 hover:border-white/10 flex items-center gap-3 transition-colors"
              >
                <Phone className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300 font-mono">+1 (813) 555-6660</span>
              </a>

              <a
                href="mailto:cult@ironlotuskitchen.com"
                className="p-3.5 rounded-xl bg-[#121217] border border-white/5 hover:border-white/10 flex items-center gap-3 transition-colors"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300 truncate">cult@ironlotuskitchen.com</span>
              </a>
            </div>
          </div>

          {/* Transit & Parking Guidance */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Transit &amp; Parking in Downtown Tampa
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-400 text-[11px]">
              <div className="flex items-start gap-2">
                <Train className="w-4 h-4 text-[#c99738] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-300">TECO Streetcar:</strong> 2 blocks to Whiting Station. Direct connection from Ybor City &amp; Channelside.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Car className="w-4 h-4 text-[#e62335] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-300">Parking:</strong> Fort Brooke Garage on Whiting St. City meters along Franklin St free after 8:00 PM.
                </div>
              </div>
            </div>
          </div>

          {/* Action: Open Map */}
          <div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=512+N+Franklin+St+Tampa+FL+33602"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9e1a22] hover:bg-[#b5202a] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#9e1a22]/30"
            >
              <Navigation className="w-4 h-4" />
              <span>Launch Directions in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Right Column: Stylized Downtown Tampa Interactive Map Representation */}
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl bg-[#121217] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <span className="font-metal text-base font-bold text-white">Downtown Tampa Grid</span>
                <span className="text-[11px] text-zinc-400 block">Franklin St Corridor &middot; Riverwalk Arts Zone</span>
              </div>
              <span className="text-xs font-mono text-[#c99738] font-bold">FL 33602</span>
            </div>

            {/* Stylized Visual Map Board */}
            <div className="relative w-full h-80 rounded-2xl bg-[#09090c] border border-white/5 overflow-hidden p-6 flex flex-col justify-between">
              
              {/* Background Map Grid Graphic */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(to right, #333 1px, transparent 1px)`,
                  backgroundSize: '36px 36px',
                }}
              />

              {/* Tampa Riverwalk Waterway simulation */}
              <div className="absolute -left-12 top-0 bottom-0 w-24 bg-blue-950/40 border-r border-blue-500/20 -skew-x-12 flex items-center justify-center">
                <span className="text-[10px] text-blue-400/60 uppercase font-mono tracking-widest -rotate-90 whitespace-nowrap">
                  Hillsborough River
                </span>
              </div>

              {/* Pin 1: IRON LOTUS (Central Focus) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-[#9e1a22] text-white flex items-center justify-center shadow-xl shadow-[#9e1a22]/50 border border-white/20 animate-bounce">
                  <span className="font-metal text-lg font-black text-black">蓮</span>
                </div>
                <div className="mt-2 px-3 py-1 rounded-md bg-black/90 border border-white/20 text-center backdrop-blur-sm">
                  <div className="font-metal text-xs font-bold text-white">IRON LOTUS 鉄蓮</div>
                  <div className="text-[9px] text-[#e62335] font-mono">512 N Franklin St</div>
                </div>
              </div>

              {/* Nearby Landmarks */}
              <div className="relative z-1 flex justify-between text-[11px] text-zinc-500">
                <div className="bg-black/60 px-2.5 py-1 rounded-md border border-white/5">
                  <span className="text-zinc-300">Tampa Theatre</span> &middot; 1 block south
                </div>
                <div className="bg-black/60 px-2.5 py-1 rounded-md border border-white/5">
                  <span className="text-zinc-300">Curtis Hixon Park</span> &middot; 3 min walk
                </div>
              </div>

              <div className="relative z-1 flex justify-between text-[11px] text-zinc-500">
                <div className="bg-black/60 px-2.5 py-1 rounded-md border border-white/5">
                  <span className="text-zinc-300">TECO Streetcar</span> &middot; Whiting Station
                </div>
                <div className="bg-black/60 px-2.5 py-1 rounded-md border border-white/5">
                  <span className="text-zinc-300">Amalie Arena</span> &middot; 1.2 miles
                </div>
              </div>
            </div>

            {/* Late Night Vibe Note */}
            <div className="text-center text-xs text-zinc-400">
              <span className="text-white font-semibold">Post-show haven:</span> Stop in after concerts at Amalie Arena, The Ritz Ybor, or The Orpheum.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
