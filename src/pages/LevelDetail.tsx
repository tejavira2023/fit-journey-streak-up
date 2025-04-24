
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import QuizComponent from "@/components/fitness/QuizComponent";
import { useToast } from "@/hooks/use-toast";
import { Coins } from "lucide-react";

const LevelDetail = () => {
  const { category, difficulty, levelId } = useParams();
  const navigate = useNavigate();
  const [levelCompleted, setLevelCompleted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Validate parameters
    if (!category || !difficulty || !levelId) {
      navigate("/fitness");
      return;
    }
  }, [navigate, category, difficulty, levelId]);

  const handleLevelComplete = () => {
    setLevelCompleted(true);
    
    // Show notification to do quiz
    toast({
      title: "Workout Complete!",
      description: "Now complete the quiz to earn your reward."
    });
  };

  const handleQuizComplete = () => {
    // Update user progress in localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    
    // Update completed levels
    const levelKey = `${category}-${difficulty}-${levelId}`;
    if (!userData.completedLevels) {
      userData.completedLevels = [];
    }
    if (!userData.completedLevels.includes(levelKey)) {
      userData.completedLevels.push(levelKey);
    }
    
    // Update streak
    const today = new Date().toDateString();
    const lastDate = userData.lastActivityDate || "";
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    if (!userData.streak) {
      userData.streak = 1;
    } else if (lastDate === yesterdayString || lastDate === today) {
      userData.streak += 1;
    } else if (lastDate !== today) {
      userData.streak = 1;
    }
    
    userData.lastActivityDate = today;
    
    // Update coins
    if (!userData.coins) {
      userData.coins = 0;
    }
    userData.coins += 10;
    
    // Save updated data
    localStorage.setItem("userData", JSON.stringify(userData));
    
    toast({
      title: "Level Completed!",
      description: "You've earned 10 coins for completing this level.",
    });
    
    // Navigate back to category page after delay
    setTimeout(() => {
      navigate(`/fitness/${category}/${difficulty}`);
    }, 2000);
  };

  if (!category || !difficulty || !levelId) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(`/fitness/${category}/${difficulty}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2 capitalize">
            {difficulty} {category} - Level {levelId}
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Training Video
            </h2>
            <div className="aspect-video bg-gray-200 mb-4 rounded-md flex items-center justify-center">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title={`${category} Training - Level ${levelId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-600 mb-6">
              Follow along with the video to complete this level. Once you're done, take the quiz to mark your progress.
            </p>
            
            {!levelCompleted ? (
              <Button 
                className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
                onClick={handleLevelComplete}
              >
                I've completed this workout
              </Button>
            ) : (
              <div className="flex items-center justify-center text-green-600 py-2">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Great job! Now complete the quiz below.</span>
              </div>
            )}
          </div>
        </div>
        
        {levelCompleted && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Level Completion Quiz</h2>
            <QuizComponent 
              category={category} 
              difficulty={difficulty}
              levelId={parseInt(levelId)}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default LevelDetail;
