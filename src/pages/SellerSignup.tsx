import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSeller } from "@/contexts/SellerContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, User, Briefcase, Mail, Lock } from "lucide-react";

export default function SellerSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useSeller();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await signup(name, email, password, businessName);
    if (success) {
      navigate("/seller-dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-600 text-white p-3 rounded-full">
              <Store className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Become a Seller</CardTitle>
          <CardDescription className="text-center">
            Create your account and start selling eco-friendly products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Business Name
              </label>
              <Input
                id="businessName"
                type="text"
                placeholder="Your Eco Business"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seller@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-green-200 focus:border-green-500"
              />
              <p className="text-xs text-gray-500">Minimum 6 characters</p>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm space-y-2">
            <div>
              Already have an account?{" "}
              <Link to="/seller-login" className="text-green-600 hover:underline font-semibold">
                Login
              </Link>
            </div>
            <div>
              <Link to="/" className="text-gray-600 hover:underline text-xs">
                Back to store
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
