import { useState } from "react";
import { parseCSV } from "@/lib/csvParser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Fetch CSV file from public directory
    const res = await fetch("/users.csv");
    const text = await res.text();
    const users = parseCSV(text);
    const found = users.find(
      (user: any) => user.email === email && user.password === password
    );
    setMessage(found ? "Login successful!" : "Invalid credentials");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-primary text-white py-2 rounded">
          Login
        </button>
      </form>
      {message && <div className="mt-2 text-center">{message}</div>}
    </div>
  );
}
