import React, { useState, useMemo } from 'react';
import { Flame, Plus, Search, Check, Sparkles } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface MenuSectionProps {
  onSelectItemForCustomization: (item: MenuItem) => void;
  onQuickAddToCart: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItemForCustomization,
  onQuickAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyGlutenFree, setOnlyGlutenFree] = useState(false);
  const [onlySignatures, setOnlySignatures] = useState(false);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIng = item.ingredients.some((i) => i.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      // Dietary filter
      if (onlyGlutenFree && !item.isGlutenFreeOption) return false;
      if (onlySignatures && !item.isHouseFavorite) return false;

      return true;
    });
  }, [activeCategory, searchQuery, onlyGlutenFree, onlySignatures]);

  const handleQuickAdd = (item: MenuItem) => {
    onQuickAddToCart(item);
    setQuickAddedId(item.id);
    setTimeout(() => {
      setQuickAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'all', label: 'Complete Feast' },
    { key: 'ramen', label: 'Ramen & Rich Broths' },
    { key: 'bao', label: 'Charcoal Bao & Bites' },
    { key: 'skewers', label: 'Skewers & Dim Sum' },
    { key: 'drinks', label: 'Elixirs & Brews' },
  ];

  return (
    <section id="menu" className="py-20 bg-[#0c0c10] border-y border-white/5 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#e62335] font-semibold">
            Plant Blood &middot; Relentless Umami
          </div>
          <h2 className="font-metal text-3xl sm:text-5xl font-bold text-white tracking-tight">
            THE RITUAL MENU
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            100% plant-forward Asian street gastronomy. Crafted with fermented koji, charred sesame,
            wood-smoked fungi, and hand-pressed chili oils. Zero animals harmed.
          </p>
        </div>

        {/* Controls Toolbar: Categories, Search & Filters */}
        <div className="space-y-4">
          {/* Category Tabs (Segmented Control Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#9e1a22] text-white shadow-md shadow-[#9e1a22]/30'
                      : 'bg-[#18181f] text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sub-toolbar: Search Input & Toggle Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto pt-2">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ramen, bao, highballs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121217] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e62335] transition-colors"
              />
            </div>

            {/* Quick Dietary Toggles */}
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => setOnlyGlutenFree(!onlyGlutenFree)}
                className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  onlyGlutenFree
                    ? 'bg-zinc-800 border-[#c99738] text-[#c99738]'
                    : 'bg-[#121217] border-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <span>Gluten-Free Option</span>
              </button>

              <button
                onClick={() => setOnlySignatures(!onlySignatures)}
                className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  onlySignatures
                    ? 'bg-zinc-800 border-[#e62335] text-[#ff4d5e]'
                    : 'bg-[#121217] border-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>House Signatures</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 space-y-2">
            <p className="text-base font-semibold">No dishes match your active filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setOnlyGlutenFree(false);
                setOnlySignatures(false);
              }}
              className="text-xs text-[#e62335] underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAdded = quickAddedId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#121217] border border-white/5 hover:border-[#9e1a22]/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
                >
                  {/* Optional Dish Image */}
                  {item.image && (
                    <div className="relative w-full h-48 overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105 brightness-95"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
                      {item.isHouseFavorite && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[#c99738] font-bold text-[10px] uppercase tracking-wider border border-[#c99738]/30">
                          Signature Ritual
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dish Info */}
                  <div className="p-6 space-y-3 flex-1">
                    {/* Header Row: Category / Kanji / Price */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {item.japaneseName && (
                          <span className="font-metal text-[11px] text-[#e62335] tracking-widest block">
                            {item.japaneseName}
                          </span>
                        )}
                        <h3 className="font-metal text-lg font-bold text-white group-hover:text-zinc-100 leading-snug">
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-lg font-mono font-bold text-white tabular-nums shrink-0">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Unboxed Metadata (NO PILL BADGE SANDWICH!) */}
                    <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-500">
                      <span className="text-zinc-400">100% Vegan</span>
                      {item.isGlutenFreeOption && (
                        <>
                          <span aria-hidden="true">&middot;</span>
                          <span className="text-[#c99738]">GF Option</span>
                        </>
                      )}
                      {item.spiceLevel > 0 && (
                        <>
                          <span aria-hidden="true">&middot;</span>
                          <span className="flex items-center text-[#ff4d5e] gap-0.5">
                            {[...Array(item.spiceLevel)].map((_, i) => (
                              <Flame key={i} className="w-3 h-3 fill-current" />
                            ))}
                            <span className="ml-0.5">
                              {item.spiceLevel === 1 ? 'Mild Heat' : item.spiceLevel === 2 ? 'Heavy Heat' : 'Infernal'}
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectItemForCustomization(item)}
                      className="text-xs font-semibold text-zinc-300 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors"
                    >
                      Custom Specs &amp; Notes
                    </button>

                    <button
                      onClick={() => handleQuickAdd(item)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/10 hover:bg-[#9e1a22] text-white'
                      }`}
                      aria-label={`Add ${item.name} to takeout bag`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Late Night Takeout Notice */}
        <div className="p-6 rounded-2xl bg-[#121217] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-metal text-sm font-bold text-white uppercase tracking-wider">
              Late Night Street Pickup &middot; Downtown Tampa
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Order takeout online for curbside pickup on N Franklin St until 1:30 AM every operating night.
            </p>
          </div>
          <span className="text-xs font-bold font-mono text-[#c99738] bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 shrink-0">
            KITCHEN OPEN: 5:00 PM – 1:30 AM
          </span>
        </div>

      </div>
    </section>
  );
};
