import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ResidentDashboard from "./pages/resident/Dashboard";
import Visitors from "./pages/resident/Visitors";
import Services from "./pages/resident/Services";
import Facilities from "./pages/resident/Facilities";
import Marketplace from "./pages/resident/Marketplace";
import CommunityFeed from "./pages/resident/CommunityFeed";
import GuardDashboard from "./pages/guard/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Resident Routes */}
            <Route path="/resident" element={<ProtectedRoute allowedRoles={['resident']}><ResidentDashboard /></ProtectedRoute>} />
            <Route path="/resident/visitors" element={<ProtectedRoute allowedRoles={['resident']}><Visitors /></ProtectedRoute>} />
            <Route path="/resident/services" element={<ProtectedRoute allowedRoles={['resident']}><Services /></ProtectedRoute>} />
            <Route path="/resident/facilities" element={<ProtectedRoute allowedRoles={['resident']}><Facilities /></ProtectedRoute>} />
            <Route path="/resident/marketplace" element={<ProtectedRoute allowedRoles={['resident']}><Marketplace /></ProtectedRoute>} />
            <Route path="/resident/feed" element={<ProtectedRoute allowedRoles={['resident']}><CommunityFeed /></ProtectedRoute>} />
            
            {/* Guard Routes */}
            <Route path="/guard" element={<ProtectedRoute allowedRoles={['guard']}><GuardDashboard /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
