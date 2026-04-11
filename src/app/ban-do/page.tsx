'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Lock, Unlock, Award, LogIn } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAuthStore } from '@/store/authStore';
import { badgeInfo } from '@/store/userStore';
import { MapRegion } from '@/data/vietnam-map';

// Dynamic import VietnamMap với ssr: false để tránh lỗi hydration
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/data/translations';

// Dynamic import VietnamMap với ssr: false để tránh lỗi hydration
const VietnamMap = dynamic(() => import('@/components/VietnamMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-xl">
      <div className="animate-spin w-8 h-8 border-4 border-[var(--color-gold)] border-t-transparent rounded-full" />
    </div>
  )
});


type Region = 'bac' | 'trung' | 'nam';

export default function MapPage() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const { user, profile, initialize, isInitialized } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);


  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      if (!isInitialized) {

        initialize();
      }
    } catch (err) {
      console.error('MapPage init error:', err);
      setHasError(true);
    }
  }, [isInitialized, initialize]);

  // Safe access to profile data
  const unlockedProducts = Array.isArray(profile?.unlocked_products) ? profile.unlocked_products : [];
  const badges = Array.isArray(profile?.badges) ? profile.badges : [];

  const getUnlockedRegions = (): Region[] => {
    try {
      const regions: Region[] = [];
      const bacProducts = ['bac-man', 'bac-mo'];
      const trungProducts = ['trung-sen', 'trung-dau'];
      const namProducts = ['nam-dua', 'nam-mangcau'];
      
      if (bacProducts.every(id => unlockedProducts.includes(id))) regions.push('bac');
      if (trungProducts.every(id => unlockedProducts.includes(id))) regions.push('trung');
      if (namProducts.every(id => unlockedProducts.includes(id))) regions.push('nam');
      
      return regions;
    } catch (err) {
      console.error('getUnlockedRegions error:', err);
      return [];
    }
  };
 
  const unlockedRegions = mounted ? getUnlockedRegions() : [];

  const regions = [
    {
      id: 'bac',
      name: t.north,
      products: ['bac-man', 'bac-mo'],
      productNames: language === 'vi' ? ['Mứt Mận Mộc Châu', 'Mứt Mơ Ba Vì'] : ['Moc Chau Plum Jam', 'Ba Vi Apricot Jam'],
      color: '#22C55E', // Green
      position: { top: '15%', left: '25%' }
    },
    {
      id: 'trung',
      name: t.central,
      products: ['trung-sen', 'trung-dau'],
      productNames: language === 'vi' ? ['Mứt Hạt Sen Huế', 'Mứt Dâu Tây Đà Lạt'] : ['Hue Lotus Seed Jam', 'Da Lat Strawberry Jam'],
      color: '#A855F7', // Purple
      position: { top: '45%', left: '30%' }
    },
    {
      id: 'nam',
      name: t.south,
      products: ['nam-dua', 'nam-mangcau'],
      productNames: language === 'vi' ? ['Mứt Dừa Bến Tre', 'Mứt Mãng Cầu Tiền Giang'] : ['Ben Tre Coconut Jam', 'Tien Giang Soursop Jam'],
      color: '#F97316', // Orange
      position: { top: '75%', left: '22%' }
    }
  ];


  const isRegionUnlocked = (regionId: string) => 
    unlockedRegions.includes(regionId as Region);

  const isProductUnlocked = (productId: string) => 
    unlockedProducts.includes(productId);

  const getUnlockedCount = (products: string[]) => 
    products.filter(p => unlockedProducts.includes(p)).length;

  // Show error state
  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">😢</div>
        <h1 className="text-xl font-bold text-[var(--color-brown)] mb-2">{language === 'vi' ? 'Đã xảy ra lỗi' : 'An error occurred'}</h1>
        <p className="text-[var(--color-brown)]/70 mb-4 text-center">{language === 'vi' ? 'Vui lòng tải lại trang' : 'Please reload the page'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          {language === 'vi' ? 'Tải lại trang' : 'Reload page'}
        </button>

      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg">
      {/* Header */}
      <section className="py-8 md:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brown)] mb-4">
            {t.heritageMapTitle}
          </h1>
          <p className="text-[var(--color-brown)]/70 max-w-2xl mx-auto px-4">
            {t.heritageMapHero}
          </p>
        </motion.div>

      </section>

      <div className="section pt-0">

        {/* Login prompt if not logged in */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-8 bg-[var(--color-gold)]/10 border-2 border-[var(--color-gold)]/30 text-center"
          >
            <LogIn size={32} className="mx-auto mb-3 text-[var(--color-gold)]" />
            <p className="text-[var(--color-brown)] mb-4">
              {t.loginToSave}
            </p>
            <Link href="/dang-nhap" className="btn-primary inline-flex items-center gap-2">
              {t.loginNow}
            </Link>
          </motion.div>

        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 relative overflow-hidden"
            >
              {/* Vietnam Map Component */}
              <div className="relative mx-auto" style={{ maxWidth: '600px' }}>
                <VietnamMap 
                  unlockedProducts={unlockedProducts}
                  isRegionUnlocked={isRegionUnlocked}
                  onRegionClick={(regionId: MapRegion) => {
                    const el = document.getElementById(`region-stats-${regionId}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                />

                {/* Region Labels overlay */}
                {regions.map((region) => (
                  <div
                    key={region.id}
                    className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: region.position.top, left: region.position.left }}
                  >
                    <motion.div
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium shadow-md ${
                        isRegionUnlocked(region.id) ? '' : 'opacity-70 bg-gray-500'
                      }`}
                      style={{ backgroundColor: isRegionUnlocked(region.id) ? region.color : undefined }}
                    >
                      {isRegionUnlocked(region.id) ? (
                        <Unlock size={14} className="inline mr-1" />
                      ) : (
                        <Lock size={14} className="inline mr-1" />
                      )}
                      {region.name}
                    </motion.div>
                  </div>
                ))}

                {/* Islands Labels */}
                <div className="absolute top-[45%] left-[58%] pointer-events-none">
                   <div className="text-[10px] md:text-xs font-bold text-[var(--color-brown)]/60 flex items-center gap-1">
                      <span>{t.tmHoangSa}</span>
                   </div>
                </div>
                <div className="absolute top-[82%] left-[82%] pointer-events-none">
                   <div className="text-[10px] md:text-xs font-bold text-[var(--color-brown)]/60 flex items-center gap-1">
                      <span>{t.tmTruongSa}</span>
                   </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-700 shadow-inner" />
                  <span className="text-[var(--color-brown)]/70">{t.lockedStatus}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#22C55E] shadow-inner" />
                  <span className="text-[var(--color-brown)]/70">{t.north}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#A855F7] shadow-inner" />
                  <span className="text-[var(--color-brown)]/70">{t.central}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#F97316] shadow-inner" />
                  <span className="text-[var(--color-brown)]/70">{t.south}</span>
                </div>
               
              </div>

            </motion.div>

          </div>

          {/* Progress Panel */}
          <div className="space-y-6">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <h3 className="text-lg font-bold text-[var(--color-brown)] mb-4 flex items-center gap-2">
                <Award size={20} className="text-[var(--color-gold)]" />
                {t.badges.toUpperCase()}
              </h3>
              <div className="space-y-3">
                {(Object.keys(badgeInfo) as Array<keyof typeof badgeInfo>).map((key) => {
                  const badge = badgeInfo[key];
                  const isUnlocked = badges.includes(key);
                  return (
                    <div
                      key={key}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isUnlocked
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                          : 'border-gray-200 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{badge.icon}</span>
                        <div>
                          <p className="font-semibold text-[var(--color-brown)]">
                            {language === 'vi' ? badge.name : badge.nameEn}
                          </p>
                          <p className="text-xs text-[var(--color-brown)]/60">
                            {language === 'vi' ? badge.description : badge.descriptionEn}
                          </p>
                        </div>
                      </div>
                    </div>

                  );
                })}
              </div>
            </motion.div>

            {/* Region Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-lg font-bold text-[var(--color-brown)] mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-[var(--color-gold)]" />
                {t.progress}
              </h3>

              <div className="space-y-4">
                {regions.map((region) => {
                  const unlocked = getUnlockedCount(region.products);
                  const total = region.products.length;
                  const percentage = (unlocked / total) * 100;
                  
                  return (
                    <div key={region.id} id={`region-stats-${region.id}`} className="scroll-mt-24 transition-all duration-300">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-[var(--color-brown)]">{region.name}</span>
                        <span className="text-[var(--color-brown)]/60">{unlocked}/{total}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: region.color }}
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        {region.products.map((productId, idx) => (
                          <div
                            key={productId}
                            className={`text-xs flex items-center gap-2 ${
                              isProductUnlocked(productId)
                                ? 'text-[var(--color-brown)]'
                                : 'text-[var(--color-brown)]/40'
                            }`}
                          >
                            {isProductUnlocked(productId) ? (
                              <Unlock size={12} className="text-green-500" />
                            ) : (
                              <Lock size={12} />
                            )}
                            {region.productNames[idx]}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* QR Hint */}
            <div className="card p-6 bg-[var(--color-gold)]/10 border-2 border-[var(--color-gold)]/30">
              <p className="text-sm text-[var(--color-brown)] text-center">
                {t.qrHint}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
