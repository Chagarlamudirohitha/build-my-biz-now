import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WebsiteBuilder from "./pages/WebsiteBuilder";
import Analytics from "./pages/Analytics";
import Products from "./pages/Products";
import Messages from "./pages/Messages";
import QRCodePage from "./pages/QRCode";
import AITools from "./pages/AITools";
import Tips from "./pages/Tips";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/website-builder" element={<WebsiteBuilder />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/products" element={<Products />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/qr-code" element={<QRCodePage />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/tips" element={<Tips />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
