
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Weight, Meditation, Activity, ArrowLeft, Yoga } from "lucide-react";
import { Button } from "@/components/ui/button";
import FitnessCategory from "@/components/fitness/FitnessCategory";
import DifficultySelector from "@/components/fitness/DifficultySelector";

const FitnessCategories = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
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
      icon: Meditation,
    },
    {
      name: "Gaining Weight",
      description: "Build muscle mass and increase body weight healthily",
      icon: Activity,
    },
    {
      name: "Yoga",
      description: "Improve flexibility, balance and mental clarity",
      icon: Yoga,
    },
  ];
  
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsDialogOpen(true);
  };
  
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
