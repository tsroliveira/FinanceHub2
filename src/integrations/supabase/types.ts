export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)";
  };
  public: {
    Tables: {
      analises: {
        Row: {
          anual: number;
          ativo: string;
          created_at: string;
          data: string;
          empresa: string;
          fonte: string;
          id: string;
          prioridade: string;
          rentabilidade: number;
          risco: string;
          setor: string;
          tipo: string;
          updated_at: string;
          user_id: string;
          valor: number;
        };
        Insert: {
          anual?: number;
          ativo: string;
          created_at?: string;
          data: string;
          empresa: string;
          fonte: string;
          id?: string;
          prioridade: string;
          rentabilidade?: number;
          risco: string;
          setor: string;
          tipo: string;
          updated_at?: string;
          user_id: string;
          valor?: number;
        };
        Update: {
          anual?: number;
          ativo?: string;
          created_at?: string;
          data?: string;
          empresa?: string;
          fonte?: string;
          id?: string;
          prioridade?: string;
          rentabilidade?: number;
          risco?: string;
          setor?: string;
          tipo?: string;
          updated_at?: string;
          user_id?: string;
          valor?: number;
        };
        Relationships: [];
      };
      ativos: {
        Row: {
          ativo: string;
          cod: string;
          conta: string;
          corretagem: number;
          country: string;
          created_at: string;
          data: string;
          descricao: string;
          division: string | null;
          id: string;
          moeda: string;
          num_ordem: string | null;
          operacao: string;
          pvp: number;
          quantidade: number;
          setor: string;
          status: string;
          taxa: number;
          tipo: string;
          updated_at: string;
          user_id: string;
          val_atual: number;
          val_tt_rs: number;
          val_tt_us: number;
          val_uni_rs: number;
          val_uni_us: number;
          valorizacao: number;
        };
        Insert: {
          ativo: string;
          cod: string;
          conta: string;
          corretagem?: number;
          country: string;
          created_at?: string;
          data: string;
          descricao: string;
          division?: string | null;
          id?: string;
          moeda: string;
          num_ordem?: string | null;
          operacao: string;
          pvp?: number;
          quantidade?: number;
          setor: string;
          status: string;
          taxa?: number;
          tipo: string;
          updated_at?: string;
          user_id: string;
          val_atual?: number;
          val_tt_rs?: number;
          val_tt_us?: number;
          val_uni_rs?: number;
          val_uni_us?: number;
          valorizacao?: number;
        };
        Update: {
          ativo?: string;
          cod?: string;
          conta?: string;
          corretagem?: number;
          country?: string;
          created_at?: string;
          data?: string;
          descricao?: string;
          division?: string | null;
          id?: string;
          moeda?: string;
          num_ordem?: string | null;
          operacao?: string;
          pvp?: number;
          quantidade?: number;
          setor?: string;
          status?: string;
          taxa?: number;
          tipo?: string;
          updated_at?: string;
          user_id?: string;
          val_atual?: number;
          val_tt_rs?: number;
          val_tt_us?: number;
          val_uni_rs?: number;
          val_uni_us?: number;
          valorizacao?: number;
        };
        Relationships: [];
      };
      contas: {
        Row: {
          categoria: string;
          cod: string;
          created_at: string;
          data: string;
          descricao: string;
          id: string;
          origem: string;
          status: string;
          tipo: string;
          updated_at: string;
          user_id: string;
          valor: number;
        };
        Insert: {
          categoria: string;
          cod: string;
          created_at?: string;
          data: string;
          descricao: string;
          id?: string;
          origem: string;
          status: string;
          tipo: string;
          updated_at?: string;
          user_id: string;
          valor?: number;
        };
        Update: {
          categoria?: string;
          cod?: string;
          created_at?: string;
          data?: string;
          descricao?: string;
          id?: string;
          origem?: string;
          status?: string;
          tipo?: string;
          updated_at?: string;
          user_id?: string;
          valor?: number;
        };
        Relationships: [];
      };
      notas: {
        Row: {
          cliente: string;
          competencia: string;
          cpf_cnpj: string;
          created_at: string;
          emissao: string;
          id: string;
          impostos_devidos: number;
          numero: string;
          situacao: string;
          updated_at: string;
          user_id: string;
          valor_servicos: number;
        };
        Insert: {
          cliente: string;
          competencia: string;
          cpf_cnpj: string;
          created_at?: string;
          emissao: string;
          id?: string;
          impostos_devidos?: number;
          numero: string;
          situacao: string;
          updated_at?: string;
          user_id: string;
          valor_servicos?: number;
        };
        Update: {
          cliente?: string;
          competencia?: string;
          cpf_cnpj?: string;
          created_at?: string;
          emissao?: string;
          id?: string;
          impostos_devidos?: number;
          numero?: string;
          situacao?: string;
          updated_at?: string;
          user_id?: string;
          valor_servicos?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
