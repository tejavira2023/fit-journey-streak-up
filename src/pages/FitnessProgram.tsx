
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LevelProgression from "@/components/fitness/LevelProgression";

const FitnessProgram = () => {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Validate parameters
    if (!category || !difficulty) {
      navigate("/fitness");
      return;
    }
  }, [navigate, category, difficulty]);

  if (!category || !difficulty) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/fitness")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2 capitalize">
            {category} - {difficulty} Program
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <LevelProgression 
            category={category} 
            difficulty={difficulty} 
          />
        </div>
      </main>
    </div>
  );
};

export default FitnessProgram;
