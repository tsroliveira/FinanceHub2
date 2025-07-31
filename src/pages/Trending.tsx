
import { useState } from "react";
import { useStats } from "@/hooks/useStats";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Flame, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Trending() {
  const { trending, loading } = useStats();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", count: trending.length },
    { id: "project", name: "Projects", count: trending.filter(t => t.category === "Project").length },
    { id: "platform", name: "Platforms", count: trending.filter(t => t.category === "Platform").length },
  ];

  const filteredTrending = selectedCategory === "all" 
    ? trending 
    : trending.filter(token => token.category.toLowerCase() === selectedCategory);

  const sortedTrending = [...filteredTrending].sort((a, b) => Math.abs(b.change) - Math.abs(a.change));

  if (loading) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
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
          <Flame className="text-orange-500" size={24} />
          <div>
            <h1 className="text-2xl font-semibold">Trending Tokens</h1>
            <p className="text-muted-foreground">
              Most talked about and actively traded cryptocurrencies
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedTrending.map((token, index) => (
            <Card key={token.id} className="hover:shadow-md transition-all hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="font-semibold text-lg">{token.symbol.charAt(0)}</span>
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <Flame size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{token.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{token.symbol}</span>
                        <Badge variant="outline" className="text-xs">
                          {token.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {token.change >= 0 ? (
                      <TrendingUp className="text-green-500" size={20} />
                    ) : (
                      <TrendingDown className="text-red-500" size={20} />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <div className={cn(
                      "flex items-center gap-1 text-xl font-semibold",
                      token.change >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {token.change >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      {Math.abs(token.change)}%
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Trend Rank</p>
                    <p className="text-xl font-semibold">#{index + 1}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Momentum</span>
                    <span className="font-medium">
                      {Math.abs(token.change) > 15 ? "Very High" : 
                       Math.abs(token.change) > 10 ? "High" : 
                       Math.abs(token.change) > 5 ? "Moderate" : "Low"}
                    </span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={cn(
                        "h-2 rounded-full transition-all duration-500",
                        token.change >= 0 
                          ? "bg-gradient-to-r from-green-500 to-green-600" 
                          : "bg-gradient-to-r from-red-500 to-red-600"
                      )}
                      style={{ width: `${Math.min(Math.abs(token.change) * 4, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} />
              Trending Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">
                  {trending.filter(t => t.change > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Trending Up</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">
                  {trending.filter(t => t.change < 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Trending Down</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {Math.max(...trending.map(t => Math.abs(t.change))).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Biggest Move</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {(trending.reduce((acc, t) => acc + Math.abs(t.change), 0) / trending.length).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Volatility</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
