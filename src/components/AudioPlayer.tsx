import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Sliders, Disc, Radio } from 'lucide-react';
import { VinylTrack } from '../types';
import { VINYL_TRACKS } from '../data/menuData';

interface AudioPlayerProps {
  currentTrack: VinylTrack;
  onSelectTrack: (track: VinylTrack) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
  distortionLevel: number;
  onChangeDistortion: (dist: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentTrack,
  onSelectTrack,
  isPlaying,
  onTogglePlay,
  volume,
  onChangeVolume,
  distortionLevel,
  onChangeDistortion,
}) => {
  const [fuzzMode, setFuzzMode] = useState<'warm' | 'heavy' | 'fuzz'>('heavy');

  const currentIndex = VINYL_TRACKS.findIndex((t) => t.id === currentTrack.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % VINYL_TRACKS.length;
    onSelectTrack(VINYL_TRACKS[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + VINYL_TRACKS.length) % VINYL_TRACKS.length;
    onSelectTrack(VINYL_TRACKS[prevIdx]);
  };

  const handleFuzzChange = (mode: 'warm' | 'heavy' | 'fuzz') => {
    setFuzzMode(mode);
    if (mode === 'warm') onChangeDistortion(8);
    else if (mode === 'heavy') onChangeDistortion(20);
    else onChangeDistortion(35);
  };

  return (
    <section id="sound" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#121217] border border-white/10 p-8 lg:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Subtle ambient red background wash */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9e1a22]/10 blur-3xl pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Curation Philosophy & Live Roster */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#e62335] font-semibold">
              <Radio className="w-4 h-4" />
              <span>Analog Sound Sanctuary</span>
            </div>

            <h2 className="font-metal text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Food is Texture. <br />
              <span className="text-zinc-400">Noise is Spirit.</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              We never run compressed digital playlists. Behind our counter sits a dedicated vinyl console
              spinning rare pressings from Tokyo, Gothenburg, and underground American stoner-doom labels.
              Each table is tuned for rich low-end rumble without harsh frequency fatigue.
            </p>

            {/* Hardware Specifications */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Amplification &amp; Acoustics:
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase">Main System</span>
                  <span className="font-semibold text-white">McIntosh MC275 Tube Amps</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase">Monitors</span>
                  <span className="font-semibold text-white">Klipschorn Corner Horns</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase">Turntables</span>
                  <span className="font-semibold text-white">Technics 1200GR2 &middot; Hana Cartridges</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase">Booth Audio</span>
                  <span className="font-semibold text-white">Schiit Audio Headphone Stations</span>
                </div>
              </div>
            </div>

            {/* Select Track from Rotation */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Curated Vinyl Rotation (Select to Spin):
              </h4>
              <div className="flex flex-wrap gap-2">
                {VINYL_TRACKS.map((track) => {
                  const isSelected = track.id === currentTrack.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => onSelectTrack(track)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#9e1a22] text-white shadow-md shadow-[#9e1a22]/30'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                      }`}
                    >
                      {track.artist} &middot; {track.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Turntable & Audiophile Console */}
          <div className="lg:col-span-6 bg-[#08080a] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
            
            {/* Console Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e62335] animate-ping" />
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-300">
                  Tube Pre-Amp Output
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-400">
                <span>{currentTrack.rpm} RPM</span> &middot; <span>{currentTrack.genre}</span>
              </div>
            </div>

            {/* Visual Turntable Platter Deck */}
            <div className="relative flex items-center justify-center py-4">
              {/* Platter Base */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 border-4 border-zinc-800 shadow-2xl flex items-center justify-center">
                
                {/* Vinyl Grooves with Rotation */}
                <div
                  className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#0a0a0c] border border-white/10 flex items-center justify-center relative overflow-hidden transition-all ${
                    isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                  }`}
                  style={{
                    backgroundImage: `repeating-radial-gradient(circle at center, #111 0, #111 2px, #050505 3px, #050505 4px)`,
                  }}
                >
                  {/* Center Record Label */}
                  <div className="w-24 h-24 rounded-full bg-[#9e1a22] border-2 border-white/20 flex flex-col items-center justify-center text-center p-2 shadow-inner">
                    <span className="font-metal text-xl text-black font-extrabold leading-none">蓮</span>
                    <span className="text-[8px] font-bold text-white uppercase tracking-wider mt-1 truncate max-w-[80px]">
                      {currentTrack.artist}
                    </span>
                    <span className="text-[7px] text-zinc-200 truncate max-w-[80px]">
                      {currentTrack.album}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-black mt-1" />
                  </div>
                </div>

                {/* Simulated Tonearm Armature */}
                <div
                  className={`absolute top-4 right-4 sm:right-6 w-20 sm:w-24 h-40 pointer-events-none transition-transform duration-700 origin-top-right ${
                    isPlaying ? 'rotate-12 translate-x-2' : '-rotate-12'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 absolute top-0 right-0 shadow" />
                  <div className="w-1 h-32 bg-zinc-400 absolute top-2 right-1 rotate-[8deg]" />
                  <div className="w-3 h-5 bg-[#e62335] rounded-xs absolute bottom-4 right-4 shadow" />
                </div>
              </div>
            </div>

            {/* Currently Playing Track Details */}
            <div className="space-y-1 text-center">
              <h3 className="text-lg font-bold text-white font-metal">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-zinc-400">
                {currentTrack.artist} &middot; <span className="italic">{currentTrack.album}</span> ({currentTrack.year})
              </p>
            </div>

            {/* Simulated VU Audio Level Meter */}
            <div className="space-y-1.5 bg-black/60 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                <span>-20dB</span>
                <span>-10dB</span>
                <span>-3dB</span>
                <span>0dB</span>
                <span className="text-[#e62335]">+3dB (Tube Sat)</span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden flex gap-0.5">
                {[...Array(24)].map((_, i) => {
                  const isActive = isPlaying && (i < 18 + Math.floor(Math.sin(Date.now() / 200 + i) * 3));
                  const isRedZone = i > 19;
                  return (
                    <div
                      key={i}
                      className={`flex-1 h-full rounded-xs transition-colors duration-75 ${
                        isActive
                          ? isRedZone
                            ? 'bg-[#e62335]'
                            : 'bg-[#c99738]'
                          : 'bg-zinc-800'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Controls Bar: Prev, Play/Pause, Next */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Previous track"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={onTogglePlay}
                className="w-14 h-14 rounded-full bg-white text-black hover:bg-zinc-200 transition-all flex items-center justify-center shadow-lg shadow-white/20 active:scale-95"
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-black" />
                ) : (
                  <Play className="w-6 h-6 fill-black translate-x-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Next track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume & Fuzz Saturation Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5 text-xs">
              
              {/* Volume Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Master Level</span>
                  </span>
                  <span className="font-mono text-[11px] tabular-nums">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
                  className="w-full accent-[#e62335] bg-zinc-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Fuzz Saturation Mode */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Tube Distortion</span>
                  </span>
                  <span className="text-[11px] uppercase font-semibold text-zinc-300">
                    {fuzzMode}
                  </span>
                </div>
                <div className="flex gap-1">
                  {(['warm', 'heavy', 'fuzz'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleFuzzChange(mode)}
                      className={`flex-1 py-1 rounded text-[11px] font-semibold uppercase transition-colors ${
                        fuzzMode === mode
                          ? 'bg-[#9e1a22] text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
