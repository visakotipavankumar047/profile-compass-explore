
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "@/context/ProfileContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import Admin from "./pages/Admin";
import ProfileFormPage from "./pages/ProfileFormPage";

// Leaflet CSS import is now handled in the Map component

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Ensure the App component is defined as a function expression rather than an arrow function
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProfileProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/new" element={<ProfileFormPage />} />
              <Route path="/admin/edit/:id" element={<ProfileFormPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProfileProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
