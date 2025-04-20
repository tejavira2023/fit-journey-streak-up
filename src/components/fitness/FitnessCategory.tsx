
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
      className="fitness-card hover:bg-fitness-primary/5 animate-fade-in card-hover animate-pulse-scale"
      onClick={onClick}
    >
      <div className="rounded-full bg-fitness-primary/10 p-3 mb-2 transition-transform duration-300 group-hover:rotate-12">
        <Icon className="h-8 w-8 text-fitness-primary transition-colors duration-300 group-hover:text-fitness-primary/80" />
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Card>
  );
};

export default FitnessCategory;
