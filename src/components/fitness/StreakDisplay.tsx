
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

const StreakDisplay = () => {
  const [userData, setUserData] = useState({
    streak: 0,
    lastActivityDate: "",
    completedLevels: [] as string[],
    coins: 0
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    // Set up an interval to check for updates
    const interval = setInterval(() => {
      const latestData = localStorage.getItem("userData");
      if (latestData) {
        const parsedData = JSON.parse(latestData);
        if (parsedData.streak !== userData.streak || 
            parsedData.coins !== userData.coins ||
            parsedData.completedLevels?.length !== userData.completedLevels?.length) {
          setUserData(parsedData);
        }
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [userData.streak, userData.coins, userData.completedLevels?.length]);

  return (
    <Card className="w-full card-hover animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-fitness-warning icon-spin" />
          Your Current Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-fitness-primary hover-lift">
            {userData.streak || 0} {userData.streak === 1 ? 'day' : 'days'}
          </div>
          <div className="text-sm text-gray-500">
            {userData.streak >= 7 ? '🔥 On fire!' : 'Keep going!'}
          </div>
        </div>
        <Progress value={((userData.streak || 0) % 7) * (100/7)} className="h-2 transition-all duration-1000 ease-out" />
        <p className="text-xs text-gray-500 mt-2">
          {7 - ((userData.streak || 0) % 7)} more {(7 - ((userData.streak || 0) % 7)) === 1 ? 'day' : 'days'} until your next milestone
        </p>
      </CardContent>
    </Card>
  );
};

export default StreakDisplay;
