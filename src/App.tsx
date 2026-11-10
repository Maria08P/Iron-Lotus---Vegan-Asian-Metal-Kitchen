/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SanctuaryVibe } from './components/SanctuaryVibe';
import { MenuSection } from './components/MenuSection';
import { AudioPlayer } from './components/AudioPlayer';
import { ReservationSection } from './components/ReservationSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { MenuItem, CartItem, VinylTrack } from './types';
import { VINYL_TRACKS } from './data/menuData';
import { soundSynth } from './services/soundSynth';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<VinylTrack>(VINYL_TRACKS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [distortionLevel, setDistortionLevel] = useState(20);

  // Audio synthesizer lifecycle
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      soundSynth.stop();
      setIsPlayingAudio(false);
    } else {
      soundSynth.setVolume(volume);
      soundSynth.play(currentTrack.keyFreq, distortionLevel);
      setIsPlayingAudio(true);
    }
  };

  const handleSelectTrack = (track: VinylTrack) => {
    setCurrentTrack(track);
    if (isPlayingAudio) {
      soundSynth.play(track.keyFreq, distortionLevel);
    }
  };

  const handleChangeVolume = (newVol: number) => {
    setVolume(newVol);
    soundSynth.setVolume(newVol);
  };

  const handleChangeDistortion = (newDist: number) => {
    setDistortionLevel(newDist);
    if (isPlayingAudio) {
      soundSynth.play(currentTrack.keyFreq, newDist);
    }
  };

  // Cart operations
  const handleQuickAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id && ci.extraAddons.length === 0);
      if (existing) {
        return prev.map((ci) =>
          ci.cartId === existing.cartId
            ? { ...ci, quantity: ci.quantity + 1, totalPrice: (ci.quantity + 1) * ci.item.price }
            : ci
        );
      }
      const newCartItem: CartItem = {
        cartId: `${item.id}-${Date.now()}`,
        item,
        quantity: 1,
        spiceLevel: item.spiceLevel || 1,
        extraAddons: [],
        totalPrice: item.price,
      };
      return [...prev, newCartItem];
    });
  };

  const handleAddCustomizedToCart = (cartItem: CartItem) => {
    setCart((prev) => [...prev, cartItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => {
        if (ci.cartId === cartId) {
          const unit = ci.totalPrice / ci.quantity;
          return { ...ci, quantity, totalPrice: unit * quantity };
        }
        return ci;
      })
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reserve');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      soundSynth.stop();
    };
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col font-sans selection:bg-[#9e1a22] selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReservation}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReservation={scrollToReservation}
          onExploreMenu={scrollToMenu}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={handleToggleAudio}
          activeTrackTitle={`${currentTrack.artist} — "${currentTrack.title}"`}
        />

        {/* The Sanctuary: Atmosphere & Architectural Pillars */}
        <SanctuaryVibe />

        {/* The Ritual Menu: Filterable, Dish Details, Add to Order */}
        <MenuSection
          onSelectItemForCustomization={(item) => setCustomizingItem(item)}
          onQuickAddToCart={handleQuickAddToCart}
        />

        {/* The Underground Sound: Interactive Vinyl Turntable Player */}
        <AudioPlayer
          currentTrack={currentTrack}
          onSelectTrack={handleSelectTrack}
          isPlaying={isPlayingAudio}
          onTogglePlay={handleToggleAudio}
          volume={volume}
          onChangeVolume={handleChangeVolume}
          distortionLevel={distortionLevel}
          onChangeDistortion={handleChangeDistortion}
        />

        {/* Summon a Booth: Reservation Form */}
        <ReservationSection />

        {/* Location & Threshold: Downtown Tampa, FL */}
        <LocationSection />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Dish Customization Modal */}
      <DishModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddCustomizedToCart}
      />

      {/* Takeout Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
