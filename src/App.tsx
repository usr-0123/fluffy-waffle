import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import ViewOurWork from "./pages/ViewOurWork";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <AdminProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="*" element={
                            <>
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<Index />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/service/:serviceId" element={<ServiceDetail />} />
                                    <Route path="/projects" element={<Projects />} />
                                    <Route path="/view-our-work" element={<ViewOurWork />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </>
                        } />
                    </Routes>
                </BrowserRouter>
            </AdminProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;