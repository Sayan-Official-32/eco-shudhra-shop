import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hash function
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const hashedPassword = await hashPassword(password);
      const usersData = localStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];

      const foundUser = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === hashedPassword
      );

      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        };
        setUser(userWithoutPassword);
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Validate inputs
      if (!name.trim()) {
        console.error("Name is required");
        return false;
      }
      
      if (!email.trim()) {
        console.error("Email is required");
        return false;
      }

      if (password.length < 6) {
        console.error("Password must be at least 6 characters");
        return false;
      }

      // Get existing users
      const usersData = localStorage.getItem("users");
      let users = [];
      
      try {
        users = usersData ? JSON.parse(usersData) : [];
      } catch (e) {
        console.error("Error parsing users data, resetting...");
        users = [];
      }

      // Ensure users is an array
      if (!Array.isArray(users)) {
        users = [];
      }

      // Check if email already exists (case-insensitive)
      const emailExists = users.some(
        (u: any) => u.email && u.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        console.error("Email already exists");
        return false;
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };

      // Add to users array
      users.push(newUser);

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

      console.log("Signup successful!");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
