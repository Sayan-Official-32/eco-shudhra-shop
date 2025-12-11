import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SellerProvider } from "@/contexts/SellerContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Checkout from "@/pages/Checkout";
import Cart from "./pages/Cart";
import SellerLogin from "./pages/SellerLogin";
import SellerSignup from "./pages/SellerSignup";
import SellerDashboard from "./pages/SellerDashboard";
// import AddProduct from "./pages/AddProduct";
// import EditProduct from "./pages/EditProduct";


const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SellerProvider>
          <FavoritesProvider>
            <CartProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  {/* Customer Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />

                  {/* Admin Routes */}
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin" element={<Admin />} />

                  {/* Seller Routes */}
                  <Route path="/seller-login" element={<SellerLogin />} />
                  <Route path="/seller-signup" element={<SellerSignup />} />
                  <Route path="/seller-dashboard" element={<SellerDashboard />} />
                  {/* <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/edit-product/:id" element={<EditProduct />} /> */}

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </FavoritesProvider>
        </SellerProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
