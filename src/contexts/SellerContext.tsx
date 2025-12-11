import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface Seller {
  id: string;
  name: string;
  email: string;
  businessName: string;
}

interface SellerContextType {
  seller: Seller | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, businessName: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

export const SellerProvider = ({ children }: { children: ReactNode }) => {
  const [seller, setSeller] = useState<Seller | null>(null);

  useEffect(() => {
    const savedSeller = localStorage.getItem("currentSeller");
    const token = localStorage.getItem("sellerToken");
    if (savedSeller && token) {
      try {
        setSeller(JSON.parse(savedSeller));
      } catch (error) {
        localStorage.removeItem("currentSeller");
        localStorage.removeItem("sellerToken");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/sellers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSeller(data.seller);
        localStorage.setItem("currentSeller", JSON.stringify(data.seller));
        localStorage.setItem("sellerToken", data.token);
        toast.success("Login successful!");
        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error");
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    businessName: string
  ): Promise<boolean> => {
    try {
      if (!name.trim() || !businessName.trim()) {
        toast.error("All fields are required");
        return false;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }

      const response = await fetch(`${API_URL}/sellers/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, businessName }),
      });

      const data = await response.json();

      if (response.ok) {
        setSeller(data.seller);
        localStorage.setItem("currentSeller", JSON.stringify(data.seller));
        localStorage.setItem("sellerToken", data.token);
        toast.success("Signup successful!");
        return true;
      } else {
        toast.error(data.message || "Signup failed");
        return false;
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Network error");
      return false;
    }
  };

  const logout = () => {
    setSeller(null);
    localStorage.removeItem("currentSeller");
    localStorage.removeItem("sellerToken");
    toast.success("Logged out successfully");
  };

  return (
    <SellerContext.Provider
      value={{
        seller,
        login,
        signup,
        logout,
        isAuthenticated: !!seller,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error("useSeller must be used within SellerProvider");
  }
  return context;
};
