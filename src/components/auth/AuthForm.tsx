
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

type AuthFormProps = {
  type: "login" | "signup";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "signup" && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // In a real app, we would call an API to authenticate the user.
    // For now, we'll just show a success message and navigate to the home page.
    
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", formData.email);
    
    if (type === "signup") {
      // Initialize user data for new users
      const userData = {
        streak: 0,
        lastActivity: null,
        completedLevels: [],
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Account created successfully!");
    } else {
      toast.success("Logged in successfully!");
    }
    
    navigate("/home");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-fitness-primary">
          {type === "login" ? "Welcome Back" : "Create an Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {type === "login" 
            ? "Enter your credentials to access your account" 
            : "Sign up to start your fitness journey"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {type === "signup" && (
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full mt-4 bg-fitness-primary hover:bg-fitness-primary/90"
            >
              {type === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-center text-gray-500 mt-2">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-fitness-primary hover:text-fitness-accent"
                onClick={() => navigate("/signup")}
              >
                Create one
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-fitness-primary hover:text-fitness-accent"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
