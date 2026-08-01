'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Star, Download, Check, Sparkles, ShoppingCart, Sliders, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS_DATA, ProductItem } from '@/lib/data';
import { studioAudio } from '@/lib/audio';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [purchased, setPurchased] = useState<boolean>(false);

  if (!isOpen) return null;

  const categories = ['All', 'Presets & LUTs', 'Notion OS', 'Course', 'FX Templates', 'Ebook', 'Membership'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  const addToCart = (product: ProductItem) => {
    studioAudio.playClick(1000);
    if (!cart.some((c) => c.id === product.id)) {
      setCart([...cart, product]);
    }
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    studioAudio.playWhoosh();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setPurchased(true);
  };

  const totalCartPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  DIGITAL CREATOR STORE
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                    SHOPPING TOTE PORTAL
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Cinema LUTs, Director Notion OS, Lighting Courses & FX Packs</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={() => {
                  studioAudio.playClick(600);
                  setIsCartOpen(true);
                }}
                className="relative px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                Cart ({cart.length})
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  studioAudio.playClick(400);
                  onClose();
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="px-6 py-3 border-b border-slate-800/60 bg-slate-950/30 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  studioAudio.playClick(700);
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  studioAudio.playClick(900);
                  setActiveProduct(prod);
                }}
                className="group relative cursor-pointer bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 rounded-xl overflow-hidden shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                    <img
                      src={prod.coverImage}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {prod.badge && (
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                        {prod.badge}
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/90 text-amber-400 text-xs font-mono font-bold border border-slate-800">
                      ${prod.price}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      <span>{prod.rating}</span>
                      <span className="text-slate-500">({prod.reviewsCount})</span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{prod.tagline}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(prod);
                    }}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart — ${prod.price}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product Details & LUT Before/After Slider Overlay */}
        {activeProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  PRODUCT SHOWCASE // {activeProduct.category}
                </span>
                <button
                  onClick={() => setActiveProduct(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex flex-col gap-6">
                {/* LUT Before / After Interactive Split Comparison Slider if available */}
                {activeProduct.demoBeforeAfter ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                      <Sliders className="w-4 h-4" />
                      INTERACTIVE LUT COLOR GRADE COMPARISON (SLIDE TO COMPARE)
                    </span>
                    <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 select-none">
                      <img
                        src={activeProduct.demoBeforeAfter.after}
                        alt="Graded LUT"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div
                        style={{ width: `${sliderPos}%` }}
                        className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400 shadow-2xl"
                      >
                        <img
                          src={activeProduct.demoBeforeAfter.before}
                          alt="Raw Log"
                          className="absolute inset-0 w-full h-full object-cover max-w-none"
                          style={{ width: '100%', height: '100%' }}
                        />
                        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-slate-950/80 text-[10px] font-mono text-slate-300">
                          RAW S-LOG3
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-amber-500 text-slate-950 text-[10px] font-bold font-mono">
                        CINEMA LUT V3 GRADED
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPos}
                        onChange={(e) => setSliderPos(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-21/9 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                    <img
                      src={activeProduct.coverImage}
                      alt={activeProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-white">{activeProduct.title}</h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{activeProduct.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">KEY FEATURES</h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {activeProduct.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-amber-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">PACKAGE INCLUDES</h4>
                      <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                        {activeProduct.includes.map((inc) => (
                          <li key={inc}>• {inc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Download Size: {activeProduct.downloadSize}</span>
                      <button
                        onClick={() => {
                          addToCart(activeProduct);
                          setActiveProduct(null);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-xl"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart — ${activeProduct.price}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Shopping Cart & Instant Purchase Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-70 flex justify-end bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-amber-400" />
                    YOUR CART
                  </h3>
                  <button onClick={() => setIsCartOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!purchased ? (
                  <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                    {cart.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-8">Your shopping cart is empty.</p>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                            <span className="text-xs text-amber-400 font-mono">${item.price}</span>
                          </div>
                          <button
                            onClick={() => setCart(cart.filter((c) => c.id !== item.id))}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="mt-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">PURCHASE SUCCESSFUL!</h4>
                    <p className="text-xs text-slate-300">
                      Your digital downloads are ready! Instant license keys and download links have been sent.
                    </p>
                    <a
                      href="#download"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Simulated download initiated! Thank you for supporting MOTION studio.");
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                      <Download className="w-4 h-4" /> Download Files Now (.ZIP)
                    </a>
                  </div>
                )}
              </div>

              {!purchased && cart.length > 0 && (
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-sm font-mono">
                    <span className="text-slate-400">Total:</span>
                    <span className="text-xl font-bold text-amber-400">${totalCartPrice}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2"
                  >
                    COMPLETE INSTANT CHECKOUT <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
