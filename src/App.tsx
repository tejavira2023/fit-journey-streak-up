import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import FitnessCategories from "./pages/FitnessCategories";
import FitnessProgram from "./pages/FitnessProgram";
import LevelDetail from "./pages/LevelDetail";
import Consult from "./pages/Consult";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import ConsultationForm from "./pages/ConsultationForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fitness" element={<FitnessCategories />} />
          <Route path="/fitness/:category/:difficulty" element={<FitnessProgram />} />
          <Route path="/fitness/:category/:difficulty/level/:levelId" element={<LevelDetail />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/account" element={<Account />} />
          <Route path="/consultation-form" element={<ConsultationForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
