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
import { getAvatarImg } from "./levelAvatars";

type LevelProgressionProps = {
  category: string;
  difficulty: string;
};

const getLevels = (category: string, difficulty: string) => {
  return [
    {
      id: 1,
      title: `Daily ${category} Exercise`,
      description: "Complete this exercise once per day",
      duration: "15 min",
      isDaily: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: `${difficulty} ${category} - Level 2`,
      description: "Advanced techniques - Available tomorrow",
      duration: "20 min",
      isDaily: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      locked: true
    },
    {
      id: 3,
      title: `${difficulty} ${category} - Level 3`,
      description: "Expert techniques - Available later",
      duration: "25 min",
      isDaily: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      locked: true
    },
  ];
};

const LevelProgression = ({ category, difficulty }: LevelProgressionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [levels, setLevels] = useState<any[]>([]);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [lastActivityDates, setLastActivityDates] = useState<Record<string, string>>({});
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  useEffect(() => {
    setLevels(getLevels(category, difficulty));
    
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setCompletedLevels(userData.completedLevels || []);
    setLastActivityDates(userData.lastActivityDates || {});
  }, [category, difficulty]);

  const canStartLevel = (levelId: number, category: string) => {
    if (levelId !== 1) return false; // Only level 1 is available
    
    const lastActivityDate = lastActivityDates[category];
    if (!lastActivityDate) return true;
    
    const today = new Date().toDateString();
    const lastActivity = new Date(lastActivityDate).toDateString();
    
    return today !== lastActivity;
  };

  const startLevel = (levelId: number) => {
    if (!canStartLevel(levelId, category)) {
      toast({
        title: "Daily Exercise Limit Reached",
        description: `You've already completed today's ${category} exercise. Try a different category or come back tomorrow!`,
        variant: "destructive",
      });
      return;
    }
    
    // Update last activity date for this category
    const newLastActivityDates = {
      ...lastActivityDates,
      [category]: new Date().toISOString()
    };
    
    // Update localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    userData.lastActivityDates = newLastActivityDates;
    localStorage.setItem("userData", JSON.stringify(userData));
    
    setLastActivityDates(newLastActivityDates);
    
    // Navigate to the level
    navigate(`/fitness/${category.toLowerCase()}/${difficulty.toLowerCase()}/level/${levelId}`);
  };

  const isLevelCompleted = (levelId: number) => {
    return completedLevels.includes(`${category}-${difficulty}-${levelId}`);
  };

  const getPositionClass = (index: number): string => {
    switch (index % 4) {
      case 0:
        return `top-[${10 + (index * 25)}%] left-[25%]`;
      case 1:
        return `top-[${10 + (index * 25)}%] right-[25%]`;
      case 2:
        return `top-[${10 + (index * 25)}%] left-[40%]`;
      case 3:
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
                className={`absolute transition-all duration-300 ${getPositionClass(index)}`}
              >
                <CollapsibleTrigger asChild>
                  <div className="relative flex flex-col items-center">
                    <Button
                      className={`
                        w-20 h-20 rounded-full relative z-10 flex items-center justify-center p-0 overflow-hidden
                        ${isLevelCompleted(level.id)
                          ? "bg-green-500 hover:bg-green-600"
                          : level.locked
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"}
                        transform hover:scale-110 transition-transform
                        border-4 border-white shadow-lg
                      `}
                      disabled={level.locked}
                    >
                      <img
                        src={getAvatarImg(category, level.id)}
                        alt={`Avatar for level ${level.id}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                      {level.locked ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Lock className="h-8 w-8 text-white" />
                        </div>
                      ) : isLevelCompleted(level.id) ? (
                        <CheckCircle className="absolute bottom-2 right-2 h-6 w-6 text-white drop-shadow" />
                      ) : null}
                    </Button>
                    {level.id === 1 && (
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
                    {level.id === 1 && (
                      <Button
                        className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
                        onClick={() => startLevel(level.id)}
                        disabled={!canStartLevel(level.id, category)}
                      >
                        {isLevelCompleted(level.id) ? "Review" : "Start"}
                      </Button>
                    )}
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
