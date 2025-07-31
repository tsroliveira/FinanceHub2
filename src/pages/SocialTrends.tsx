
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Hash, TrendingUp, Heart, Share, Eye, Twitter, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SocialTrends() {
  const [timeframe, setTimeframe] = useState("24h");

  const socialMetrics = [
    {
      platform: "Twitter",
      mentions: 12450,
      change: 23.5,
      sentiment: "Bullish",
      icon: Twitter,
      color: "text-blue-500"
    },
    {
      platform: "Reddit",
      mentions: 8920,
      change: 15.2,
      sentiment: "Neutral",
      icon: MessageSquare,
      color: "text-orange-500"
    },
    {
      platform: "Discord",
      mentions: 5680,
      change: -8.3,
      sentiment: "Bearish",
      icon: MessageCircle,
      color: "text-purple-500"
    }
  ];

  const trendingTopics = [
    { tag: "#Bitcoin", mentions: 45620, change: 18.7, category: "Cryptocurrency" },
    { tag: "#Ethereum", mentions: 32180, change: 12.4, category: "Cryptocurrency" },
    { tag: "#DeFi", mentions: 28950, change: 25.3, category: "Technology" },
    { tag: "#NFT", mentions: 19870, change: -5.2, category: "Art" },
    { tag: "#Web3", mentions: 15640, change: 8.9, category: "Technology" },
    { tag: "#Solana", mentions: 12340, change: 32.1, category: "Cryptocurrency" }
  ];

  const influencerPosts = [
    {
      id: 1,
      author: "CryptoGuru",
      content: "Bitcoin breaking resistance levels. This could be the start of the next bull run! 🚀",
      platform: "Twitter",
      engagement: 2450,
      sentiment: "Bullish",
      timestamp: "2h"
    },
    {
      id: 2,
      author: "DeFiAnalyst",
      content: "TVL in major protocols showing strong growth. DeFi summer 2.0? 🌟",
      platform: "Twitter", 
      engagement: 1890,
      sentiment: "Bullish",
      timestamp: "4h"
    },
    {
      id: 3,
      author: "BlockchainDev",
      content: "Interesting developments in Layer 2 scaling solutions. Efficiency gains are impressive.",
      platform: "Reddit",
      engagement: 1250,
      sentiment: "Neutral",
      timestamp: "6h"
    }
  ];

  const timeframes = ["1h", "24h", "7d", "30d"];

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="text-primary" size={24} />
            <div>
              <h1 className="text-2xl font-semibold">Social Trends</h1>
              <p className="text-muted-foreground">
                Track cryptocurrency sentiment across social media platforms
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {timeframes.map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialMetrics.map((metric) => (
            <Card key={metric.platform} className="hover:shadow-md transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <metric.icon className={cn("", metric.color)} size={20} />
                    <CardTitle className="text-lg">{metric.platform}</CardTitle>
                  </div>
                  <Badge 
                    variant={
                      metric.sentiment === "Bullish" ? "default" : 
                      metric.sentiment === "Bearish" ? "destructive" : "secondary"
                    }
                  >
                    {metric.sentiment}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{metric.mentions.toLocaleString()}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mentions</span>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      metric.change >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      <TrendingUp size={12} />
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="text-primary" size={20} />
                Trending Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.tag} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-primary">{topic.tag}</p>
                        <p className="text-sm text-muted-foreground">{topic.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{topic.mentions.toLocaleString()}</p>
                      <div className={cn(
                        "text-sm font-medium",
                        topic.change >= 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {topic.change >= 0 ? "+" : ""}{topic.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="text-primary" size={20} />
                Influencer Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {influencerPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-xs font-medium">{post.author.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">@{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.platform} • {post.timestamp}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          post.sentiment === "Bullish" ? "default" : 
                          post.sentiment === "Bearish" ? "destructive" : "secondary"
                        }
                        className="text-xs"
                      >
                        {post.sentiment}
                      </Badge>
                    </div>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{post.engagement}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} />
                        <span>{Math.floor(post.engagement * 0.3)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share size={12} />
                        <span>{Math.floor(post.engagement * 0.1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">68%</div>
                <div className="text-sm text-muted-foreground">Bullish Sentiment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-500 mb-2">22%</div>
                <div className="text-sm text-muted-foreground">Neutral Sentiment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">10%</div>
                <div className="text-sm text-muted-foreground">Bearish Sentiment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">8.2</div>
                <div className="text-sm text-muted-foreground">Social Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
