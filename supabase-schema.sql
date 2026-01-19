-- Supabase SQL Schema for Mứt 3 Miền

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  unlocked_products TEXT[] DEFAULT '{}',
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered')),
  shipping_info JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies for orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Analytics Events table for tracking
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'product_view', 'add_to_cart', 'purchase', 'share', 'feedback_positive', 'feedback_negative', 'click')),
  event_data JSONB DEFAULT '{}',
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Analytics Summary (aggregated data)
CREATE TABLE IF NOT EXISTS public.analytics_daily (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  fan_reach INTEGER DEFAULT 0,           -- Unique visitors
  page_views INTEGER DEFAULT 0,          -- Total page views
  engagement INTEGER DEFAULT 0,          -- Total interactions (clicks, add to cart, etc.)
  storytellers INTEGER DEFAULT 0,        -- Users who shared
  total_clicks INTEGER DEFAULT 0,        -- Total clicks
  negative_feedback INTEGER DEFAULT 0,   -- Negative feedback count
  total_orders INTEGER DEFAULT 0,        -- Orders placed
  total_revenue INTEGER DEFAULT 0,       -- Total revenue
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for analytics
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;

-- Allow insert for all users (anonymous tracking)
CREATE POLICY "Anyone can insert analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- Only admin can view analytics (we'll check in app code)
CREATE POLICY "Users can view own events" ON public.analytics_events
  FOR SELECT USING (auth.uid() = user_id);

-- Analytics daily - only insert/update via service role
CREATE POLICY "Anyone can view analytics daily" ON public.analytics_daily
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert analytics daily" ON public.analytics_daily
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update analytics daily" ON public.analytics_daily
  FOR UPDATE USING (true);

-- Function to update daily analytics
CREATE OR REPLACE FUNCTION public.update_daily_analytics()
RETURNS TRIGGER AS $$
DECLARE
  event_date DATE;
BEGIN
  event_date := DATE(NEW.created_at);
  
  INSERT INTO public.analytics_daily (date, fan_reach, page_views, engagement, storytellers, total_clicks, negative_feedback)
  VALUES (event_date, 0, 0, 0, 0, 0, 0)
  ON CONFLICT (date) DO NOTHING;
  
  -- Update based on event type
  IF NEW.event_type = 'page_view' THEN
    UPDATE public.analytics_daily SET page_views = page_views + 1, updated_at = NOW() WHERE date = event_date;
  ELSIF NEW.event_type IN ('click', 'add_to_cart', 'product_view') THEN
    UPDATE public.analytics_daily SET engagement = engagement + 1, total_clicks = total_clicks + 1, updated_at = NOW() WHERE date = event_date;
  ELSIF NEW.event_type = 'share' THEN
    UPDATE public.analytics_daily SET storytellers = storytellers + 1, engagement = engagement + 1, updated_at = NOW() WHERE date = event_date;
  ELSIF NEW.event_type = 'feedback_negative' THEN
    UPDATE public.analytics_daily SET negative_feedback = negative_feedback + 1, updated_at = NOW() WHERE date = event_date;
  ELSIF NEW.event_type = 'purchase' THEN
    UPDATE public.analytics_daily SET 
      total_orders = total_orders + 1,
      total_revenue = total_revenue + COALESCE((NEW.event_data->>'amount')::INTEGER, 0),
      engagement = engagement + 1,
      updated_at = NOW() 
    WHERE date = event_date;
  END IF;
  
  -- Update unique visitors (fan_reach) - simplified version
  IF NEW.user_id IS NOT NULL OR NEW.session_id IS NOT NULL THEN
    UPDATE public.analytics_daily SET fan_reach = fan_reach + 1, updated_at = NOW() WHERE date = event_date;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-updating daily analytics
DROP TRIGGER IF EXISTS on_analytics_event ON public.analytics_events;
CREATE TRIGGER on_analytics_event
  AFTER INSERT ON public.analytics_events
  FOR EACH ROW EXECUTE FUNCTION public.update_daily_analytics();
