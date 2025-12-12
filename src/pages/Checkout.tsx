import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

export default function Checkout() {
  const navigate = useNavigate();
  const { items } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give a small delay to ensure data is ready
    const timer = setTimeout(() => {
      if (items && items.length > 0) {
        navigate("/checkout/details", {
          state: {
            cartItems: items,
          },
        });
      } else {
        // If cart is empty after delay, redirect to cart
        navigate("/cart", { replace: true });
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [items, navigate]);

  if (isLoading || (items && items.length > 0)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-lg text-muted-foreground">
            Loading checkout...
          </p>
        </div>
      </div>
    );
  }

  return null;
}
