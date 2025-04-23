
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === "signup" && formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
      }

      if (type === "login") {
        // Login flow with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) {
          console.error("Login error:", error);
          toast.error(error.message || "Failed to log in");
        } else if (data?.session) {
          toast.success("Logged in successfully!");
          navigate("/home", { replace: true });
        }
      } else {
        // Signup flow with Supabase
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              email: formData.email,
            },
          }
        });
        
        if (error) {
          console.error("Signup error:", error);
          toast.error(error.message || "Failed to create account");
        } else if (data?.user) {
          toast.success("Account created successfully!");
          // Automatically log them in after signup
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
          
          if (signInError) {
            console.error("Auto-login error:", signInError);
            toast.error("Account created but couldn't log in automatically. Please log in.");
            navigate("/login", { replace: true });
          } else {
            navigate("/home", { replace: true });
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
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
                disabled={loading}
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
                  disabled={loading}
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full mt-4 bg-fitness-primary hover:bg-fitness-primary/90"
              disabled={loading}
            >
              {loading
                ? type === "login"
                  ? "Signing In..."
                  : "Signing Up..."
                : type === "login"
                ? "Sign In"
                : "Sign Up"}
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
                type="button"
                disabled={loading}
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
                type="button"
                disabled={loading}
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
