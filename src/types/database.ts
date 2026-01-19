export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type EventType = 'page_view' | 'product_view' | 'add_to_cart' | 'purchase' | 'share' | 'feedback_positive' | 'feedback_negative' | 'click';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          unlocked_products: string[]
          badges: string[]
          created_at: string
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          unlocked_products?: string[]
          badges?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          unlocked_products?: string[]
          badges?: string[]
          created_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          items: Json
          total: number
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
          shipping_info: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          items: Json
          total: number
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered'
          shipping_info: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          items?: Json
          total?: number
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered'
          shipping_info?: Json
          created_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          id: string
          user_id: string | null
          event_type: EventType
          event_data: Json
          page_url: string | null
          referrer: string | null
          user_agent: string | null
          session_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_type: EventType
          event_data?: Json
          page_url?: string | null
          referrer?: string | null
          user_agent?: string | null
          session_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          event_type?: EventType
          event_data?: Json
          page_url?: string | null
          referrer?: string | null
          user_agent?: string | null
          session_id?: string | null
          created_at?: string
        }
        Relationships: []
      }
      analytics_daily: {
        Row: {
          id: string
          date: string
          fan_reach: number
          page_views: number
          engagement: number
          storytellers: number
          total_clicks: number
          negative_feedback: number
          total_orders: number
          total_revenue: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          fan_reach?: number
          page_views?: number
          engagement?: number
          storytellers?: number
          total_clicks?: number
          negative_feedback?: number
          total_orders?: number
          total_revenue?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          fan_reach?: number
          page_views?: number
          engagement?: number
          storytellers?: number
          total_clicks?: number
          negative_feedback?: number
          total_orders?: number
          total_revenue?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          user_name: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          user_name: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          user_name?: string
          rating?: number
          comment?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row']
export type AnalyticsDaily = Database['public']['Tables']['analytics_daily']['Row']
export type ProductReview = Database['public']['Tables']['product_reviews']['Row']

// Admin email constant
export const ADMIN_EMAIL = 'nguyenhuuthang02032003@gmail.com';

