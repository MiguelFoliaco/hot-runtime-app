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
      actions: {
        Row: {
          code: string
          created_at: string
          description: string
          id: number
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          id?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          id?: number
        }
        Relationships: []
      }
      builds: {
        Row: {
          build_url: string
          created_at: string
          git_commit_hash: string
          git_commit_message: string
          id: number
          logs_s3_key_prefix: string
          payload_str: string
          size: number | null
        }
        Insert: {
          build_url?: string
          created_at?: string
          git_commit_hash: string
          git_commit_message: string
          id?: number
          logs_s3_key_prefix: string
          payload_str?: string
          size?: number | null
        }
        Update: {
          build_url?: string
          created_at?: string
          git_commit_hash?: string
          git_commit_message?: string
          id?: number
          logs_s3_key_prefix?: string
          payload_str?: string
          size?: number | null
        }
        Relationships: []
      }
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
          description: string | null
          id: number
          main_component: boolean | null
          name: string
          owner: string
          projectHostory: string | null
          projectid: number | null
          public: boolean
          type: Database["public"]["Enums"]["type_component"]
        }
        Insert: {
          code: string
          codeJSX: string
          componentParent?: number | null
          componentParentLeft?: number | null
          componentParentRight?: number | null
          componentsChildren?: number | null
          created_at?: string
          description?: string | null
          id?: number
          main_component?: boolean | null
          name: string
          owner: string
          projectHostory?: string | null
          projectid?: number | null
          public?: boolean
          type?: Database["public"]["Enums"]["type_component"]
        }
        Update: {
          code?: string
          codeJSX?: string
          componentParent?: number | null
          componentParentLeft?: number | null
          componentParentRight?: number | null
          componentsChildren?: number | null
          created_at?: string
          description?: string | null
          id?: number
          main_component?: boolean | null
          name?: string
          owner?: string
          projectHostory?: string | null
          projectid?: number | null
          public?: boolean
          type?: Database["public"]["Enums"]["type_component"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_project_id"
            columns: ["projectid"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      content: {
        Row: {
          componentId: number
          created_at: string
          data: Json
          date_plublish: string
          description: string
          id: number
          title: string
        }
        Insert: {
          componentId: number
          created_at?: string
          data?: Json
          date_plublish?: string
          description?: string
          id?: number
          title: string
        }
        Update: {
          componentId?: number
          created_at?: string
          data?: Json
          date_plublish?: string
          description?: string
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_componentId_fkey"
            columns: ["componentId"]
            isOneToOne: true
            referencedRelation: "components"
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
      process: {
        Row: {
          created_at: string
          id: number
          last_update: string
          process_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: number
          last_update?: string
          process_id?: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: number
          last_update?: string
          process_id?: string
          status?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          publicateBy: string | null
          targets_id: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          publicateBy?: string | null
          targets_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          publicateBy?: string | null
          targets_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_targets_id_fkey"
            columns: ["targets_id"]
            isOneToOne: true
            referencedRelation: "targets"
            referencedColumns: ["id"]
          },
        ]
      }
      rols: {
        Row: {
          actions: number[]
          created_at: string
          description: string | null
          id: number
          status: boolean
          title: string
        }
        Insert: {
          actions: number[]
          created_at?: string
          description?: string | null
          id?: number
          status?: boolean
          title?: string
        }
        Update: {
          actions?: number[]
          created_at?: string
          description?: string | null
          id?: number
          status?: boolean
          title?: string
        }
        Relationships: []
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
      tokens_dev: {
        Row: {
          assing_by: string
          create_by: string
          created_at: string
          id: number
          show: boolean
          title: string
        }
        Insert: {
          assing_by: string
          create_by: string
          created_at?: string
          id?: number
          show?: boolean
          title?: string
        }
        Update: {
          assing_by?: string
          create_by?: string
          created_at?: string
          id?: number
          show?: boolean
          title?: string
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
      "version-code": {
        Row: {
          available_production: boolean
          available_test: boolean
          code_build: string
          code_jsx: string
          created_at: string
          id: number
          name: string
          os_id: number
          programing_date: string | null
          projectid: number
          publicate_by_email: string | null
          publicateBy: string
        }
        Insert: {
          available_production?: boolean
          available_test?: boolean
          code_build?: string
          code_jsx?: string
          created_at?: string
          id?: number
          name: string
          os_id: number
          programing_date?: string | null
          projectid: number
          publicate_by_email?: string | null
          publicateBy?: string
        }
        Update: {
          available_production?: boolean
          available_test?: boolean
          code_build?: string
          code_jsx?: string
          created_at?: string
          id?: number
          name?: string
          os_id?: number
          programing_date?: string | null
          projectid?: number
          publicate_by_email?: string | null
          publicateBy?: string
        }
        Relationships: [
          {
            foreignKeyName: "version-code_os_id_fkey"
            columns: ["os_id"]
            isOneToOne: false
            referencedRelation: "OS"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version-code_projectid_fkey"
            columns: ["projectid"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      type_component: "component" | "function" | "hooks"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
