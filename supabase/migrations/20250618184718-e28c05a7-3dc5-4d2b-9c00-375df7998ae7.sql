
-- Fix critical RLS INSERT policies to prevent unauthorized user_id insertion

-- Update analises INSERT policy
DROP POLICY IF EXISTS "Users can create their own analises" ON public.analises;
CREATE POLICY "Users can create their own analises" ON public.analises 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Update ativos INSERT policy  
DROP POLICY IF EXISTS "Users can create their own ativos" ON public.ativos;
CREATE POLICY "Users can create their own ativos" ON public.ativos 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Update contas INSERT policy
DROP POLICY IF EXISTS "Users can create their own contas" ON public.contas;
CREATE POLICY "Users can create their own contas" ON public.contas 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Update notas INSERT policy
DROP POLICY IF EXISTS "Users can create their own notas" ON public.notas;
CREATE POLICY "Users can create their own notas" ON public.notas 
FOR INSERT WITH CHECK (auth.uid() = user_id);
