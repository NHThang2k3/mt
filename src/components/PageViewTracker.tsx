'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';
import { useAuthStore } from '@/store/authStore';

export default function PageViewTracker() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  useEffect(() => {
    // Track page view on route change
    trackPageView(user?.id, pathname);
  }, [pathname, user?.id]);

  return null;
}
