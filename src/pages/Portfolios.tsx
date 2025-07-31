
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, TrendingUp, TrendingDown, PieChart, DollarSign, Target, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Portfolios() {
  const [selectedPortfolio, setSelectedPortfolio] = useState("main");

  const portfolios = [
    {
      id: "main",
      name: "Main Portfolio",
      value: 45620.85,
      change: 8.7,
      holdings: 12,
      color: "bg-blue-500"
    },
    {
      id: "defi",
      name: "DeFi Focus",
      value: 23450.32,
      change: 15.2,
      holdings: 8,
      color: "bg-green-500"
    },
    {
      id: "hodl",
      name: "HODL Strategy",
      value: 78920.15,
      change: 4.3,
      holdings: 5,
      color: "bg-purple-500"
    }
  ];

  const holdings = [
    { symbol: "BTC", name: "Bitcoin", amount: 0.75, value: 46000, allocation: 35, change: 2.4 },
    { symbol: "ETH", name: "Ethereum", amount: 12.5, value: 30000, allocation: 25, change: 5.1 },
    { symbol: "SOL", name: "Solana", amount: 150, value: 15000, allocation: 15, change: 12.8 },
    { symbol: "AVAX", name: "Avalanche", amount: 200, value: 8000, allocation: 10, change: -2.3 },
    { symbol: "DOT", name: "Polkadot", amount: 500, value: 6000, allocation: 8, change: 3.7 },
    { symbol: "LINK", name: "Chainlink", amount: 300, value: 4500, allocation: 7, change: 1.2 }
  ];

  const currentPortfolio = portfolios.find(p => p.id === selectedPortfolio) || portfolios[0];
  const totalValue = currentPortfolio.value;

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="text-primary" size={24} />
            <div>
              <h1 className="text-2xl font-semibold">Portfolios</h1>
              <p className="text-muted-foreground">
                Track and manage your cryptocurrency investments
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            New Portfolio
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolios.map((portfolio) => (
            <Card 
              key={portfolio.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedPortfolio === portfolio.id && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedPortfolio(portfolio.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", portfolio.color)} />
                    <CardTitle className="text-lg">{portfolio.name}</CardTitle>
                  </div>
                  <Badge variant={portfolio.change >= 0 ? "default" : "destructive"}>
                    {portfolio.change >= 0 ? "+" : ""}{portfolio.change}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">${portfolio.value.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{portfolio.holdings} holdings</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="text-primary" size={20} />
                  {currentPortfolio.name} Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding) => (
                    <div key={holding.symbol} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="font-semibold text-sm">{holding.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{holding.name}</p>
                          <p className="text-sm text-muted-foreground">{holding.amount} {holding.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${holding.value.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{holding.allocation}%</span>
                          <div className={cn(
                            "flex items-center gap-1 text-sm",
                            holding.change >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {holding.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {Math.abs(holding.change)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="text-primary" size={20} />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">24h Change</span>
                    <span className={cn(
                      "font-medium",
                      currentPortfolio.change >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {currentPortfolio.change >= 0 ? "+" : ""}{currentPortfolio.change}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">7d Change</span>
                    <span className="font-medium text-green-500">+12.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">30d Change</span>
                    <span className="font-medium text-green-500">+28.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-primary" size={20} />
                  Portfolio Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                  <span className="font-medium">1.24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Max Drawdown</span>
                  <span className="font-medium text-red-500">-18.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volatility</span>
                  <span className="font-medium">45.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Beta</span>
                  <span className="font-medium">0.87</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="text-primary" size={20} />
                  Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="text-yellow-600" size={24} />
                  </div>
                  <p className="font-medium">Top Performer</p>
                  <p className="text-sm text-muted-foreground">Beat market by 15.3% this month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
