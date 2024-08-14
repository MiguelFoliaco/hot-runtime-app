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
      code: {
        Row: {
          aviable_production: boolean | null
          codeBuild: string
          codeJSX: string
          created_at: string
          date_programing: string | null
          id: number
          os_id: number | null
          user_owner: number
        }
        Insert: {
          aviable_production?: boolean | null
          codeBuild: string
          codeJSX: string
          created_at?: string
          date_programing?: string | null
          id?: number
          os_id?: number | null
          user_owner: number
        }
        Update: {
          aviable_production?: boolean | null
          codeBuild?: string
          codeJSX?: string
          created_at?: string
          date_programing?: string | null
          id?: number
          os_id?: number | null
          user_owner?: number
        }
        Relationships: [
          {
            foreignKeyName: "code_os_id_fkey"
            columns: ["os_id"]
            isOneToOne: false
            referencedRelation: "OS"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "code_user_owner_fkey"
            columns: ["user_owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      components: {
        Row: {
          code: string
          codeJSX: string
          componentParent: number | null
          componentParentLeft: number | null
          componentParentRight: number | null
          componentsChildren: number | null
          created_at: string
          id: number
          name: string
          owner: string
          projectHostory: string | null
          projectId: number
          public: boolean
        }
        Insert: {
          code: string
          codeJSX: string
          componentParent?: number | null
          componentParentLeft?: number | null
          componentParentRight?: number | null
          componentsChildren?: number | null
          created_at?: string
          id?: number
          name: string
          owner: string
          projectHostory?: string | null
          projectId: number
          public?: boolean
        }
        Update: {
          code?: string
          codeJSX?: string
          componentParent?: number | null
          componentParentLeft?: number | null
          componentParentRight?: number | null
          componentsChildren?: number | null
          created_at?: string
          id?: number
          name?: string
          owner?: string
          projectHostory?: string | null
          projectId?: number
          public?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "components_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      OS: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          targets_id: number | null
          user_owner: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          targets_id?: number | null
          user_owner: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          targets_id?: number | null
          user_owner?: number
        }
        Relationships: [
          {
            foreignKeyName: "projects_targets_id_fkey"
            columns: ["targets_id"]
            isOneToOne: true
            referencedRelation: "targets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_user_owner_fkey"
            columns: ["user_owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      targets: {
        Row: {
          color: string | null
          created_at: string
          id: number
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: number
          lastname: string | null
          name: string | null
          role_id: number
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          lastname?: string | null
          name?: string | null
          role_id: number
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          lastname?: string | null
          name?: string | null
          role_id?: number
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
