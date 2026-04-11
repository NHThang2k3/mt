'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Sparkles, ChevronDown, Search, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, formatPrice } from '@/data/products';
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/data/translations';

type RegionFilter = 'all' | 'bac' | 'trung' | 'nam' | 'combo';

// Get min and max prices from products
const minProductPrice = Math.min(...products.map(p => p.price));
const maxProductPrice = Math.max(...products.map(p => p.price));

export default function ShopPage() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [filter, setFilter] = useState<RegionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([minProductPrice, maxProductPrice]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Region filter
      if (filter !== 'all' && p.region !== filter) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(query) && 
            !p.nameEn.toLowerCase().includes(query) &&
            !p.description.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      // Price filter
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      
      return true;
    });
  }, [filter, searchQuery, priceRange]);

  const regions: { value: RegionFilter; label: string; color: string; emoji: string }[] = [
    { value: 'all', label: t.allRegions, color: 'bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)]', emoji: '🍯' },
    { value: 'bac', label: t.north, color: 'bg-gradient-to-r from-green-500 to-emerald-600', emoji: '🍑' },
    { value: 'trung', label: t.central, color: 'bg-gradient-to-r from-purple-500 to-pink-600', emoji: '🌸' },
    { value: 'nam', label: t.south, color: 'bg-gradient-to-r from-orange-500 to-amber-600', emoji: '🥥' },
    { value: 'combo', label: 'Combo', color: 'bg-gradient-to-r from-amber-500 to-red-500', emoji: '🎁' },
  ];

  const pricePresets = [
    { label: t.priceAll, min: minProductPrice, max: maxProductPrice },
    { label: t.priceUnder100, min: minProductPrice, max: 100000 },
    { label: '100k - 150k', min: 100000, max: 150000 },
    { label: t.priceOver150, min: 150000, max: maxProductPrice },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const clearAllFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setPriceRange([minProductPrice, maxProductPrice]);
  };

  const hasActiveFilters = filter !== 'all' || searchQuery !== '' || 
    priceRange[0] !== minProductPrice || priceRange[1] !== maxProductPrice;

  return (
    <div className="min-h-screen pattern-bg">
      {/* Hero Header */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--color-gold)]/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[var(--color-red)]/10 blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-medium mb-6"
          >
            <Sparkles size={16} />
            {language === 'vi' ? 'Bộ sưu tập mứt truyền thống' : 'Traditional Jam Collection'}
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-brown)] mb-4">
            {t.shopTitle}
          </h1>
          <p className="text-[var(--color-brown)]/70 max-w-2xl mx-auto px-4 text-lg">
            {t.shopDesc}
          </p>
        </motion.div>
      </section>

      {/* Search & Filter Section */}
      <section className="section pt-0">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brown)]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-[var(--border)] bg-white focus:border-[var(--color-gold)] focus:outline-none transition-all text-[var(--color-brown)] placeholder:text-[var(--color-brown)]/40 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--color-cream)] transition-colors"
              >
                <X size={18} className="text-[var(--color-brown)]/40" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="flex justify-center mb-6 md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)] text-[var(--color-brown)] shadow-sm"
          >
            <SlidersHorizontal size={18} />
            {language === 'vi' ? 'Bộ lọc' : 'Filters'}
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
            )}
          </button>
        </div>

        {/* Filters Container */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: showFilters || typeof window !== 'undefined' && window.innerWidth >= 768 ? 1 : 0, height: showFilters || typeof window !== 'undefined' && window.innerWidth >= 768 ? 'auto' : 0 }}
          className={`overflow-hidden md:!opacity-100 md:!h-auto`}
        >
          {/* Region Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            {regions.map((region, index) => (
              <motion.button
                key={region.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(region.value)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filter === region.value
                    ? `${region.color} text-white shadow-lg`
                    : 'bg-white text-[var(--color-brown)] hover:shadow-md border border-[var(--border)]'
                }`}
              >
                <span>{region.emoji}</span>
                {region.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Price Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <span className="text-sm text-[var(--color-brown)]/60 mr-2">{t.price}:</span>
            {pricePresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => setPriceRange([preset.min, preset.max])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  priceRange[0] === preset.min && priceRange[1] === preset.max
                    ? 'bg-[var(--color-gold)] text-white shadow-md'
                    : 'bg-white text-[var(--color-brown)] hover:shadow-md border border-[var(--border)]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </motion.div>

          {/* Custom Price Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-md mx-auto mb-8 px-4"
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-28 px-3 py-2 rounded-xl border border-[var(--border)] text-center text-sm focus:border-[var(--color-gold)] focus:outline-none"
                  min={minProductPrice}
                  max={priceRange[1]}
                />
              </div>
              <span className="text-[var(--color-brown)]/40">—</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-brown)]/60">{language === 'vi' ? 'Đến' : 'To'}</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-28 px-3 py-2 rounded-xl border border-[var(--border)] text-center text-sm focus:border-[var(--color-gold)] focus:outline-none"
                  min={priceRange[0]}
                  max={maxProductPrice}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Active Filters & Results Count */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <span className="text-[var(--color-brown)]/60">
            {t.resultsCount.replace('{count}', filteredProducts.length.toString())}
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              <X size={14} />
              {t.clearFilters}
            </button>
          )}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${searchQuery}-${priceRange.join('-')}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-[var(--color-brown)]/70 mb-4">{t.noResults}</p>
            <button
              onClick={clearAllFilters}
              className="text-[var(--color-gold)] hover:underline font-medium"
            >
              {language === 'vi' ? 'Xóa bộ lọc để xem tất cả sản phẩm' : 'Clear filters to view all products'}
            </button>
          </motion.div>
        )}

        {/* Scroll indicator */}
        {filteredProducts.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-flex flex-col items-center text-[var(--color-brown)]/40"
            >
              <span className="text-sm mb-1">{language === 'vi' ? 'Kéo để xem thêm' : 'Scroll to view more'}</span>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        )}
      </section>
    </div>

  );
}

