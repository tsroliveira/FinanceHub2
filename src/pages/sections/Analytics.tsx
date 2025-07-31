import React, { useState } from "react";
import { useAnalises } from "@/hooks/useAnalises";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

import { useStats } from "@/hooks/useStats";
import Layout from "@/components/Layout";
import StatsCard from "@/components/StatsCard";
import GaugeChart from "@/components/GaugeChart";
import TrendingSection from "@/components/TrendingSection";
import TableAnaliseAtivos from "@/components/TableAnaliseAtivos";
import FearGreedIndex from "@/components/FearGreedIndex";
import {
  Plus,
  Search,
  TrendingUp,
  AlertTriangle,
  Bitcoin,
  DollarSign,
  BarChart,
  LineChart,
} from "lucide-react";

const getRiscoColor = (risco: string) => {
  switch (risco) {
    case "Alto":
      return "text-white bg-red-600";
    case "Médio":
      return "text-white bg-yellow-600";
    case "Baixo":
      return "text-white bg-green-600";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "Alta":
      return "text-white bg-red-600";
    case "Média":
      return "text-white bg-yellow-600";
    case "Baixa":
      return "text-white bg-green-600";
    case "Pendente":
      return "text-white bg-gray-600";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export const Analytics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisco, setFilterRisco] = useState("");
  const [filterSetor, setFilterSetor] = useState("");
  const { user } = useAuth();

  const {
    loading,
    stats,
    tvlData,
    fearGreed,
    trending,
    recentProjects,
    refreshData,
  } = useStats();

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value.toFixed(2)}`;
  };

  const { data: analises = [], isLoading, error } = useAnalises();

  console.log("Component state:", { user, analises, isLoading, error });

  const filteredAnalises = analises.filter((analise) => {
    const matchesSearch =
      analise.ativo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analise.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisco = !filterRisco || analise.risco === filterRisco;
    const matchesSetor = !filterSetor || analise.setor === filterSetor;
    return matchesSearch && matchesRisco && matchesSetor;
  });

  const filteredAnalisesFormated = filteredAnalises.map((a, index) => ({
    id: index + 1,
    name: a.ativo,
    symbol: a.tipo,
    brokerScore: index,
    price: a.valor,
    priceChange: a.rentabilidade,
    rank: index + 1,
  }));

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">
          Faça login para ver suas análises.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Carregando análises...</div>
      </div>
    );
  }

  if (error) {
    console.error("Error in component:", error);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">
          Erro ao carregar análises: {error.message}
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Stats Cards */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatsCard
              title="Evaluated Assets"
              value={String(analises.length)}
              change={stats.dailyChange}
              icon={<LineChart size={20} className="text-chart-blue" />}
              colorClass="from-blue-500/20 to-blue-600/5"
              animationDelay="0ms"
            />
            <StatsCard
              title="Average Investment Return"
              value={
                analises.length > 0
                  ? formatPercentage(
                      analises.reduce(
                        (acc, curr) => acc + curr.rentabilidade,
                        0,
                      ) / analises.length,
                    )
                  : "0%"
              }
              change={10.2}
              icon={<DollarSign size={20} className="text-chart-green" />}
              colorClass="from-green-500/20 to-green-600/5"
              animationDelay="100ms"
            />
            <StatsCard
              title="24h Trading Volume"
              value={formatCurrency(stats.tradingVolume)}
              change={-2.8}
              icon={<BarChart size={20} className="text-chart-purple" />}
              colorClass="from-purple-500/20 to-purple-600/5"
              animationDelay="150ms"
            />
            <StatsCard
              title="High Risk Assets"
              value={String(analises.filter((a) => a.risco === "Alto").length)}
              change={1.3}
              icon={<AlertTriangle size={20} className="text-chart-yellow" />}
              colorClass="from-yellow-500/20 to-yellow-600/5"
              animationDelay="50ms"
            />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Análises de Ativos
              </h2>
              <p className="text-muted-foreground">
                Gerencie suas análises de investimentos
              </p>
            </div>
            <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nova Análise</span>
            </button>
          </div>
          {/* Filters */}
          <div className="bg-card rounded-xl p-6 border border-border/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar por ativo ou empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={filterRisco}
                onChange={(e) => setFilterRisco(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos os Riscos</option>
                <option value="Alto">Alto</option>
                <option value="Médio">Médio</option>
                <option value="Baixo">Baixo</option>
              </select>
              <select
                value={filterSetor}
                onChange={(e) => setFilterSetor(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos os Setores</option>
                <option value="Petróleo">Petróleo</option>
                <option value="Mineração">Mineração</option>
                <option value="Bancário">Bancário</option>
              </select>
            </div>
          </div>
          {/* Table */}
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            {filteredAnalises.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>Nenhuma análise encontrada.</p>
                <p className="text-sm mt-2">
                  Comece adicionando sua primeira análise de ativo!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">
                        Ativo
                      </th>
                      <th className="text-left p-4 font-medium text-foreground">
                        Empresa
                      </th>
                      <th className="text-left p-4 font-medium text-foreground">
                        Setor
                      </th>
                      <th className="text-right p-4 font-medium text-foreground">
                        Valor
                      </th>
                      <th className="text-right p-4 font-medium text-foreground">
                        Rentabilidade
                      </th>
                      <th className="text-center p-4 font-medium text-foreground">
                        Risco
                      </th>
                      <th className="text-center p-4 font-medium text-foreground">
                        Prioridade
                      </th>
                      <th className="text-left p-4 font-medium text-foreground">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnalises.map((analise) => (
                      <tr
                        key={analise.id}
                        className="border-t border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="font-medium text-foreground">
                            {analise.ativo}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {analise.tipo}
                          </div>
                        </td>
                        <td className="p-4 text-foreground">
                          {analise.empresa}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {analise.setor}
                        </td>
                        <td className="p-4 text-right font-medium text-foreground">
                          {formatCurrency(analise.valor, "BRL")}
                        </td>
                        <td className="p-4 text-right">
                          <div className="font-medium text-green-600">
                            {formatPercentage(analise.rentabilidade)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatPercentage(analise.anual)} a.a.
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRiscoColor(analise.risco)}`}
                          >
                            {analise.risco}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(analise.prioridade)}`}
                          >
                            {analise.prioridade}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(analise.data).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <TableAnaliseAtivos ativos={filteredAnalisesFormated} />
        </div>
      </div>
    </Layout>
  );
};
