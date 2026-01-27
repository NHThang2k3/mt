 
'use client';

import { motion } from 'framer-motion';
import { PROVINCE_PATHS, REGION_MAPPING, MapRegion } from '@/data/vietnam-map';

interface VietnamMapProps {
  unlockedProducts: string[];
  onRegionClick?: (regionId: MapRegion) => void;
  isRegionUnlocked: (regionId: MapRegion) => boolean;
  highlightedProvinceId?: string | null;
}

export default function VietnamMap({ 
  unlockedProducts, 
  onRegionClick,
  isRegionUnlocked,
  highlightedProvinceId
}: VietnamMapProps) {
  
  const getProvinceColor = (provinceId: string) => {
    if (provinceId === highlightedProvinceId) {
      return '#FDE047'; // Bright Yellow for highlighted
    }

    const region = REGION_MAPPING[provinceId];
    if (!region) return '#374151'; // Default gray for unmapped

    const unlocked = isRegionUnlocked(region);
    if (!unlocked) return '#374151';

    switch (region) {
      case 'bac': return '#22C55E';   // Green
      case 'trung': return '#A855F7'; // Purple
      case 'nam': return '#F97316';   // Orange
      default: return '#374151';
    }
  };

  const getProvinceFilter = (provinceId: string) => {
    if (provinceId === highlightedProvinceId) {
      return 'drop-shadow(0 0 8px #FDE047)';
    }

    const region = REGION_MAPPING[provinceId];
    if (!region) return 'none';
    
    if (isRegionUnlocked(region)) {
      const color = region === 'bac' ? '#22C55E' : region === 'trung' ? '#A855F7' : '#F97316';
      return `drop-shadow(0 0 2px ${color})`;
    }
    return 'none';
  };

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <svg
        viewBox="0 0 800 801"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {PROVINCE_PATHS.map((province) => {
          const region = REGION_MAPPING[province.id];
          const isUnlocked = region ? isRegionUnlocked(region) : false;
          const isHighlighted = province.id === highlightedProvinceId;
          
          return (
            <motion.path
              key={province.id}
              d={province.d}
              fill={getProvinceColor(province.id)}
              stroke="#fff"
              strokeWidth={isHighlighted ? "1" : "0.5"}
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: isUnlocked || isHighlighted ? 1 : 0.4,
                filter: getProvinceFilter(province.id),
                scale: isHighlighted ? 1.02 : 1,
              }}
              transition={{
                scale: isHighlighted ? {
                  repeat: Infinity,
                  duration: 1.5,
                  repeatType: "reverse"
                } : { duration: 0.2 }
              }}
              whileHover={{ 
                scale: 1.01, 
                opacity: 1,
                strokeWidth: 1,
                zIndex: 10
              }}
              onClick={() => region && onRegionClick?.(region)}
              className="cursor-pointer transition-all duration-200"
            >
              <title>{province.title}</title>
            </motion.path>
          );
        })}
      </svg>
    </div>
  );
}

