import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type LevelProgressionProps = {
  category: string;
  difficulty: string;
};

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
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  useEffect(() => {
    // Get levels for this category and difficulty
    setLevels(getLevels(category, difficulty));
    
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setCompletedLevels(userData.completedLevels || []);
    setLastActivityDate(userData.lastActivity);
  }, [category, difficulty]);

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
    <div 
      className="relative min-h-[600px] p-8 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl"
      style={{
        backgroundImage: `url('/lovable-uploads/571c438b-0794-48be-a7fa-79006828e14c.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-green-800 capitalize">
        {difficulty} {category} Journey
      </h2>
      
      <div className="relative">
        {levels.map((level, index) => (
          <Collapsible
            key={level.id}
            open={openLevel === level.id}
            onOpenChange={() => setOpenLevel(openLevel === level.id ? null : level.id)}
          >
            <div 
              className={`absolute transition-all duration-300 ${getPositionClass(index)}`}
            >
              <CollapsibleTrigger asChild>
                <Button
                  className={`
                    w-16 h-16 rounded-full relative 
                    ${isLevelCompleted(level.id)
                      ? "bg-green-500 hover:bg-green-600"
                      : isLevelLocked(level.id, index)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"}
                    transform hover:scale-110 transition-transform
                    border-4 border-white shadow-lg
                  `}
                  disabled={isLevelLocked(level.id, index)}
                >
                  <span className="text-xl font-bold text-white">{level.id}</span>
                  {isLevelCompleted(level.id) && (
                    <div className="absolute -top-1 -right-1">
                      <div className="flex">
                        {[...Array(3)].map((_, i) => (
                          <span
                            key={i}
                            className="text-yellow-400 text-lg"
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="absolute z-10 mt-4 p-4 bg-white rounded-lg shadow-xl w-64 transform -translate-x-1/2 left-1/2">
                  <h3 className="font-bold mb-2">{level.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                  <p className="text-xs text-gray-500 mb-3">{level.duration}</p>
                  <Button
                    className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
                    onClick={() => startLevel(level.id)}
                    disabled={
                      isLevelLocked(level.id, index) || 
                      (!canStartNewLevel() && !isLevelCompleted(level.id))
                    }
                  >
                    {isLevelCompleted(level.id) ? "Review" : "Start"}
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

// Helper function to position levels on the map
const getPositionClass = (index: number): string => {
  const positions = [
    'top-[10%] left-[20%]',
    'top-[25%] left-[40%]',
    'top-[45%] right-[35%]',
    'top-[60%] left-[30%]',
    'bottom-[20%] right-[25%]',
    'bottom-[10%] left-[40%]'
  ];
  return positions[index] || '';
};

export default LevelProgression;
