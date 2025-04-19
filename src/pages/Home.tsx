
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Award, Calendar, LogOut, ArrowRight } from "lucide-react";
import StreakDisplay from "@/components/fitness/StreakDisplay";
import RewardCard from "@/components/fitness/RewardCard";
import ConsultCard from "@/components/fitness/ConsultCard";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    streak: 0,
    completedLevels: [] as string[],
  });

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Get user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-fitness-primary">FitJourney</h1>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
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
              <Award className="h-5 w-5 text-fitness-primary" />
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
              <Calendar className="h-5 w-5 text-fitness-primary" />
              <h2 className="text-xl font-semibold">Consultation</h2>
            </div>
            <ConsultCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
