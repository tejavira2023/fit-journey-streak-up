import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import ConsultBookButton from "@/components/consult/ConsultBookButton";

const Consult = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);
  
  const handleSchedule = (consultantName: string) => {
    navigate("/consultation-form", { 
      state: { consultantName } 
    });
  };
  
  const consultants = [
    {
      name: "Sarah Johnson",
      specialty: "Weight Loss & Nutrition",
      availability: "Mondays & Wednesdays",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop"
    },
    {
      name: "Mike Chen",
      specialty: "Strength Training",
      availability: "Tuesdays & Thursdays",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop"
    },
    {
      name: "Emily Rodriguez",
      specialty: "Yoga & Meditation",
      availability: "Weekends",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">
            Schedule Consultation
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Our Fitness Experts</h2>
          <p className="text-gray-600">
            Choose a fitness consultant to help you achieve your goals
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {consultants.map((consultant, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{consultant.name}</CardTitle>
                    <CardDescription>{consultant.specialty}</CardDescription>
                  </div>
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={consultant.image} 
                      alt={consultant.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Available: {consultant.availability}</span>
                </div>
              </CardContent>
              <CardFooter>
                <ConsultBookButton consultant={consultant} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Consult;
