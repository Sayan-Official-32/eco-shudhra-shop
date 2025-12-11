import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Shield, Eye, EyeOff, Store } from "lucide-react";

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [sellers, setSellers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const { admin, logout, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    if (!isAuthenticated) {
      navigate("/admin-login");
      return;
    }

    // Load users from localStorage
    const usersData = localStorage.getItem("users");
    const currentUserData = localStorage.getItem("currentUser");
    
    setUsers(usersData ? JSON.parse(usersData) : []);
    setCurrentUser(currentUserData ? JSON.parse(currentUserData) : null);

    // Fetch sellers from backend
    fetchSellers();
  }, [isAuthenticated, navigate]);

  const fetchSellers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sellers/all');
      if (response.ok) {
        const data = await response.json();
        setSellers(data);
      }
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all user data?")) {
      localStorage.removeItem("users");
      localStorage.removeItem("currentUser");
      setUsers([]);
      setCurrentUser(null);
      alert("All data cleared!");
    }
  };

  const maskPassword = (password: string) => {
    if (showPasswords) {
      return password;
    }
    return "•".repeat(Math.min(password.length, 64));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Welcome, {admin?.username}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={clearAllData}>
              Clear All Data
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{users.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Sellers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Store className="h-8 w-8 text-primary" />
                <p className="text-4xl font-bold">{sellers.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{currentUser ? 1 : 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Admin Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-green-600">Active</p>
            </CardContent>
          </Card>
        </div>

        {/* Current User */}
        <Card>
          <CardHeader>
            <CardTitle>Currently Logged In User</CardTitle>
          </CardHeader>
          <CardContent>
            {currentUser ? (
              <div className="space-y-2">
                <p><strong>ID:</strong> {currentUser.id}</p>
                <p><strong>Name:</strong> {currentUser.name}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">No user logged in</p>
            )}
          </CardContent>
        </Card>

        {/* All Sellers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              All Registered Sellers ({sellers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sellers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">ID</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Business Name</th>
                      <th className="text-left p-3">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller) => (
                      <tr key={seller.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">{seller.id}</td>
                        <td className="p-3">{seller.name}</td>
                        <td className="p-3">{seller.email}</td>
                        <td className="p-3 font-semibold text-primary">{seller.businessName}</td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {new Date(seller.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">No sellers registered yet</p>
            )}
          </CardContent>
        </Card>

        {/* All Users */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>All Registered Users ({users.length})</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPasswords(!showPasswords)}
                className="flex items-center gap-2"
              >
                {showPasswords ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Passwords
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Show Passwords
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">ID</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Password (Encrypted)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">{user.id}</td>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3 font-mono text-xs break-all max-w-xs">
                          {maskPassword(user.password)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">No users registered yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
