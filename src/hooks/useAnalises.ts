import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Analise {
  id: string;
  ativo: string;
  tipo: string;
  empresa: string;
  setor: string;
  rentabilidade: number;
  fonte: string;
  data: string;
  valor: number;
  anual: number;
  risco: "Alto" | "Médio" | "Baixo";
  prioridade: "Alta" | "Média" | "Baixa";
  user_id: string;
}

export const useAnalises = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["analises", user?.id],
    queryFn: async () => {
      console.log("Fetching analises for user:", user?.id);

      if (!user) {
        console.log("No user found, returning empty array");
        return [];
      }

      const { data, error } = await supabase
        .from("analises")
        .select("*")
        .order("data", { ascending: false });

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Error fetching analises:", error);
        throw error;
      }

      return data as Analise[];
    },
    enabled: !!user,
  });
};

export const useCreateAnalise = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (analise: Omit<Analise, "id" | "user_id">) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("analises")
        .insert([
          {
            ...analise,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analises"] });
    },
  });
};
