'use client';

import { supabase } from '@/lib/supabase';
import type { EventType, Json } from '@/types/database';

// Generate or get session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

interface TrackEventOptions {
  eventType: EventType;
  eventData?: Json;
  userId?: string | null;
}

export const trackEvent = async ({
  eventType,
  eventData = {},
  userId = null
}: TrackEventOptions): Promise<void> => {
  try {
    const sessionId = getSessionId();
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const referrer = typeof document !== 'undefined' ? document.referrer : '';
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';

    await supabase.from('analytics_events').insert({
      user_id: userId,
      event_type: eventType,
      event_data: eventData,
      page_url: pageUrl,
      referrer: referrer,
      user_agent: userAgent,
      session_id: sessionId
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Convenience functions
export const trackPageView = (userId?: string | null, pageName?: string) => {
  trackEvent({
    eventType: 'page_view',
    eventData: { page_name: pageName },
    userId
  });
};

export const trackProductView = (productId: string, productName: string, userId?: string | null) => {
  trackEvent({
    eventType: 'product_view',
    eventData: { product_id: productId, product_name: productName },
    userId
  });
};

export const trackAddToCart = (productId: string, productName: string, price: number, userId?: string | null) => {
  trackEvent({
    eventType: 'add_to_cart',
    eventData: { product_id: productId, product_name: productName, price },
    userId
  });
};

export const trackPurchase = (orderId: string, amount: number, itemCount: number, userId?: string | null) => {
  trackEvent({
    eventType: 'purchase',
    eventData: { order_id: orderId, amount, item_count: itemCount },
    userId
  });
};

export const trackShare = (contentType: string, contentId: string, platform?: string, userId?: string | null) => {
  trackEvent({
    eventType: 'share',
    eventData: { content_type: contentType, content_id: contentId, platform },
    userId
  });
};

export const trackClick = (elementId: string, elementType: string, userId?: string | null) => {
  trackEvent({
    eventType: 'click',
    eventData: { element_id: elementId, element_type: elementType },
    userId
  });
};

export const trackFeedback = (isPositive: boolean, feedbackType: string, details?: string, userId?: string | null) => {
  trackEvent({
    eventType: isPositive ? 'feedback_positive' : 'feedback_negative',
    eventData: { feedback_type: feedbackType, details },
    userId
  });
};
