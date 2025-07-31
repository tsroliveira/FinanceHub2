import { useStats } from "@/hooks/useStats";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Trophy, Star, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopROI() {
  const { recentProjects, loading } = useStats();

  // Sort projects by price change (ROI) in descending order
  const topROIProjects = [...recentProjects]
    .sort((a, b) => b.priceChange - a.priceChange)
    .slice(0, 10);

  const formatPrice = (price: number) => `$${price.toFixed(4)}`;
  const formatRank = (rank: number) => `#${rank}`;

  if (loading) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
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
          <Trophy className="text-yellow-500" size={24} />
          <div>
            <h1 className="text-2xl font-semibold">Top ROI Projects</h1>
            <p className="text-muted-foreground">
              Best performing crypto projects by return on investment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topROIProjects.map((project, index) => (
            <Card key={project.id} className={cn(
              "relative overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]",
              index === 0 && "ring-2 ring-yellow-500/50 bg-gradient-to-br from-yellow-50/50 to-transparent",
              index === 1 && "ring-2 ring-gray-400/50 bg-gradient-to-br from-gray-50/50 to-transparent",
              index === 2 && "ring-2 ring-orange-500/50 bg-gradient-to-br from-orange-50/50 to-transparent"
            )}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="font-semibold">{project.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{project.symbol}</p>
                    </div>
                  </div>
                  
                  {index < 3 && (
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      index === 0 && "bg-yellow-500 text-white",
                      index === 1 && "bg-gray-400 text-white",
                      index === 2 && "bg-orange-500 text-white"
                    )}>
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-xl font-semibold">{formatPrice(project.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Market Rank</p>
                    <p className="font-semibold">{formatRank(project.rank)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">24h ROI</span>
                    <div className="flex items-center gap-1 text-green-500 font-semibold">
                      <ArrowUpRight size={16} />
                      +{project.priceChange}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Broker Score</span>
                    <Badge variant={project.brokerScore >= 8 ? "default" : "secondary"}>
                      {project.brokerScore}/10
                    </Badge>
                  </div>
                </div>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((project.priceChange / 20) * 100, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">
                  +{topROIProjects[0]?.priceChange || 0}%
                </p>
                <p className="text-sm text-muted-foreground">Best Performer</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {(topROIProjects.reduce((acc, p) => acc + p.priceChange, 0) / topROIProjects.length).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Average ROI</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {topROIProjects.filter(p => p.priceChange > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Positive Performers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
