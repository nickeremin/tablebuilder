export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notification_prefernces: {
        Row: {
          id: string
          new_updates: boolean
          subscription_expiration: boolean
          table_failures: boolean
          team_join_requests: boolean
          team_table_changes: boolean
          type: Database["public"]["Enums"]["notification_preferences_type"]
          user_id: string
          warnings: boolean
        }
        Insert: {
          id: string
          new_updates?: boolean
          subscription_expiration?: boolean
          table_failures?: boolean
          team_join_requests?: boolean
          team_table_changes?: boolean
          type: Database["public"]["Enums"]["notification_preferences_type"]
          user_id: string
          warnings?: boolean
        }
        Update: {
          id?: string
          new_updates?: boolean
          subscription_expiration?: boolean
          table_failures?: boolean
          team_join_requests?: boolean
          team_table_changes?: boolean
          type?: Database["public"]["Enums"]["notification_preferences_type"]
          user_id?: string
          warnings?: boolean
        }
        Relationships: []
      }
      table_records: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          table_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          id: string
          table_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          table_id?: string
        }
        Relationships: []
      }
      tables: {
        Row: {
          columns: Json
          created_at: string | null
          description: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          columns: Json
          created_at?: string | null
          description?: string | null
          id: string
          name: string
          user_id: string
        }
        Update: {
          columns?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          email: string
          id: string
          image_url: string | null
          username: string
        }
        Insert: {
          email: string
          id: string
          image_url?: string | null
          username: string
        }
        Update: {
          email?: string
          id?: string
          image_url?: string | null
          username?: string
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
      notification_preferences_type: "web" | "email"
      type: "act" | "invoice" | "joint"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
