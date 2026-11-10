import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

const AVAILABLE_ADDONS: AddOnOption[] = [
  { id: 'extra-mushrooms', name: 'Torched King Oyster Skewer', price: 4.0 },
  { id: 'extra-chili-oil', name: 'House Red Sichuan Chili Crunch', price: 2.0 },
  { id: 'extra-menma', name: 'Smoked Wood-Fired Bamboo Menma', price: 2.5 },
  { id: 'extra-tofu', name: 'Extra Smoked Panko Tofu Slab', price: 3.5 },
];

export const DishModal: React.FC<DishModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState(item.spiceLevel || 1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState('');

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, addId) => {
    const found = AVAILABLE_ADDONS.find((a) => a.id === addId);
    return sum + (found ? found.price : 0);
  }, 0);

  const unitPrice = item.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity,
      spiceLevel,
      customNotes: customNotes.trim() || undefined,
      extraAddons: selectedAddons,
      totalPrice,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#121217] border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header with Close */}
        <div className="p-6 pb-4 border-b border-white/5 flex items-start justify-between">
          <div>
            {item.japaneseName && (
              <span className="text-xs font-metal text-[#e62335] tracking-widest block">
                {item.japaneseName}
              </span>
            )}
            <h3 className="text-xl font-bold font-metal text-white mt-0.5">{item.name}</h3>
            <span className="text-xs text-zinc-400">Base Price: ${item.price.toFixed(2)}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {item.image && (
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover filter contrast-105"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>

          {/* Spice Level Selection */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300">
              Spice Calibration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { lvl: 0, label: 'Zero Heat' },
                { lvl: 1, label: 'Mild Buzz' },
                { lvl: 2, label: 'Heavy Doom' },
                { lvl: 3, label: 'Infernal' },
              ].map(({ lvl, label }) => {
                const isSelected = spiceLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSpiceLevel(lvl)}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#9e1a22] text-white shadow-md shadow-[#9e1a22]/30'
                        : 'bg-black/40 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <div className="flex justify-center mb-0.5">
                      {lvl === 0 ? (
                        <span className="text-[10px] text-zinc-500 font-mono">0</span>
                      ) : (
                        [...Array(lvl)].map((_, i) => (
                          <Flame key={i} className="w-3 h-3 text-[#ff4d5e] fill-current" />
                        ))
                      )}
                    </div>
                    <span className="text-[11px] block truncate">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Add-ons */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300">
              Sonic Enhancements &amp; Add-ons
            </label>
            <div className="space-y-2">
              {AVAILABLE_ADDONS.map((addon) => {
                const checked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      checked
                        ? 'bg-[#9e1a22]/15 border-[#9e1a22] text-white'
                        : 'bg-black/30 border-white/5 text-zinc-300 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                          checked
                            ? 'bg-[#9e1a22] border-[#9e1a22] text-white'
                            : 'border-white/20'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-mono text-zinc-400 tabular-nums">
                      +${addon.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen Special Instructions */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-300">
              Kitchen Instructions or Allergies
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Gluten-free tamari requested, scallions on the side..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#9e1a22] transition-colors"
            />
          </div>
        </div>

        {/* Footer Actions: Quantity Stepper & Add Button */}
        <div className="p-6 pt-4 border-t border-white/5 bg-[#0e0e12] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-mono font-bold text-white tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add CTA */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-5 rounded-xl bg-[#9e1a22] hover:bg-[#b5202a] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#9e1a22]/30 flex items-center justify-between"
          >
            <span>Add to Takeout Bag</span>
            <span className="font-mono text-sm tabular-nums">${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
