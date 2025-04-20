
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

const StreakDisplay = () => {
  const [userData, setUserData] = useState({
    streak: 0,
    lastActivity: null,
    completedLevels: [] as string[],
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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
            {userData.streak} {userData.streak === 1 ? 'day' : 'days'}
          </div>
          <div className="text-sm text-gray-500">
            {userData.streak >= 7 ? '🔥 On fire!' : 'Keep going!'}
          </div>
        </div>
        <Progress value={(userData.streak % 7) * (100/7)} className="h-2 transition-all duration-1000 ease-out" />
        <p className="text-xs text-gray-500 mt-2">
          {7 - (userData.streak % 7)} more {(7 - (userData.streak % 7)) === 1 ? 'day' : 'days'} until your next milestone
        </p>
      </CardContent>
    </Card>
  );
};

export default StreakDisplay;
