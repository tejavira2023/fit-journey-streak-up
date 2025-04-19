
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type FitnessCategoryProps = {
  icon: LucideIcon;
  name: string;
  description: string;
  onClick: () => void;
};

const FitnessCategory = ({ icon: Icon, name, description, onClick }: FitnessCategoryProps) => {
  return (
    <Card 
      className="fitness-card hover:bg-fitness-primary/5 animate-fade-in"
      onClick={onClick}
    >
      <div className="rounded-full bg-fitness-primary/10 p-3 mb-2">
        <Icon className="h-8 w-8 text-fitness-primary" />
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Card>
  );
};

export default FitnessCategory;
