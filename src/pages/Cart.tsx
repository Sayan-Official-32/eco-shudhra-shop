import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      // Navigate directly to checkout details with cart items
      navigate("/checkout/details", {
        state: {
          cartItems,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>

          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Shopping Cart
            </h1>
          </div>

          <div className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty cart
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Add some products to get started!
            </p>
            <Button size="lg" onClick={() => navigate("/#shop")}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border rounded-lg p-4 bg-card"
                >
                  {/* Product image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                  )}

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-foreground">
                          {item.name}
                        </h3>
                        {item.category && (
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span className="font-semibold text-green-600">
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="line-through text-muted-foreground">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Item total */}
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="text-base md:text-lg font-bold text-foreground">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* Quantity + remove */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center border rounded-md overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-muted rounded-l-md transition-colors disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-muted rounded-r-md transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center gap-1 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 px-2 py-1 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium text-foreground">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium text-foreground">₹0.00</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => navigate("/#shop")}
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
