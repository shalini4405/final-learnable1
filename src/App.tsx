import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import RequireAuth from "./components/auth/RequireAuth";
import { useUser } from "./contexts/UserContext";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import HackBuddiesPage from "./pages/HackBuddiesPage";
import SkillGraphPage from "./pages/SkillGraphPage";
import RoadmapPage from "./pages/RoadmapPage";
import ResourcesPage from "./pages/ResourcesPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import CustomizationPage from "./pages/CustomizationPage";
import NotFound from "./pages/NotFound";
import ChatbotUI from "./components/AIChatbot/ChatbotUI";
import { ChatbotProvider } from "./hooks/use-chatbot";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

// Component to check if user needs customization
const RequireCustomization = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  
  if (user && !user.hasCompletedCustomization) {
    return <Navigate to="/customize" replace />;
  }
  
  return <>{children}</>;
};

// Component to redirect authenticated users away from auth pages
const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Main routing component that uses the user context
const AppRoutes = () => {
  const { user } = useUser();

  return (
    <Routes>
      {/* Public routes - redirect to home if already authenticated */}
      <Route path="/login" element={
        <RedirectIfAuthenticated>
          <LoginPage />
        </RedirectIfAuthenticated>
      } />
      <Route path="/signup" element={
        <RedirectIfAuthenticated>
          <SignUpPage />
        </RedirectIfAuthenticated>
      } />
      <Route path="/forgot-password" element={
        <RedirectIfAuthenticated>
          <ForgotPassword />
        </RedirectIfAuthenticated>
      } />
      
      {/* Redirect root to login if not authenticated */}
      <Route path="/" element={
        user ? (
          <RequireAuth>
            <RequireCustomization>
              <AppLayout>
                <HomePage />
              </AppLayout>
            </RequireCustomization>
          </RequireAuth>
        ) : (
          <Navigate to="/login" replace />
        )
      } />
      
      {/* Protected routes */}
      <Route path="/courses" element={
        <RequireAuth>
          <RequireCustomization>
            <AppLayout>
              <CoursesPage />
            </AppLayout>
          </RequireCustomization>
        </RequireAuth>
      } />
      
      <Route path="/roadmap" element={
        <RequireAuth>
          <RequireCustomization>
            <AppLayout>
              <RoadmapPage />
            </AppLayout>
          </RequireCustomization>
        </RequireAuth>
      } />
      
      <Route path="/resources" element={
        <RequireAuth>
          <RequireCustomization>
            <AppLayout>
              <ResourcesPage />
            </AppLayout>
          </RequireCustomization>
        </RequireAuth>
      } />
      
      <Route path="/skill-graph" element={
        <RequireAuth>
          <RequireCustomization>
            <AppLayout>
              <SkillGraphPage />
            </AppLayout>
          </RequireCustomization>
        </RequireAuth>
      } />
      
      <Route path="/leaderboard" element={
        <RequireAuth>
          <RequireCustomization>
            <AppLayout>
              <LeaderboardPage />
            </AppLayout>
          </RequireCustomization>
        </RequireAuth>
      } />
      
      <Route path="/hackbuddies" element={
        <RequireAuth>
          <RequireCustomization>
            <AppLayout>
              <HackBuddiesPage />
            </AppLayout>
          </RequireCustomization>
        </RequireAuth>
      } />
      
      <Route path="/profile" element={
        <RequireAuth>
          <RequireCustomization>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </RequireCustomization>
        </RequireAuth>
      } />

      {/* Customization route - protected but doesn't require customization */}
      <Route path="/customize" element={
        <RequireAuth>
          <AppLayout>
            <CustomizationPage />
          </AppLayout>
        </RequireAuth>
      } />
      
      {/* Catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <ChatbotProvider>
            <BrowserRouter>
              <AppRoutes />
              <ChatbotUI />
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </ChatbotProvider>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;