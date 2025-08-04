import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useGlobalContext } from "@/context/GlobalContext";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import logo from "@/assets/you_logo.png";
import google from "@/assets/google.png";
import toast from "react-hot-toast";

function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuthUser } = useGlobalContext();
  const {handleGoogleLogin} = useGoogleAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async() => {
    if(!username || !password) {
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/signup`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username,password }), 
      });

      const userdata = await res.json();

      if(userdata.error) {
        throw new Error(userdata.error);
      }
      localStorage.setItem("you-user", JSON.stringify(userdata));
      setAuthUser(userdata);
      navigate('/learn');
      
    } catch(error) {
      if(error instanceof Error) {
        toast.error(error.message);
      }
    }
  }
  return (
    <div className="flex items-center justify-center p-4 mt-20 pt-10 mb-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-8 h-8 mix-blend-multiply" />
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create an account
          </h1>
          <p className="text-gray-600">
            Let's get you learning journey started.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Google Sign Up Button */}
          <Button
            variant="outline"
            className="w-full h-12 bg-white border border-gray-300 hover:bg-gray-50 flex gap-3.5 cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <img src={google} alt="Google logo" className="size-4" />
            <p>Sign up with Google</p>
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 bg-white border-gray-300 placeholder:text-gray-500"
            />
          </div>

          {/* Password Input */}

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-white border-gray-300 placeholder:text-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Sign Up Button */}
          <Button 
          className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white cursor-pointer"
          onClick={handleSignup}
          >
            Sign Up
          </Button>

          {/* Sign In Link */}
          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-gray-900 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
