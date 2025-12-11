import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface Admin {
  username: string;
  isAuthenticated: boolean;
}

interface AdminContextType {
  admin: Admin | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Admin credentials - you can change these
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    // Check for existing admin session on mount
    const savedAdmin = sessionStorage.getItem("currentAdmin");
    const isAdmin = sessionStorage.getItem("isAdmin");
    
    if (savedAdmin && isAdmin === "true") {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch (error) {
        sessionStorage.removeItem("currentAdmin");
        sessionStorage.removeItem("isAdmin");
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminData: Admin = {
        username,
        isAuthenticated: true,
      };
      
      setAdmin(adminData);
      sessionStorage.setItem("currentAdmin", JSON.stringify(adminData));
      sessionStorage.setItem("isAdmin", "true");
      toast.success("Admin login successful!");
      return true;
    } else {
      toast.error("Invalid admin credentials");
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    sessionStorage.removeItem("currentAdmin");
    sessionStorage.removeItem("isAdmin");
    toast.success("Logged out successfully");
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
