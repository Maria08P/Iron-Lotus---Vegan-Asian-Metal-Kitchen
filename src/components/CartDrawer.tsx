import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [pickupTime, setPickupTime] = useState<'asap' | 'scheduled'>('asap');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const salesTax = subtotal * 0.085; // 8.5% Hillsborough County / Tampa sales tax
  const total = subtotal + salesTax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const orderNum = `IL-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderId(orderNum);
    setOrderConfirmed(true);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121217] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#9e1a22] flex items-center justify-center text-black font-metal font-bold text-sm">
                蓮
              </div>
              <div>
                <h3 className="font-metal text-base font-bold text-white">Your Takeout Bag</h3>
                <span className="text-[11px] text-zinc-400">Curbside Pickup &middot; Downtown Tampa</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {orderConfirmed ? (
              /* Order Confirmation Screen */
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Order Transmitted &middot; Kitchen Prepping
                  </span>
                  <h4 className="font-metal text-2xl font-bold text-white mt-1">
                    Pickup #{confirmedOrderId}
                  </h4>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 text-left text-xs space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Guest:</span>
                    <span className="text-white font-medium">{customerName}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Ready in:</span>
                    <span className="text-[#e62335] font-bold font-mono">25–30 Minutes</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Pickup Spot:</span>
                    <span className="text-white">512 N Franklin St, Tampa, FL</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 pt-2 border-t border-white/5">
                    <span>Amount Paid at Pickup:</span>
                    <span className="font-mono text-white font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Look for the black iron lantern and ring the side takeout window facing Franklin St.
                  Show this order number to collect your steaming bowls.
                </p>

                <button
                  onClick={handleFinish}
                  className="w-full py-3 rounded-xl bg-[#9e1a22] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#b5202a] transition-all"
                >
                  Return to Sound Sanctuary
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Bag View */
              <div className="text-center py-16 space-y-4 text-zinc-500">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                <div>
                  <h4 className="text-base font-bold text-white font-metal">Your bag is empty</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Add bowls of tantanmen, charcoal bao, or highballs from the Ritual Menu.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <div className="space-y-4">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.cartId}
                    className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-metal text-sm font-bold text-white">
                          {cartItem.item.name}
                        </h4>
                        <div className="text-[11px] text-zinc-400">
                          Spice: Level {cartItem.spiceLevel}
                          {cartItem.extraAddons.length > 0 && (
                            <span> &middot; {cartItem.extraAddons.length} Extra Add-on(s)</span>
                          )}
                        </div>
                        {cartItem.customNotes && (
                          <div className="text-[10px] text-zinc-500 italic mt-0.5">
                            &ldquo;{cartItem.customNotes}&rdquo;
                          </div>
                        )}
                      </div>

                      <div className="text-sm font-mono font-bold text-white tabular-nums">
                        ${cartItem.totalPrice.toFixed(2)}
                      </div>
                    </div>

                    {/* Stepper & Delete */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                          className="p-1 rounded text-zinc-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-mono font-bold text-white tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                          className="p-1 rounded text-zinc-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-zinc-500 hover:text-[#e62335] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Pickup Time Mode */}
                <div className="pt-2 space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-400">
                    Pickup Window
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPickupTime('asap')}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                        pickupTime === 'asap'
                          ? 'bg-[#9e1a22]/20 border-[#9e1a22] text-white font-semibold'
                          : 'bg-black/30 border-white/5 text-zinc-400'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-[#e62335]" />
                      <span>ASAP (25-30m)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPickupTime('scheduled')}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                        pickupTime === 'scheduled'
                          ? 'bg-[#9e1a22]/20 border-[#9e1a22] text-white font-semibold'
                          : 'bg-black/30 border-white/5 text-zinc-400'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Later Tonight</span>
                    </button>
                  </div>
                </div>

                {/* Customer Checkout Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="pt-2 space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                      Phone / SMS for Pickup Alert
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (813) 555-0199"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#e62335] transition-colors"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {!orderConfirmed && cart.length > 0 && (
            <div className="p-6 border-t border-white/5 bg-[#0e0e12] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Tampa Sales Tax (8.5%)</span>
                  <span className="font-mono tabular-nums text-white">${salesTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/5">
                  <span className="text-white">Estimated Total</span>
                  <span className="font-mono text-[#e62335] tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 rounded-xl bg-[#9e1a22] hover:bg-[#b5202a] text-white font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg shadow-[#9e1a22]/30 flex items-center justify-center gap-2"
              >
                <span>Transmit Takeout Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
