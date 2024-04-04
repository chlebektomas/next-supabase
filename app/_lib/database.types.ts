export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: {
          id: string
          pokemon_id: string
          user_id: string
        }
        Insert: {
          id?: string
          pokemon_id: string
          user_id: string
        }
        Update: {
          id?: string
          pokemon_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      moves: {
        Row: {
          accuracy: number | null
          attack: number | null
          description: string
          effect_percentage: number | null
          id: string
          name: string
          power_points: number | null
          type: string
        }
        Insert: {
          accuracy?: number | null
          attack?: number | null
          description: string
          effect_percentage?: number | null
          id: string
          name: string
          power_points?: number | null
          type: string
        }
        Update: {
          accuracy?: number | null
          attack?: number | null
          description?: string
          effect_percentage?: number | null
          id?: string
          name?: string
          power_points?: number | null
          type?: string
        }
        Relationships: []
      }
      moves_learned_by_item: {
        Row: {
          item_name: string
          move_id: string
          pokemon_id: string
        }
        Insert: {
          item_name: string
          move_id: string
          pokemon_id: string
        }
        Update: {
          item_name?: string
          move_id?: string
          pokemon_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "moves_learned_by_item_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "moves"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moves_learned_by_item_pokemon_id_fkey"
            columns: ["pokemon_id"]
            isOneToOne: false
            referencedRelation: "pokemon"
            referencedColumns: ["id"]
          },
        ]
      }
      moves_learned_by_level: {
        Row: {
          level: number | null
          move_id: string
          pokemon_id: string
        }
        Insert: {
          level?: number | null
          move_id: string
          pokemon_id: string
        }
        Update: {
          level?: number | null
          move_id?: string
          pokemon_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "moves_learned_by_level_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "moves"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moves_learned_by_level_pokemon_id_fkey"
            columns: ["pokemon_id"]
            isOneToOne: false
            referencedRelation: "pokemon"
            referencedColumns: ["id"]
          },
        ]
      }
      pokemon: {
        Row: {
          base_stat_attack: number
          base_stat_defense: number
          base_stat_hp: number
          base_stat_special: number
          base_stat_speed: number
          capture_rate: number | null
          classification: string
          height: number
          id: string
          image_url: string
          level_100_max_attack: number
          level_100_max_defense: number
          level_100_max_hp: number
          level_100_max_special: number
          level_100_max_speed: number
          level_100_min_attack: number
          level_100_min_defense: number
          level_100_min_hp: number
          level_100_min_special: number
          level_100_min_speed: number
          level_50_max_attack: number
          level_50_max_defense: number
          level_50_max_hp: number
          level_50_max_special: number
          level_50_max_speed: number
          level_50_min_attack: number
          level_50_min_defense: number
          level_50_min_hp: number
          level_50_min_special: number
          level_50_min_speed: number
          name: string
          type: string[]
          weight: number
        }
        Insert: {
          base_stat_attack: number
          base_stat_defense: number
          base_stat_hp: number
          base_stat_special: number
          base_stat_speed: number
          capture_rate?: number | null
          classification: string
          height: number
          id: string
          image_url: string
          level_100_max_attack: number
          level_100_max_defense: number
          level_100_max_hp: number
          level_100_max_special: number
          level_100_max_speed: number
          level_100_min_attack: number
          level_100_min_defense: number
          level_100_min_hp: number
          level_100_min_special: number
          level_100_min_speed: number
          level_50_max_attack: number
          level_50_max_defense: number
          level_50_max_hp: number
          level_50_max_special: number
          level_50_max_speed: number
          level_50_min_attack: number
          level_50_min_defense: number
          level_50_min_hp: number
          level_50_min_special: number
          level_50_min_speed: number
          name: string
          type: string[]
          weight: number
        }
        Update: {
          base_stat_attack?: number
          base_stat_defense?: number
          base_stat_hp?: number
          base_stat_special?: number
          base_stat_speed?: number
          capture_rate?: number | null
          classification?: string
          height?: number
          id?: string
          image_url?: string
          level_100_max_attack?: number
          level_100_max_defense?: number
          level_100_max_hp?: number
          level_100_max_special?: number
          level_100_max_speed?: number
          level_100_min_attack?: number
          level_100_min_defense?: number
          level_100_min_hp?: number
          level_100_min_special?: number
          level_100_min_speed?: number
          level_50_max_attack?: number
          level_50_max_defense?: number
          level_50_max_hp?: number
          level_50_max_special?: number
          level_50_max_speed?: number
          level_50_min_attack?: number
          level_50_min_defense?: number
          level_50_min_hp?: number
          level_50_min_special?: number
          level_50_min_speed?: number
          name?: string
          type?: string[]
          weight?: number
        }
        Relationships: []
      }
      types: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
