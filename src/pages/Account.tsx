import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import AIChat from "@/components/fitness/AIChat";

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    weight: "",
    height: "",
    goal: "lose-weight",
    problem: ""
  });
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    const userData = localStorage.getItem("userProfileData");
    if (userData) {
      let data = JSON.parse(userData);
      setFormData({ ...{
        name: "",
        age: "",
        gender: "male",
        weight: "",
        height: "",
        goal: "lose-weight",
        problem: ""
      }, ...data });
    }
  }, [navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    localStorage.setItem("userProfileData", JSON.stringify(formData));
    
    toast({
      title: "Profile Updated",
      description: "Your account information has been saved.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">My Account</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter your age"
                        min="1"
                        max="120"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="Enter your weight"
                        min="20"
                        max="300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="Enter your height"
                        min="100"
                        max="250"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="goal">Fitness Goal</Label>
                      <Select value={formData.goal} onValueChange={(value) => handleSelectChange("goal", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose-weight">Lose Weight</SelectItem>
                          <SelectItem value="gain-weight">Gain Weight</SelectItem>
                          <SelectItem value="build-muscle">Build Muscle</SelectItem>
                          <SelectItem value="improve-flexibility">Improve Flexibility</SelectItem>
                          <SelectItem value="reduce-stress">Reduce Stress</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="problem">Is there any problem you are facing and want to solve from our app?</Label>
                    <textarea
                      id="problem"
                      name="problem"
                      value={formData.problem}
                      onChange={handleInputChange}
                      placeholder="Describe here (e.g. lose weight, back pain, improve posture...)"
                      className="w-full min-h-[80px] mt-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-fitness-primary text-sm"
                    />
                  </div>
                  
                  <Button type="submit" className="bg-fitness-primary hover:bg-fitness-primary/90">
                    <Save className="mr-2 h-4 w-4" /> Save Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <AIChat />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
