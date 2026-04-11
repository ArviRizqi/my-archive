import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import WorkDetail from "./pages/WorkDetail";
import { CategoryPage } from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Newsletter from "./pages/Newsletter";
import Archive from "./pages/Archive";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminWorks from "./pages/admin/AdminWorks";
import AdminWorkForm from "./pages/admin/AdminWorkForm";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSubscribers from "./pages/admin/AdminSubscribers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/puisi" element={<CategoryPage category="puisi" />} />
              <Route path="/cerpen" element={<CategoryPage category="cerpen" />} />
              <Route path="/prosa" element={<CategoryPage category="prosa" />} />
              <Route path="/kutipan" element={<CategoryPage category="kutipan" />} />
              <Route path="/about" element={<About />} />
              <Route path="/work/:id" element={<WorkDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/archive" element={<Archive />} />
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/works" element={<AdminWorks />} />
              <Route path="/admin/works/new" element={<AdminWorkForm />} />
              <Route path="/admin/works/:id" element={<AdminWorkForm />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/subscribers" element={<AdminSubscribers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
