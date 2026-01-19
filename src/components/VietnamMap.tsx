
'use client';

import { motion } from 'framer-motion';
import { PROVINCE_PATHS, REGION_MAPPING, MapRegion } from '@/data/vietnam-map';

interface VietnamMapProps {
  unlockedProducts: string[];
  onRegionClick?: (regionId: MapRegion) => void;
  isRegionUnlocked: (regionId: MapRegion) => boolean;
}

export default function VietnamMap({ 
  unlockedProducts, 
  onRegionClick,
  isRegionUnlocked 
}: VietnamMapProps) {
  
  const getProvinceColor = (provinceId: string) => {
    const region = REGION_MAPPING[provinceId];
    if (!region) return '#374151'; // Default gray for unmapped

    const unlocked = isRegionUnlocked(region);
    if (!unlocked) return '#374151';

    switch (region) {
      case 'bac': return '#3B82F6';   // Blue
      case 'trung': return '#F97316'; // Orange
      case 'nam': return '#22C55E';   // Green
      default: return '#374151';
    }
  };

  const getProvinceFilter = (provinceId: string) => {
    const region = REGION_MAPPING[provinceId];
    if (!region) return 'none';
    
    if (isRegionUnlocked(region)) {
      const color = region === 'bac' ? '#3B82F6' : region === 'trung' ? '#F97316' : '#22C55E';
      return `drop-shadow(0 0 2px ${color})`;
    }
    return 'none';
  };

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <svg
        viewBox="0 0 382 801"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {PROVINCE_PATHS.map((province) => {
          const region = REGION_MAPPING[province.id];
          const isUnlocked = region ? isRegionUnlocked(region) : false;
          
          return (
            <motion.path
              key={province.id}
              d={province.d}
              fill={getProvinceColor(province.id)}
              stroke="#fff"
              strokeWidth="0.5"
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: isUnlocked ? 1 : 0.4,
                filter: getProvinceFilter(province.id)
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
