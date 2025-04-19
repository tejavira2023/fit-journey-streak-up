
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LevelProgressionProps = {
  category: string;
  difficulty: string;
};

// Mock data for the levels
const getLevels = (category: string, difficulty: string) => {
  // In a real app, this would be fetched from a backend
  return [
    {
      id: 1,
      title: `${difficulty} ${category} - Level 1`,
      description: "Introduction to basic techniques",
      duration: "15 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      id: 2,
      title: `${difficulty} ${category} - Level 2`,
      description: "Building on fundamentals",
      duration: "20 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      id: 3,
      title: `${difficulty} ${category} - Level 3`,
      description: "Advanced techniques",
      duration: "25 min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
  ];
};

const LevelProgression = ({ category, difficulty }: LevelProgressionProps) => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState<any[]>([]);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [lastActivityDate, setLastActivityDate] = useState<string | null>(null);

  useEffect(() => {
    // Get levels for this category and difficulty
    setLevels(getLevels(category, difficulty));
    
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setCompletedLevels(userData.completedLevels || []);
    setLastActivityDate(userData.lastActivity);
  }, [category, difficulty]);

  // Check if user can start a new level today
  const canStartNewLevel = () => {
    if (!lastActivityDate) return true;
    
    const today = new Date().toDateString();
    const lastActivity = new Date(lastActivityDate).toDateString();
    
    return today !== lastActivity;
  };

  const startLevel = (levelId: number) => {
    // Navigate to the level detail page
    navigate(`/fitness/${category.toLowerCase()}/${difficulty.toLowerCase()}/level/${levelId}`);
  };

  const isLevelCompleted = (levelId: number) => {
    return completedLevels.includes(`${category}-${difficulty}-${levelId}`);
  };

  const isLevelLocked = (levelId: number, index: number) => {
    if (index === 0) return false;
    return !isLevelCompleted(levels[index - 1].id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center capitalize">
        {difficulty} {category} Journey
      </h2>
      
      {!canStartNewLevel() && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md mb-4">
          <p className="text-sm">
            You've already completed a level today. Come back tomorrow to continue your journey!
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        {levels.map((level, index) => (
          <Card 
            key={level.id} 
            className={`relative ${
              isLevelCompleted(level.id) 
                ? "bg-green-50 border-green-200" 
                : isLevelLocked(level.id, index)
                ? "bg-gray-50 border-gray-200 opacity-70"
                : ""
            }`}
          >
            {isLevelCompleted(level.id) && (
              <div className="absolute top-3 right-3">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Completed
                </span>
              </div>
            )}
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{level.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{level.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{level.duration}</span>
                <Button
                  size="sm"
                  className={`${
                    isLevelCompleted(level.id)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-fitness-primary hover:bg-fitness-primary/90"
                  }`}
                  onClick={() => startLevel(level.id)}
                  disabled={
                    isLevelLocked(level.id, index) || 
                    (!canStartNewLevel() && !isLevelCompleted(level.id))
                  }
                >
                  {isLevelCompleted(level.id) ? "Review" : "Start"} 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LevelProgression;
