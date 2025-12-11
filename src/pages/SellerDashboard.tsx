import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSeller } from "@/contexts/SellerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Package, Plus, Edit2, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  ecoScore: string;
  createdAt: string;
}

const API_URL = 'http://localhost:5000/api';

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { seller, logout, isAuthenticated } = useSeller();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/seller-login");
      return;
    }
    fetchProducts();
  }, [isAuthenticated, navigate, seller?.id]);

  const fetchProducts = async () => {
    if (!seller?.id) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/products/seller/${seller.id}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Network error while loading products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setIsDeleting(productId);
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellerId: seller?.id }),
      });

      if (response.ok) {
        toast.success("Product deleted successfully");
        setProducts(products.filter(p => p.id !== productId));
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Network error");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/seller-login");
  };

  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockProducts = products.filter(p => p.stock < 5).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, <span className="font-semibold text-green-700">{seller?.name}</span>!</p>
            <p className="text-sm text-gray-500 mt-1">📦 {seller?.businessName}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={() => navigate("/add-product")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-green-200 text-gray-700 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{products.length}</div>
              <p className="text-xs text-gray-500 mt-2">Active listings</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Stock Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">₹{totalValue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-2">Inventory value</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${lowStockProducts > 0 ? 'text-amber-600' : 'text-green-700'}`}>
                {lowStockProducts}
              </div>
              <p className="text-xs text-gray-500 mt-2">Less than 5 items</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold text-green-600 flex items-center gap-2">
                <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                Active
              </div>
              <p className="text-xs text-gray-500 mt-2">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Warning */}
        {lowStockProducts > 0 && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900">
                    {lowStockProducts} {lowStockProducts === 1 ? 'product' : 'products'} with low stock
                  </p>
                  <p className="text-sm text-amber-700">Consider restocking items with less than 5 units</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Section */}
        <Card className="bg-white border-green-100">
          <CardHeader className="border-b border-green-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                <CardTitle>Your Products</CardTitle>
              </div>
              {products.length > 0 && (
                <span className="text-sm font-medium text-gray-600 bg-green-50 px-3 py-1 rounded-full">
                  {products.length} product{products.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border-green-100">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-green-700 shadow">
                        {product.ecoScore}
                      </div>
                      {product.stock < 5 && (
                        <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Low Stock
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-green-700">₹{product.price}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Category: <span className="font-medium">{product.category}</span></span>
                          <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Stock: {product.stock}
                          </span>
                        </div>
                      </div>

                      {product.rating > 0 && (
                        <div className="text-sm text-gray-600 mb-4">
                          ⭐ {product.rating.toFixed(1)} rating
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => navigate(`/edit-product/${product.id}`)}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={isDeleting === product.id}
                        >
                          {isDeleting === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-green-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-600 mb-6">Start by adding your first eco-friendly product</p>
                <Button 
                  onClick={() => navigate("/add-product")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Help Text */}
        <div className="text-center text-sm text-gray-600 pb-8">
          <p>Need help? <Link to="/" className="text-green-600 hover:underline">Go back to store</Link></p>
        </div>
      </div>
    </div>
  );
}
