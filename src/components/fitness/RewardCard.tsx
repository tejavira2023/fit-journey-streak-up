
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Coins } from "lucide-react";
import { useEffect, useState } from "react";

type RewardCardProps = {
  title: string;
  description: string;
  progress: number;
  total: number;
};

const RewardCard = ({ title, description, progress, total }: RewardCardProps) => {
  const [coins, setCoins] = useState(0);
  const percentage = (progress / total) * 100;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setCoins(userData.coins || 0);
  }, []);

  return (
    <Card className="w-full card-hover animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-400" />
            <span className="font-bold">{coins}</span>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
          <div 
            className="bg-fitness-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>{progress} / {total} completed</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      </CardContent>
      <CardFooter>
        {progress >= total ? (
          <Button 
            variant="outline" 
            className="w-full border-fitness-primary text-fitness-primary hover:bg-fitness-primary/10 button-bounce"
          >
            Claim Reward
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full hover-lift" 
            disabled
          >
            Keep Going
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
