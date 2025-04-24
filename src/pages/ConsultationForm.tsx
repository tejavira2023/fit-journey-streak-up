
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ConsultationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [goals, setGoals] = useState("");
  const [concerns, setConcerns] = useState("");
  const [bookingInfo, setBookingInfo] = useState({
    consultantName: "",
    bookingDate: "",
    bookingTime: ""
  });
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    console.log("Consultation form opened, location state:", location.state);
    
    // Get booking info from state or localStorage
    if (location.state?.consultantName) {
      setBookingInfo({
        consultantName: location.state.consultantName,
        bookingDate: location.state.bookingDate || "",
        bookingTime: location.state.bookingTime || ""
      });
    } else {
      // Try to get from localStorage as fallback
      const storedBooking = localStorage.getItem("consultationBooking");
      if (storedBooking) {
        try {
          const booking = JSON.parse(storedBooking);
          setBookingInfo({
            consultantName: booking.consultantName || "the consultant",
            bookingDate: booking.date ? new Date(booking.date).toLocaleDateString() : "",
            bookingTime: booking.slot || ""
          });
          console.log("Retrieved booking from localStorage:", booking);
        } catch (error) {
          console.error("Error parsing booking data:", error);
          toast.error("Error loading booking information");
        }
      } else {
        // No booking info, redirect back to consult page
        console.warn("No booking information found");
        toast.error("No booking information found. Please select a consultant first.");
        setTimeout(() => navigate("/consult"), 1000);
      }
    }
  }, [navigate, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goals.trim() || !concerns.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Store consultation details
    const consultationData = {
      consultantName: bookingInfo.consultantName,
      bookingDate: bookingInfo.bookingDate,
      bookingTime: bookingInfo.bookingTime,
      goals: goals,
      concerns: concerns,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem("consultationData", JSON.stringify(consultationData));
    console.log("Consultation data saved:", consultationData);
    
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
            {(bookingInfo.bookingDate || bookingInfo.bookingTime) && (
              <div className="text-sm text-gray-500 mt-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Your session with <strong>{bookingInfo.consultantName}</strong> 
                  {bookingInfo.bookingDate && ` on ${bookingInfo.bookingDate}`}
                  {bookingInfo.bookingTime && ` at ${bookingInfo.bookingTime}`}
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goals">What are your fitness goals?</Label>
                <Textarea
                  id="goals"
                  placeholder={`Tell ${bookingInfo.consultantName || 'your consultant'} about what you want to achieve...`}
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
