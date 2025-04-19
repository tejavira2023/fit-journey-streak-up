
import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your fitness AI assistant. Ask me about diet recommendations or exercise routines based on your fitness goals.",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const userGoal = localStorage.getItem("userProfileData") 
        ? JSON.parse(localStorage.getItem("userProfileData") || "{}").goal
        : "lose-weight";
      
      let aiResponse = "";
      if (input.toLowerCase().includes("diet") || input.toLowerCase().includes("eat") || input.toLowerCase().includes("food")) {
        aiResponse = getDietRecommendation(userGoal);
      } else if (input.toLowerCase().includes("exercise") || input.toLowerCase().includes("workout") || input.toLowerCase().includes("routine")) {
        aiResponse = getExerciseRecommendation(userGoal);
      } else {
        aiResponse = "I can help you with diet and exercise recommendations based on your fitness goals. Just ask me about either diet plans or workout routines!";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        isUser: false,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-fitness-primary" />
          Fitness Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto px-4 pb-0">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-fitness-primary text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-3 pb-3">
        <form 
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about diet or exercises..."
            onKeyDown={handleKeyPress}
          />
          <Button 
            type="submit" 
            size="icon"
            className="bg-fitness-primary hover:bg-fitness-primary/90"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

// Helper functions for generating AI responses
function getDietRecommendation(goal: string): string {
  switch (goal) {
    case "lose-weight":
      return "For weight loss, focus on a calorie deficit with plenty of protein (lean meats, fish, tofu), fiber-rich vegetables, and complex carbs. Limit processed foods, sugary drinks, and alcohol. Aim for 500 calories less than your maintenance level and drink plenty of water.";
    case "gain-weight":
      return "To gain weight healthily, eat in a calorie surplus with nutrient-dense foods. Include protein (meat, eggs, dairy), complex carbs (rice, pasta, potatoes), healthy fats (nuts, avocados), and nutrient-rich vegetables. Try to eat more frequently throughout the day.";
    case "build-muscle":
      return "For muscle building, increase your protein intake to 1.6-2.2g per kg of body weight daily. Focus on complete proteins (meat, eggs, dairy), complex carbs for energy, and healthy fats. Time your protein intake around workouts for optimal muscle protein synthesis.";
    case "improve-flexibility":
      return "While diet doesn't directly improve flexibility, anti-inflammatory foods can help recovery. Include omega-3 rich foods (fish, walnuts, flaxseeds), colorful fruits and vegetables, and stay well-hydrated to keep joints and tissues healthy.";
    case "reduce-stress":
      return "For stress reduction, focus on foods that boost mood and reduce inflammation. Include omega-3 fats (salmon, walnuts), magnesium-rich foods (dark chocolate, nuts, seeds), complex carbs, and probiotic foods (yogurt). Limit caffeine and alcohol.";
    default:
      return "A balanced diet with adequate protein, complex carbohydrates, healthy fats, and plenty of fruits and vegetables will help you achieve your fitness goals. Adjust portions based on your specific calorie needs.";
  }
}

function getExerciseRecommendation(goal: string): string {
  switch (goal) {
    case "lose-weight":
      return "For weight loss, combine cardiovascular exercise (running, cycling, swimming) with strength training. Aim for 3-5 cardio sessions (30-60 minutes each) and 2-3 strength sessions weekly. High-Intensity Interval Training (HIIT) is particularly effective for fat loss.";
    case "gain-weight":
      return "To gain weight (particularly muscle), focus on resistance training with progressive overload. Target major muscle groups with compound exercises (squats, deadlifts, bench press) 3-4 times weekly. Limit cardio to maintain your calorie surplus.";
    case "build-muscle":
      return "For muscle building, focus on resistance training with progressive overload. Split your workouts by muscle groups (push/pull/legs or upper/lower) with 3-5 sets of 8-12 reps per exercise. Allow 48 hours for muscle recovery between training the same muscle group.";
    case "improve-flexibility":
      return "To improve flexibility, practice daily stretching routines or yoga. Hold static stretches for 30-60 seconds. Focus on problem areas, but maintain a full-body approach. Dynamic stretching before workouts and static stretching after is ideal.";
    case "reduce-stress":
      return "For stress reduction, try low-intensity activities like yoga, tai chi, walking in nature, or swimming. Add mindfulness practices like meditation. Aim for 30 minutes of activity most days, prioritizing enjoyment over intensity.";
    default:
      return "A balanced exercise program includes cardiovascular training, strength training, and flexibility work. Aim for at least 150 minutes of moderate activity weekly, with 2-3 strength sessions. Always include warm-ups and cool-downs.";
  }
}

export default AIChat;
