
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type DifficultySelectorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryType: string;
};

const DifficultySelector = ({ open, onOpenChange, categoryType }: DifficultySelectorProps) => {
  const navigate = useNavigate();
  
  const handleDifficultySelect = (difficulty: string) => {
    navigate(`/fitness/${categoryType.toLowerCase()}/${difficulty.toLowerCase()}`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Difficulty</DialogTitle>
          <DialogDescription>
            Select a difficulty level based on your experience with {categoryType.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            className="flex items-center py-6 bg-green-100 hover:bg-green-200 text-green-800 justify-start px-4"
            variant="outline"
            onClick={() => handleDifficultySelect("easy")}
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-lg">Easy</span>
              <span className="text-sm">Best for beginners and those starting out</span>
            </div>
          </Button>
          
          <Button 
            className="flex items-center py-6 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 justify-start px-4"
            variant="outline"
            onClick={() => handleDifficultySelect("intermediate")}
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-lg">Intermediate</span>
              <span className="text-sm">For those with some experience</span>
            </div>
          </Button>
          
          <Button 
            className="flex items-center py-6 bg-red-100 hover:bg-red-200 text-red-800 justify-start px-4"
            variant="outline"
            onClick={() => handleDifficultySelect("hard")}
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-lg">Hard</span>
              <span className="text-sm">Challenging workouts for experienced users</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DifficultySelector;
