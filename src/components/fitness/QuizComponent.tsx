
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Coins } from "lucide-react";
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

function getLevelQuizQuestions(category: string, difficulty: string, levelId: number): QuizQuestion[] {
  // Placeholder logic: Video/exercise specific questions should be set per level
  // We can improve by passing video/exercise title/videoId from parent, but static for demo
  if (category.toLowerCase().includes("weight")) {
    if (levelId === 1) {
      return [
        {
          question: "What is the main focus in Level 1 'Lose Weight' video?",
          options: [
            "Introducing healthy habits & warm-up",
            "Advanced weight lifting",
            "Marathon running",
            "Yoga poses only"
          ],
          correctAnswer: 0
        },
        {
          question: "Which duration is the recommended workout time in the video?",
          options: ["10 min", "15 min", "30 min", "60 min"],
          correctAnswer: 1
        },
        {
          question: "What was a key tip mentioned by the trainer?",
          options: [
            "Eat a heavy meal before exercise",
            "Focus on consistency and form",
            "Skip the warm-up",
            "Use maximum weights from start"
          ],
          correctAnswer: 1
        }
      ]
    }
    if (levelId === 3) {
      return [
        {
          question: "Which bodyweight exercise is demonstrated in Level 3 video?",
          options: [
            "Squats",
            "Push-ups & lunges",
            "Bicep curls",
            "Skipping"
          ],
          correctAnswer: 1
        },
        {
          question: "How does the trainer advise you to track progress?",
          options: [
            "Skip tracking",
            "Only weigh monthly",
            "Measure daily calories and exercise logs",
            "Only do cardio"
          ],
          correctAnswer: 2
        },
        {
          question: "What is stressed as most important for results in the video?",
          options: [
            "Taking many supplements",
            "Sleeping less",
            "Combination of diet and exercise",
            "Running every day only"
          ],
          correctAnswer: 2
        }
      ];
    }
  }
  // Default questions
  return [
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
}

const QuizComponent = ({ category, difficulty, levelId, onComplete }: QuizComponentProps) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [rewarded, setRewarded] = useState(false);

  // Use new quiz question generator
  const questions: QuizQuestion[] = getLevelQuizQuestions(category, difficulty, levelId);

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

  // Award coins once after pass, and only after passing quiz
  const handleReward = () => {
    if (rewarded) return;
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const currentCoins = userData.coins || 0;
    const updatedUserData = {
      ...userData,
      coins: currentCoins + 5
    };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    toast.success(
      <div className="flex items-center gap-2">
        <Coins className="h-4 w-4 text-yellow-400" />
        <span>You earned 5 coins! 🏅</span>
      </div>,
      { duration: 4000 }
    );
    setRewarded(true);
  }

  const handleReturnHome = () => {
    navigate("/home");
  };

  const handleRetry = () => {
    navigate(`/fitness/${category.toLowerCase()}/${difficulty.toLowerCase()}`);
  };

  if (quizCompleted) {
    const passedQuiz = score >= Math.ceil(questions.length / 2);

    if (passedQuiz && !rewarded) {
      handleReward();
    }

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
                ? "Great job! You've earned your reward." 
                : "Don't worry, you can try again!"}
            </h3>
            <p className="text-gray-500">
              {passedQuiz 
                ? "Keep up the good work and continue your fitness journey." 
                : "Review the material and try the quiz again when you're ready."}
            </p>
            {passedQuiz && (
              <div className="mt-3 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-600 text-lg font-semibold">
                  <Coins className="h-5 w-5" />
                  5 Coins Earned!
                </div>
              </div>
            )}
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
