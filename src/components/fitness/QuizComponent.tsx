
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type QuizComponentProps = {
  category: string;
  difficulty: string;
  levelId: number;
  onComplete: () => void;
};

const QuizComponent = ({ category, difficulty, levelId, onComplete }: QuizComponentProps) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Generate quiz questions based on the category, difficulty, and level
  const questions: QuizQuestion[] = [
    {
      question: `What is the most important aspect of ${category}?`,
      options: ["Consistency", "Intensity", "Speed", "Eating right"],
      correctAnswer: 0,
    },
    {
      question: `How often should you practice ${category} at ${difficulty} level?`,
      options: ["Daily", "3-4 times per week", "Once a week", "Twice a month"],
      correctAnswer: 1,
    },
    {
      question: `What is a common mistake beginners make in ${category}?`,
      options: [
        "Pushing too hard",
        "Not warming up properly",
        "Ignoring proper form",
        "All of the above",
      ],
      correctAnswer: 3,
    },
  ];

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      toast.error("Please select an answer");
      return;
    }

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Mark this level as completed
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const completedLevels = userData.completedLevels || [];
      const levelKey = `${category}-${difficulty}-${levelId}`;
      
      if (!completedLevels.includes(levelKey)) {
        completedLevels.push(levelKey);
        userData.completedLevels = completedLevels;
        
        // Update streak
        const today = new Date();
        const lastActivity = userData.lastActivity ? new Date(userData.lastActivity) : null;
        
        // Check if this is a new day compared to the last activity
        if (!lastActivity || today.toDateString() !== lastActivity.toDateString()) {
          userData.streak = (userData.streak || 0) + 1;
          userData.lastActivity = today.toISOString();
        }
        
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      
      onComplete();
    }
  };

  const handleReturnHome = () => {
    navigate("/home");
  };

  const handleRetry = () => {
    navigate(`/fitness/${category.toLowerCase()}/${difficulty.toLowerCase()}`);
  };

  if (quizCompleted) {
    const passedQuiz = score >= Math.ceil(questions.length / 2);
    
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className={passedQuiz ? "text-green-600" : "text-red-600"}>
            Quiz {passedQuiz ? "Passed!" : "Failed"}
          </CardTitle>
          <CardDescription>
            You scored {score} out of {questions.length} questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-4 text-center">
            <h3 className="text-lg font-semibold mb-2">
              {passedQuiz 
                ? "Great job! Level completed." 
                : "Don't worry, you can try again!"}
            </h3>
            <p className="text-gray-500">
              {passedQuiz 
                ? "Keep up the good work and continue your fitness journey." 
                : "Review the material and try the quiz again when you're ready."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 justify-between">
          <Button variant="outline" onClick={handleRetry}>
            {passedQuiz ? "Next Level" : "Try Again"}
          </Button>
          <Button onClick={handleReturnHome}>Return Home</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Level {levelId} Quiz</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-4">
            {questions[currentQuestion].question}
          </h3>
          <RadioGroup
            value={selectedOption !== null ? selectedOption.toString() : undefined}
            onValueChange={(value) => setSelectedOption(parseInt(value))}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNextQuestion} className="w-full">
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizComponent;
