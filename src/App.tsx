
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import HackBuddiesPage from "./pages/HackBuddiesPage";
import SkillGraphPage from "./pages/SkillGraphPage";
import RoadmapPage from "./pages/RoadmapPage";
import ResourcesPage from "./pages/ResourcesPage";
import NotFound from "./pages/NotFound";
import ChatbotUI from "./components/AIChatbot/ChatbotUI";
import { ChatbotProvider } from "./hooks/use-chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatbotProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/hackbuddies" element={<HackBuddiesPage />} />
              <Route path="/skill-graph" element={<SkillGraphPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotUI />
        </BrowserRouter>
      </ChatbotProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
