

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm your AI Fitness Assistant. Ask me for a personal diet chart or a fitness plan to help you reach your ideal body. Share your age, gender, height, weight, and goal for best results.",
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

    // Collect user data for response
    let profile = {
      goal: "lose-weight",
      name: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
    };
    try {
      if (localStorage.getItem("userProfileData")) {
        profile = { ...profile, ...JSON.parse(localStorage.getItem("userProfileData") || "{}") };
      }
    } catch {}

    setTimeout(() => {
      let aiResponse = "";

      const lower = input.toLowerCase();

      if (
        lower.includes("diet chart") ||
        lower.includes("meal plan") ||
        lower.includes("food plan") ||
        lower.includes("diet plan")
      ) {
        aiResponse = generateDietChart(profile);
      } else if (
        lower.includes("plan") ||
        lower.includes("routine") ||
        lower.includes("workout") ||
        lower.includes("body") ||
        lower.includes("achieve") ||
        lower.includes("fitness plan")
      ) {
        aiResponse = generateFitnessPlan(profile);
      } else if (
        lower.includes("hello") ||
        lower.includes("hi") ||
        lower.includes("help")
      ) {
        aiResponse =
          "Hello! Ask me for a custom diet chart or fitness plan by sharing your details or your ideal body goal.";
      } else {
        aiResponse =
          "I can create a diet chart or fitness/health plan for you to achieve your dream body! Kindly tell me your current age, gender, height, weight, and your goal (e.g. gain weight, lose fat, muscle gain, yoga, etc).";
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1600);
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
          AI Assistant
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
            placeholder="Ask for a diet chart or a fitness plan..."
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

// Helper: returns a simple diet chart string based on profile.
function generateDietChart(profile: any): string {
  let chart = "";
  switch (profile.goal) {
    case "gain-weight":
      chart = `Here's a sample calorie-surplus diet chart for gaining weight:
- Breakfast: Peanut butter toast + Eggs + Banana + Milk
- Snack: Dried fruits + Greek yogurt
- Lunch: Rice + Chicken or Paneer + Dal + Vegetables
- Snack: Granola bar + Fruit smoothie
- Dinner: Pasta or Parathas + Paneer/Chicken/Fish + Veggies
- Before Bed: Glass of milk or protein shake.

Aim to eat every 3 hours and include healthy fats (nuts, seeds, ghee).`;
      break;

    case "lose-weight":
      chart = `Here's a calorie-deficit diet chart for losing weight:
- Breakfast: Oats with berries + 1 boiled egg
- Snack: Apple or handful of nuts
- Lunch: Grilled chicken or tofu + Salad + Brown rice
- Snack: Roasted chana or green tea
- Dinner: Stir-fried veggies + Soup + Small portion rice/roti

Drink lots of water and avoid sugary snacks or drinks.`;
      break;

    case "yoga":
      chart = `For a yoga lifestyle:
- Breakfast: Fresh fruit + Herbal tea
- Snack: Mixed seeds and nuts
- Lunch: Vegetable khichdi or daal rice + salad
- Snack: Coconut water + sprouts
- Dinner: Light vegetable soup or sautéed veggies + chapati

Eat light, mostly plant foods, and avoid overeating.`;
      break;

    case "meditation":
      chart = `For a meditation-focused lifestyle:
- Breakfast: Oats with nuts and honey
- Snack: Herbal tea + fruit
- Lunch: Lentils (dal), brown rice, lightly steamed veggies
- Snack: Seeds, dates, or fruit
- Dinner: Vegetable soup, khichdi, or salad

Avoid heavy, spicy or processed food for better focus.`;
      break;

    default:
      chart = `Here's a general balanced diet:
- Breakfast: Oats or whole-grain bread + eggs/tofu
- Snack: Fresh fruit or nuts
- Lunch: Rice/roti + dal + vegetables + salad
- Snack: Yogurt or sprouts
- Dinner: Light meal like soup + chapati/roti + veggies

Let me know your specific goal for a custom chart!`;
  }
  return chart;
}

// Helper: returns a sample weekly fitness plan string based on profile.
function generateFitnessPlan(profile: any): string {
  switch (profile.goal) {
    case "gain-weight":
      return `Here's a 1-week beginner muscle-building plan:
Day 1: Full body strength (push ups, squats, lunges, plank)
Day 2: Rest or gentle walk
Day 3: Upper body & core (rows, shoulder press, crunches)
Day 4: Rest or light yoga
Day 5: Lower body (deadlifts, calf raises, wall sit)
Day 6: Cardio 20 mins + core
Day 7: Rest

Focus on progressively lifting heavier and eat in a surplus diet.`;
    case "lose-weight":
      return `Here's a 1-week weight loss plan:
Day 1: Cardio 30 mins (running/cycling)
Day 2: Strength (pushups, squats, lunges)
Day 3: Cardio 20 mins + core
Day 4: Low-impact activity (walk/yoga)
Day 5: Strength (upper body)
Day 6: Cardio + legs
Day 7: Rest

Consistency + calorie deficit diet is key!`;

    case "yoga":
      return `Here's a 1-week yoga and mindfulness plan:
Day 1: Sun salutations, gentle stretching
Day 2: Hatha yoga 30 mins
Day 3: Mindful breathing + meditation
Day 4: Restorative yoga
Day 5: Power yoga or vinyasa
Day 6: Meditation & reflection
Day 7: Light movement & journaling

Let me know if you want a more detailed yoga schedule!`;

    case "meditation":
      return `Basic 7-day meditation plan:
Day 1: 10 mins body scan meditation
Day 2: 10 mins mindful breathing
Day 3: 15 mins guided meditation
Day 4: Walking meditation 10 mins
Day 5: 15 mins gratitude meditation
Day 6: 20 mins visualization practice
Day 7: Choose your favourite

Try to meditate at the same time each day!`;

    default:
      return `Here's a general weekly plan:
Day 1: Cardio + strength
Day 2: Core + flexibility
Day 3: Active rest (walk/yoga)
Day 4: Upper body strength
Day 5: Cardio or HIIT
Day 6: Lower body strength
Day 7: Rest

Let me know your goal for a custom plan!`;
  }
}

export default AIChat;

