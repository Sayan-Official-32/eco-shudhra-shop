import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";

export default function Checkout() {
  const navigate = useNavigate();
  const { items } = useCart();

  useEffect(() => {
    // If cart is empty, redirect to cart
    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    // Redirect to checkout details page
    navigate("/checkout/details", {
      state: {
        cartItems: items,
      },
    });
  }, [items, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-muted-foreground">
        Loading checkout...
      </p>
    </div>
  );
}
