
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Weight, Brain, Activity, ArrowLeft, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import FitnessCategory from "@/components/fitness/FitnessCategory";
import DifficultySelector from "@/components/fitness/DifficultySelector";
import { supabase } from "@/integrations/supabase/client";

const FitnessCategories = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
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
      } catch (error) {
        console.error("Auth check error:", error);
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
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  const fitnessCategories = [
    {
      name: "Losing Weight",
      description: "Effective exercises for weight loss and burning calories",
      icon: Weight,
    },
    {
      name: "Meditation",
      description: "Find peace and reduce stress with guided meditations",
      icon: Brain,
    },
    {
      name: "Gaining Weight",
      description: "Build muscle mass and increase body weight healthily",
      icon: Activity,
    },
    {
      name: "Yoga",
      description: "Improve flexibility, balance and mental clarity",
      icon: HeartPulse,
    },
  ];
  
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsDialogOpen(true);
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
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Fitness Categories</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <p className="text-gray-600">Choose a fitness category to begin your journey:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fitnessCategories.map((category, index) => (
            <FitnessCategory
              key={index}
              name={category.name}
              description={category.description}
              icon={category.icon}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
        
        <DifficultySelector
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          categoryType={selectedCategory}
        />
      </main>
    </div>
  );
};

export default FitnessCategories;
