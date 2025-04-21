import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleIcon, CheckCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

type LevelProgressionProps = {
  category: string;
  difficulty: string;
};

const getLevels = (category: string, difficulty: string) => {
  // In a real app, this would be fetched from a backend
  return [
    {
      id: 1,
      title: `Daily ${category} Exercise`,
      description: "Complete this exercise once per day",
      duration: "15 min",
      isDaily: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      id: 2,
      title: `${difficulty} ${category} - Level 2`,
      description: "Building on fundamentals",
      duration: "20 min",
      isDaily: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      id: 3,
      title: `${difficulty} ${category} - Level 3`,
      description: "Advanced techniques",
      duration: "25 min",
      isDaily: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
  ];
};

const LevelProgression = ({ category, difficulty }: LevelProgressionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const canStartNewLevel = (isDaily: boolean) => {
    if (!lastActivityDate || !isDaily) return true;
    
    const today = new Date().toDateString();
    const lastActivity = new Date(lastActivityDate).toDateString();
    
    return today !== lastActivity;
  };

  const startLevel = (levelId: number, isDaily: boolean) => {
    if (!canStartNewLevel(isDaily)) {
      toast({
        title: "Daily Exercise Limit Reached",
        description: "You've already completed today's exercise. Come back tomorrow!",
        variant: "destructive",
      });
      return;
    }
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

  const getPositionClass = (index: number, totalLevels: number): string => {
    // Creates a zig-zag path that works well regardless of the number of levels
    switch (index % 4) {
      case 0: // Left side
        return `top-[${10 + (index * 25)}%] left-[25%]`;
      case 1: // Right side
        return `top-[${10 + (index * 25)}%] right-[25%]`;
      case 2: // Middle-left
        return `top-[${10 + (index * 25)}%] left-[40%]`;
      case 3: // Middle-right
        return `top-[${10 + (index * 25)}%] right-[40%]`;
      default:
        return '';
    }
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
      
      <div className="relative flex flex-col items-center">
        <div className="absolute z-0 w-[4px] bg-gray-300 h-[70%] left-1/2 transform -translate-x-1/2 top-[15%]"></div>
        
        <div className="relative w-full h-[500px]">
          {levels.map((level, index) => (
            <Collapsible
              key={level.id}
              open={openLevel === level.id}
              onOpenChange={() => setOpenLevel(openLevel === level.id ? null : level.id)}
            >
              <div 
                className={`absolute transition-all duration-300 ${getPositionClass(index, levels.length)}`}
              >
                <CollapsibleTrigger asChild>
                  <div className="relative">
                    <Button
                      className={`
                        w-16 h-16 rounded-full relative z-10
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
                      {isLevelLocked(level.id, index) ? (
                        <Lock className="h-6 w-6 text-white" />
                      ) : isLevelCompleted(level.id) ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <span className="text-xl font-bold text-white">{level.id}</span>
                      )}
                    </Button>
                    {level.isDaily && (
                      <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full px-2 py-1 text-xs font-bold text-white">
                        Daily
                      </div>
                    )}
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="absolute z-20 mt-4 p-4 bg-white rounded-lg shadow-xl w-64 transform -translate-x-1/2 left-1/2">
                    <h3 className="font-bold mb-2">{level.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                    <p className="text-xs text-gray-500 mb-3">{level.duration}</p>
                    <Button
                      className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
                      onClick={() => startLevel(level.id, level.isDaily)}
                      disabled={
                        isLevelLocked(level.id, index) || 
                        (!canStartNewLevel(level.isDaily) && !isLevelCompleted(level.id))
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
    </div>
  );
};

export default LevelProgression;
