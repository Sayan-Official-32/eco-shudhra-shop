import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to get started!
            </p>
            <Button onClick={() => navigate("/#shop")} size="lg">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-lg shadow-md p-4 flex gap-4 border border-border"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
                  />

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {item.name}
                      </h3>
                      {item.category && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.category}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl font-bold text-primary">
                          ₹{item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 border border-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-muted rounded-l-md transition-colors disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted rounded-r-md transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="hidden sm:flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-xl font-bold text-primary">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1">
              <div className="bg-muted rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 border-b border-border pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-semibold">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-semibold">₹0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{totalPrice}
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full h-12 text-base font-semibold mb-3"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/#shop")}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
