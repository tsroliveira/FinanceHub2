import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import Index from "./pages/Index";
import ProjectList from "./pages/ProjectList";
import TopROI from "./pages/TopROI";
import Trending from "./pages/Trending";
import { Analytics } from "./pages/sections/Analytics";
import MarketInsights from "./pages/MarketInsights";
import Portfolios from "./pages/Portfolios";
import SocialTrends from "./pages/SocialTrends";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component loaded");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project-list" element={<ProjectList />} />
              <Route path="/top-roi" element={<TopROI />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/market-insights" element={<MarketInsights />} />
              <Route path="/portfolios" element={<Portfolios />} />
              <Route path="/social-trends" element={<SocialTrends />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login-form" element={<LoginForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
