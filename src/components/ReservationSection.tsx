import React, { useState } from 'react';
import { Calendar, Users, Clock, Headphones, CheckCircle2, X } from 'lucide-react';
import { ReservationData } from '../types';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00 (Peak Heavy Riffs)',
    guests: 2,
    seatingArea: 'crypt',
    audioPreference: 'Normal Sanctuary Volume',
    dietaryNotes: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `LOTUS-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmationCode(code);
    setBookingConfirmed(true);
  };

  return (
    <section id="reserve" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form Card */}
        <div className="lg:col-span-7 bg-[#121217] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#e62335] font-semibold block">
              Table Summoning
            </span>
            <h2 className="font-metal text-3xl sm:text-4xl font-bold text-white">
              Summon a Crypt Booth
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Reserve your enclave amidst charred cedar, incense, and analog heavy metal soundscapes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5">
                  Your Moniker / Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Thorne"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5">
                  Phone / Signal
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (813) 555-0182"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5">
                Email for Confirmation Voucher
              </label>
              <input
                type="email"
                required
                placeholder="alex@sanctuary.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors"
              />
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#e62335]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#e62335]" />
                  <span>Seating Time</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors"
                >
                  <option value="17:30 (Early Twilight)">17:30 (Early Twilight)</option>
                  <option value="19:00 (Heavy Riff Hour)">19:00 (Heavy Riff Hour)</option>
                  <option value="20:30 (Peak Sanctuary)">20:30 (Peak Sanctuary)</option>
                  <option value="22:30 (Late Night Sludge)">22:30 (Late Night Sludge)</option>
                  <option value="00:00 (Midnight Ramen)">00:00 (Midnight Ramen)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#e62335]" />
                  <span>Party Size</span>
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors"
                >
                  <option value={1}>1 Solo Audiophile</option>
                  <option value={2}>2 Guests (Duo)</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests (Crypt Booth)</option>
                  <option value={6}>6 Guests (Coven Table)</option>
                  <option value={8}>8+ (Full Banquet Altar)</option>
                </select>
              </div>
            </div>

            {/* Seating Area Selection */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-2">
                Preferred Seating Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'crypt',
                    title: 'Charred Crypt Booth',
                    desc: 'Private booth with audiophile headphone jacks & cassettes',
                  },
                  {
                    id: 'altar',
                    title: 'Vinyl Altar Front',
                    desc: 'Direct line-of-sight to tube amps & rotating turntables',
                  },
                  {
                    id: 'counter',
                    title: 'Stone Garden Counter',
                    desc: 'Counter bar viewing the live torch & open kitchen line',
                  },
                ].map((zone) => {
                  const isSelected = formData.seatingArea === zone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, seatingArea: zone.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#9e1a22]/15 border-[#9e1a22] text-white shadow-sm'
                          : 'bg-[#08080a] border-white/5 text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold text-white font-metal mb-1">
                        {zone.title}
                      </div>
                      <div className="text-[10px] text-zinc-400 leading-tight">
                        {zone.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Acoustic & Dietary Preferences */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5 flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5 text-[#c99738]" />
                <span>Audio or Dietary Preferences</span>
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Celebrating album release, need gluten-free noodles, seated away from subwoofers..."
                value={formData.dietaryNotes}
                onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors placeholder-zinc-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#9e1a22] hover:bg-[#b5202a] text-white font-extrabold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl shadow-[#9e1a22]/30 active:scale-[0.99]"
            >
              Summon Table Reservation
            </button>
          </form>
        </div>

        {/* Right Column: Reservation Policies & Vinyl Sanctum Guidelines */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#121217] border border-white/10 space-y-4">
            <h3 className="font-metal text-lg font-bold text-white">The Sanctuary Code</h3>
            
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <span className="font-metal text-[#e62335] font-bold text-sm">I.</span>
                <p>
                  <strong className="text-white">Cruelty-Free Brutality:</strong> Our entire kitchen is 100% plant-based. No dairy, meat, egg, or fish products enter the sanctuary.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-metal text-[#e62335] font-bold text-sm">II.</span>
                <p>
                  <strong className="text-white">Acoustic Immersion:</strong> Music plays at rich, warm room levels through tube amps. We provide complimentary custom ear protection upon request.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-metal text-[#e62335] font-bold text-sm">III.</span>
                <p>
                  <strong className="text-white">Late Night Walk-ins:</strong> Booth reservations are honored up to 15 minutes past seating time. After 11:00 PM, all booths convert to first-come late night walk-ins.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-400">
              Questions or private album listening party buyouts? Email{' '}
              <a href="mailto:cult@ironlotuskitchen.com" className="text-[#e62335] underline">
                cult@ironlotuskitchen.com
              </a>
            </div>
          </div>

          {/* Quick Highlight Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#18181f] to-[#121217] border border-[#e62335]/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white font-metal uppercase tracking-wider">
                Late Night Ramen Ritual
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                Every night from 11:00 PM – 2:00 AM &middot; Special late night ramen menu
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#9e1a22] text-white font-bold text-[10px] uppercase tracking-wider shrink-0">
              Active
            </span>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#121217] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#9e1a22]/20 border border-[#9e1a22]/40 text-[#ff4d5e] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#e62335]">
                Ritual Confirmed &middot; Table Sealed
              </span>
              <h3 className="font-metal text-2xl font-bold text-white mt-1">
                Voucher #{confirmationCode}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Guest:</span>
                <span className="text-white font-bold">{formData.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Date &amp; Time:</span>
                <span className="text-white">{formData.date} &middot; {formData.time}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Enclave:</span>
                <span className="text-[#c99738] font-semibold uppercase">
                  {formData.seatingArea === 'crypt' ? 'Charred Crypt Booth' : formData.seatingArea === 'altar' ? 'Vinyl Altar' : 'Stone Counter'}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Party Size:</span>
                <span className="text-white">{formData.guests} Guests</span>
              </div>
              <div className="flex justify-between text-zinc-400 pt-2 border-t border-white/5">
                <span>Location:</span>
                <span className="text-zinc-200">512 N Franklin St, Tampa, FL</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed">
              A copy of your voucher has been noted in the coven records. Arrive at the black lantern entrance
              and present your name or voucher number to the turntable host.
            </p>

            <button
              onClick={() => setBookingConfirmed(false)}
              className="w-full py-3 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              Done &middot; Return to Sanctuary
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
