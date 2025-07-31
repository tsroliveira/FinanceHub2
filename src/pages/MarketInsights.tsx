
import { useStats } from "@/hooks/useStats";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, BarChart3, PieChart, Activity, TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarketInsights() {
  const { loading } = useStats();

  const insights = [
    {
      id: 1,
      title: "Bitcoin Dominance",
      value: "52.3%",
      change: "+2.1%",
      trend: "up",
      description: "BTC market cap dominance increasing",
      icon: BarChart3
    },
    {
      id: 2,
      title: "DeFi TVL",
      value: "$46.8B",
      change: "+8.3%",
      trend: "up", 
      description: "Total Value Locked in DeFi protocols",
      icon: PieChart
    },
    {
      id: 3,
      title: "Active Addresses",
      value: "1.2M",
      change: "-3.2%",
      trend: "down",
      description: "Daily active addresses across networks",
      icon: Users
    },
    {
      id: 4,
      title: "Volume/MCap",
      value: "3.8%",
      change: "+1.5%",
      trend: "up",
      description: "24h volume to market cap ratio",
      icon: Activity
    }
  ];

  const sectors = [
    { name: "DeFi", allocation: 35, change: 12.4, color: "bg-blue-500" },
    { name: "Layer 1", allocation: 28, change: 8.7, color: "bg-green-500" },
    { name: "Gaming", allocation: 15, change: -2.3, color: "bg-purple-500" },
    { name: "Infrastructure", allocation: 12, change: 5.1, color: "bg-orange-500" },
    { name: "NFTs", allocation: 10, change: -8.9, color: "bg-pink-500" }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <LineChart className="text-primary" size={24} />
          <div>
            <h1 className="text-2xl font-semibold">Market Insights</h1>
            <p className="text-muted-foreground">
              Deep dive into cryptocurrency market analytics and trends
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight) => (
            <Card key={insight.id} className="hover:shadow-md transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <insight.icon className="text-primary" size={20} />
                  <Badge 
                    variant={insight.trend === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {insight.change}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{insight.value}</p>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="text-primary" size={20} />
                Sector Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sectors.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", sector.color)} />
                    <span className="font-medium">{sector.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{sector.allocation}%</span>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      sector.change >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {sector.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {Math.abs(sector.change)}%
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="text-primary" size={20} />
                Market Health Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Fear & Greed Index</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">72</span>
                    <Badge variant="default">Greed</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">RSI (14d)</span>
                  <span className="font-semibold">68.4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">MVRV Ratio</span>
                  <span className="font-semibold text-green-500">1.24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Funding Rate</span>
                  <span className="font-semibold text-blue-500">0.012%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="text-primary" size={20} />
              Market Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">Bullish</div>
                <div className="text-sm text-muted-foreground">Overall sentiment based on social metrics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">High</div>
                <div className="text-sm text-muted-foreground">Market volatility level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">Strong</div>
                <div className="text-sm text-muted-foreground">Institutional interest</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
