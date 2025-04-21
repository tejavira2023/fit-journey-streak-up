
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

const ConsultationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [goals, setGoals] = useState("");
  const [concerns, setConcerns] = useState("");
  const consultantName = location.state?.consultantName || "the consultant";
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goals.trim() || !concerns.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Consultation request sent successfully!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/consult")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">
            Schedule Consultation
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <Card className="max-w-2xl mx-auto animate-fade-in">
          <CardHeader>
            <CardTitle>Tell us about your fitness journey</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goals">What are your fitness goals?</Label>
                <Textarea
                  id="goals"
                  placeholder={`Tell ${consultantName} about what you want to achieve...`}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="concerns">Any specific concerns or limitations?</Label>
                <Textarea
                  id="concerns"
                  placeholder="Share any health concerns, injuries, or limitations..."
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
              >
                Submit Consultation Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ConsultationForm;
