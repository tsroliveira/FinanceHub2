
-- Criar tabela de análises
CREATE TABLE public.analises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  ativo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  empresa TEXT NOT NULL,
  setor TEXT NOT NULL,
  rentabilidade DECIMAL(10,2) NOT NULL DEFAULT 0,
  fonte TEXT NOT NULL,
  data DATE NOT NULL,
  valor DECIMAL(15,2) NOT NULL DEFAULT 0,
  anual DECIMAL(10,2) NOT NULL DEFAULT 0,
  risco TEXT NOT NULL CHECK (risco IN ('Alto', 'Médio', 'Baixo')),
  prioridade TEXT NOT NULL CHECK (prioridade IN ('Alta', 'Média', 'Baixa')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de ativos
CREATE TABLE public.ativos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  ativo TEXT NOT NULL,
  moeda TEXT NOT NULL CHECK (moeda IN ('BRL', 'USD')),
  tipo TEXT NOT NULL,
  conta TEXT NOT NULL,
  setor TEXT NOT NULL,
  cod TEXT NOT NULL,
  country TEXT NOT NULL,
  operacao TEXT NOT NULL,
  status TEXT NOT NULL,
  descricao TEXT NOT NULL,
  data DATE NOT NULL,
  val_tt_rs DECIMAL(15,2) NOT NULL DEFAULT 0,
  val_tt_us DECIMAL(15,2) NOT NULL DEFAULT 0,
  val_uni_rs DECIMAL(15,2) NOT NULL DEFAULT 0,
  val_uni_us DECIMAL(15,2) NOT NULL DEFAULT 0,
  quantidade INTEGER NOT NULL DEFAULT 0,
  taxa DECIMAL(10,4) NOT NULL DEFAULT 0,
  corretagem DECIMAL(15,2) NOT NULL DEFAULT 0,
  num_ordem TEXT,
  pvp DECIMAL(15,2) NOT NULL DEFAULT 0,
  val_atual DECIMAL(15,2) NOT NULL DEFAULT 0,
  valorizacao DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de contas
CREATE TABLE public.contas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  cod TEXT NOT NULL,
  data DATE NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT NOT NULL,
  tipo TEXT NOT NULL,
  origem TEXT NOT NULL,
  valor DECIMAL(15,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('Pago', 'Pendente', 'Atrasado')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de notas fiscais
CREATE TABLE public.notas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  numero TEXT NOT NULL,
  emissao DATE NOT NULL,
  competencia TEXT NOT NULL,
  cliente TEXT NOT NULL,
  cpf_cnpj TEXT NOT NULL,
  valor_servicos DECIMAL(15,2) NOT NULL DEFAULT 0,
  impostos_devidos DECIMAL(15,2) NOT NULL DEFAULT 0,
  situacao TEXT NOT NULL CHECK (situacao IN ('Emitida', 'Paga', 'Pendente', 'Cancelada')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para todas as tabelas
ALTER TABLE public.analises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ativos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para análises
CREATE POLICY "Users can view their own analises" ON public.analises FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own analises" ON public.analises FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own analises" ON public.analises FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own analises" ON public.analises FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para ativos
CREATE POLICY "Users can view their own ativos" ON public.ativos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own ativos" ON public.ativos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ativos" ON public.ativos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ativos" ON public.ativos FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para contas
CREATE POLICY "Users can view their own contas" ON public.contas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own contas" ON public.contas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own contas" ON public.contas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own contas" ON public.contas FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para notas
CREATE POLICY "Users can view their own notas" ON public.notas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own notas" ON public.notas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own notas" ON public.notas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own notas" ON public.notas FOR DELETE USING (auth.uid() = user_id);
