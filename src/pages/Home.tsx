
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowRight, User } from "lucide-react";
import StreakDisplay from "@/components/fitness/StreakDisplay";
import RewardCard from "@/components/fitness/RewardCard";
import ConsultCard from "@/components/fitness/ConsultCard";
import FloatingChatButton from "@/components/fitness/FloatingChatButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Session } from "@supabase/supabase-js";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState({
    streak: 0,
    completedLevels: [] as string[],
  });

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (!data.session) {
          navigate("/login", { replace: true });
          return;
        }
        
        setSession(data.session);
        
        // If we have a session, get or initialize user data
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          // Initialize user data
          const initialUserData = {
            streak: 0,
            completedLevels: [],
            lastActivityDates: {}
          };
          localStorage.setItem("userData", JSON.stringify(initialUserData));
          setUserData(initialUserData);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        toast.error("Authentication error. Please log in again.");
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate("/login", { replace: true });
        } else if (event === 'SIGNED_IN') {
          setSession(session);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-fitness-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-fitness-primary">FitJourney</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/account")}>
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <StreakDisplay />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Start Fitness</h2>
            <Button 
              variant="link" 
              className="text-fitness-primary p-0 h-auto flex items-center"
              onClick={() => navigate("/fitness")}
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col gap-4">
            <p className="text-gray-600">Choose a fitness category to begin your journey:</p>
            <Button 
              className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
              size="lg"
              onClick={() => navigate("/fitness")}
            >
              Start Workout
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold">Rewards</h2>
            </div>
            <RewardCard 
              title="Weekly Streak"
              description="Complete a workout every day for 7 days"
              progress={userData.streak % 7}
              total={7}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold">Consultation</h2>
            </div>
            <ConsultCard />
          </div>
        </div>
      </main>

      <FloatingChatButton />
    </div>
  );
};

export default Home;
