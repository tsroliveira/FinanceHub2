// Função para formatar valores monetários (mantém no máximo 2 casas decimais)
export const formatCurrency = (
  value: number,
  currency: "BRL" | "USD" = "BRL",
): string => {
  if (value === 0) return currency === "BRL" ? "R$ 0" : "$ 0";

  // Remove zeros desnecessários à direita, mantendo no máximo 2 casas decimais
  const formatted = value.toFixed(2).replace(/\.?0+$/, "");
  const symbol = currency === "BRL" ? "R$" : "$";

  return `${symbol} ${parseFloat(formatted).toLocaleString(currency === "BRL" ? "pt-BR" : "en-US")}`;
};

// Função para formatar números decimais (remove zeros desnecessários)
export const formatNumber = (
  value: number,
  maxDecimals: number = 15,
): string => {
  if (value === 0) return "0";

  // Remove zeros desnecessários à direita
  const formatted = value.toFixed(maxDecimals).replace(/\.?0+$/, "");
  return parseFloat(formatted).toLocaleString("pt-BR");
};

// Função para formatar percentuais
export const formatPercentage = (value: number): string => {
  if (value === 0) return "0%";

  const formatted = value.toFixed(2).replace(/\.?0+$/, "");
  return `${value >= 0 ? "+" : ""}${parseFloat(formatted).toLocaleString("pt-BR")}%`;
};
