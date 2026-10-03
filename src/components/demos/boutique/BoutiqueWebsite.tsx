import React, { useState } from 'react';
import { ASSETS } from '../../../assets/media';
import { DemoHeaderBar } from '../../common/DemoHeaderBar';
import {
  ShoppingBag,
  Heart,
  Eye,
  X,
  Check,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  material: string;
  origin: string;
  description: string;
  sizes: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Monolithic Cocoon Overcoat',
    category: 'Outerwear',
    price: 1850,
    image: ASSETS.boutique,
    material: 'Double-Faced 800g Virgin Wool & Cashmere',
    origin: 'Hand-finished in Biella, Italy',
    description: 'Generous dropped-shoulder silhouette with hidden horn button placket, deep storm welt pockets, and hand-bound interior seams.',
    sizes: ['38 / S', '40 / M', '42 / L', '44 / XL'],
  },
  {
    id: 'p2',
    name: 'Architectural Boxy Blazer',
    category: 'Tailoring',
    price: 1250,
    image: ASSETS.boutique,
    material: 'Super 150s Tropical Worsted Wool',
    origin: 'Savile Row Atelier Partnership, London',
    description: 'Sharp canvassed chest piece, pronounced square roped shoulders, and floating horn button closure. Modern relaxed cut.',
    sizes: ['38 / S', '40 / M', '42 / L'],
  },
  {
    id: 'p3',
    name: 'Seamless Turtleneck Sweater',
    category: 'Knitwear',
    price: 680,
    image: ASSETS.boutique,
    material: '100% Mongolian 4-Ply Grade-A Cashmere',
    origin: 'Knitted in Hawick, Scotland',
    description: 'Whole-garment 3D knitting technology eliminates side seams for pure drape and frictionless warmth.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p4',
    name: 'Pleated Wide-Leg Trouser',
    category: 'Tailoring',
    price: 790,
    image: ASSETS.boutique,
    material: 'Heavy Wool Crepe & Silk Lining',
    origin: 'Made in Milan, Italy',
    description: 'Double inward pleats creating a fluid, dramatic break over boots or low-profile leather footwear.',
    sizes: ['46 / 30', '48 / 32', '50 / 34', '52 / 36'],
  },
  {
    id: 'p5',
    name: 'Raw Calfskin Weekend Holdall',
    category: 'Leather',
    price: 2100,
    image: ASSETS.boutique,
    material: 'Full-Grain French Boxcalf & Matte Palladium Hardware',
    origin: 'Artisanal Workshop, Florence',
    description: 'Unlined vegetable-tanned leather that patinas richly over decades of global travel. Solid brass feet.',
    sizes: ['One Size (45L)'],
  },
  {
    id: 'p6',
    name: 'Heavy Silk Column Dress',
    category: 'Outerwear',
    price: 1450,
    image: ASSETS.boutique,
    material: '40mm Silk Duchess Satin',
    origin: 'Haute Couture Workshop, Lyon',
    description: 'Sculptural architectural drape with subtle cowl back and raw-edge hem for understated gala presence.',
    sizes: ['FR 36', 'FR 38', 'FR 40'],
  },
];

interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export const BoutiqueWebsite: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSize, setActiveSize] = useState<string>('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], selectedSize: '40 / M', quantity: 1 },
  ]);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  const addToCart = (product: Product, size: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product, selectedSize: size, quantity: 1 }]);
    }
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070707] text-[#FAFAFA] font-sans selection:bg-white selection:text-black">
      <DemoHeaderBar currentIndustry="Édition Noire (Boutique Demo)" />

      {/* Top Banner */}
      <div className="pt-14 pb-2 bg-[#0F0F0F] text-center text-[10px] font-mono-code uppercase tracking-widest text-neutral-400 border-b border-white/8 px-4">
        Worldwide Express Courier & Complimentary Private Styling Consultations
      </div>

      {/* Navigation Header */}
      <header className="py-4 px-6 max-w-7xl mx-auto flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-8">
          <span className="font-display font-black text-2xl tracking-tighter text-white block">
            ÉDITION NOIRE
          </span>
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-400 font-mono-code">
            <a href="#collection" className="hover:text-white transition-colors">Autumn/Winter Capsule</a>
            <a href="#lookbook" className="hover:text-white transition-colors">Lookbook</a>
            <a href="#provenance" className="hover:text-white transition-colors">Mills & Provenance</a>
          </nav>
        </div>

        {/* Right Bar */}
        <div className="flex items-center gap-5">
          <div className="text-xs font-mono-code text-neutral-400 hidden sm:inline">
            CURRENCY: USD ($)
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-white text-black text-xs font-mono-code font-bold uppercase rounded-full hover:bg-neutral-200 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </button>
        </div>
      </header>

      {/* Editorial Campaign Hero */}
      <section className="relative px-6 max-w-7xl mx-auto pt-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[21/9] border border-white/10 bg-neutral-900">
          <img
            src={ASSETS.boutique}
            alt="Édition Noire Runway Campaign"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-end">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 bg-black/60 px-3 py-1 rounded inline-block backdrop-blur-sm border border-white/10">
                CAPSULE COLLECTION 04 · LIMITED RUN
              </span>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
                Architectural Monochromes.
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 font-light max-w-lg leading-relaxed">
                Sculpted from 800g double-faced virgin wool, raw silk crepe, and unlined calfskin. Made without trend compromises.
              </p>
              <div className="pt-2">
                <a
                  href="#collection"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-display font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors"
                >
                  <span>Explore Pieces</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section id="collection" className="py-16 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
              Curated Wardrobe
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white mt-1">
              The Collection
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Outerwear', 'Tailoring', 'Knitwear', 'Leather'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded-full transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0E0E0E] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Quick View Trigger */}
                <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setActiveSize(product.sizes[0]);
                    }}
                    className="absolute bottom-4 left-4 right-4 py-2.5 bg-black/85 backdrop-blur-md border border-white/15 text-white font-mono-code text-xs uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View & Details</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="text-[11px] font-mono-code uppercase text-neutral-400 mb-1">
                    {product.category} · {product.origin}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-neutral-300 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-2 text-sm font-mono-code text-white font-semibold">
                    ${product.price.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setActiveSize(product.sizes[0]);
                  }}
                  className="w-full py-2.5 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 text-xs font-mono-code uppercase tracking-wider rounded-lg transition-colors text-center"
                >
                  Configure & Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lookbook Spread */}
      <section id="lookbook" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
            Visual Anthology
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white mt-1">
            Autumn Silhouette Lookbook
          </h2>
          <p className="text-neutral-400 text-sm mt-3">
            Photographed on location in Kyoto and Berlin. Natural daylight, raw concrete, and heavy drape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-900 border border-white/10 shadow-2xl">
            <img
              src={ASSETS.boutiqueLookbook}
              alt="Édition Noire Editorial Lookbook"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-xs font-mono-code text-neutral-300">
              Look 01 · Charcoal Double-Faced Cashmere Overcoat on Raw Concrete
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono-code text-neutral-500 uppercase">Look 01 / Formal Drape</span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">The Cocoon Coat</h3>
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                  Worn over the seamless cashmere turtleneck. Designed with oversized proportions to accommodate thick knits without restricting shoulder mobility.
                </p>
              </div>
              <div className="pt-6 border-t border-white/8 text-xs font-mono-code text-neutral-400 mt-6">
                Fabric: 800g Virgin Wool · Biella, Italy
              </div>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono-code text-neutral-500 uppercase">Look 02 / Architectural Softness</span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">The Boxy Worsted Suit</h3>
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                  Paired with the wide-leg pleated trousers. Unstructured chest construction for effortless movement from midday meetings into evening cocktails.
                </p>
              </div>
              <div className="pt-6 border-t border-white/8 text-xs font-mono-code text-neutral-400 mt-6">
                Fabric: Super 150s Tropical Wool · London Atelier
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Provenance Narrative */}
      <section id="provenance" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="bg-[#101010] border border-white/10 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
            Material Transparency
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
            Woven in Small Mill Runs
          </h2>
          <p className="text-neutral-300 text-sm font-light leading-relaxed max-w-2xl mx-auto">
            We produce fewer than 150 pieces per silhouette to prevent textile surplus.
            Our cashmere originates from free-grazing herds in the Alashan region and our wool is processed without harsh bleach baths.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/8 text-center">
        <div className="max-w-md mx-auto">
          <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
            Private Access
          </span>
          <h3 className="font-display text-2xl font-bold uppercase text-white mt-1">
            Private Capsule Invitations
          </h3>
          <p className="text-xs text-neutral-400 mt-2 mb-6">
            Receive private lookbook links 48 hours before public capsule release.
          </p>

          {newsletterSubscribed ? (
            <div className="p-3 bg-white/10 border border-white/20 rounded-xl text-xs text-white">
              Thank you. You are added to the private preview manifest.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setNewsletterSubscribed(true);
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email address..."
                className="flex-1 bg-[#141414] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-black font-mono-code text-xs uppercase font-bold rounded-xl hover:bg-neutral-200"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/8 text-center text-xs font-mono-code text-neutral-500">
        <div>ÉDITION NOIRE · CLIENT DEMO BY VISTAAR STUDIO</div>
        <div className="mt-1">All silhouettes copyrighted · Express international delivery</div>
      </footer>

      {/* Quick View Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              <div className="aspect-[3/4] bg-neutral-900 rounded-2xl overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono-code uppercase text-neutral-400">
                    {selectedProduct.category} · {selectedProduct.origin}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white mt-1">
                    {selectedProduct.name}
                  </h3>
                  <div className="text-lg font-mono-code text-white font-semibold mt-1">
                    ${selectedProduct.price.toLocaleString()}
                  </div>
                </div>

                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="text-[11px] font-mono-code text-neutral-400 bg-white/5 p-3 rounded-lg border border-white/8">
                  <span className="text-white font-semibold block mb-0.5">Composition</span>
                  {selectedProduct.material}
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                    <span className="text-neutral-300 uppercase">Select Size</span>
                    <span className="text-neutral-500">True to tailored fit</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setActiveSize(sz)}
                        className={`py-2 text-xs font-mono-code rounded-lg border transition-colors ${
                          activeSize === sz
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(selectedProduct, activeSize)}
                  className="w-full py-3.5 bg-white text-black font-mono-code text-xs uppercase font-bold tracking-wider rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Shopping Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="bg-[#121212] border-l border-white/15 w-full max-w-md h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span className="font-mono-code font-bold uppercase text-xs text-white">
                    Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {checkoutComplete ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-white">Order Simulated</h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                    This is a live interactive client demo. In production, this connects to Stripe, Shopify Storefront API, or Medusa headless checkout.
                  </p>
                  <button
                    onClick={() => {
                      setCheckoutComplete(false);
                      setCartOpen(false);
                    }}
                    className="mt-4 px-6 py-2 bg-white text-black text-xs font-mono-code rounded-full"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-16 text-center text-xs text-neutral-400">
                  Your shopping bag is currently empty.
                </div>
              ) : (
                <div className="divide-y divide-white/8 max-h-[50vh] overflow-y-auto mt-4 pr-1">
                  {cart.map((item, idx) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="py-4 flex gap-4">
                      <div className="w-16 h-20 bg-neutral-900 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="font-display font-semibold text-white">
                            {item.product.name}
                          </div>
                          <div className="text-[11px] font-mono-code text-neutral-400">
                            Size: {item.selectedSize}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-0.5 border border-white/10 font-mono-code">
                            <button
                              onClick={() => updateQuantity(idx, -1)}
                              className="text-neutral-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="text-white text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(idx, 1)}
                              className="text-neutral-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-mono-code text-white font-semibold">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!checkoutComplete && cart.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-white font-bold text-base">
                    ${cartTotal.toLocaleString()} USD
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono-code">
                  Taxes and complimentary courier calculated at dispatch.
                </div>
                <button
                  onClick={() => setCheckoutComplete(true)}
                  className="w-full py-3.5 bg-white text-black font-mono-code text-xs uppercase font-bold tracking-wider rounded-xl hover:bg-neutral-200 transition-colors shadow-lg"
                >
                  Proceed to Checkout Demo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
