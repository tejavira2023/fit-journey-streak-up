
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConsultCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="w-full bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 card-hover animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 icon-spin text-fitness-primary" />
          Personal Consultation
        </CardTitle>
        <CardDescription>
          Get personalized advice from our fitness experts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Our fitness specialists can help you create a customized plan based on your goals, health status and preferences.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-fitness-primary hover:bg-fitness-primary/90 button-bounce"
          onClick={() => navigate("/consult")}
        >
          Schedule Consultation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConsultCard;
