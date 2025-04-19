
import AuthForm from "@/components/auth/AuthForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-fitness-light to-fitness-accent/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-fitness-primary">FitJourney</h1>
          <p className="text-gray-600">Begin your transformation journey</p>
        </div>
        <AuthForm type="signup" />
      </div>
    </div>
  );
};

export default Signup;
