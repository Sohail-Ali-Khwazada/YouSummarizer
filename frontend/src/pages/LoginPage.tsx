import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import logo from "@/assets/you_logo.png";
import google from "@/assets/google.png";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = () => {
    console.log(email);
    console.log(password);
  };

  return (
    <div className="flex items-center justify-center p-4 mt-20 pt-10 mb-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-8 h-8 mix-blend-multiply" />
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
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
          >
            <img src={google} alt="Google logo" className="size-4" />
            <p>Continue with Google</p>
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
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleSignin}
          >
            Sign in
          </Button>

          {/* Sign In Link */}
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-gray-900 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
