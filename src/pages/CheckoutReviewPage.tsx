import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type Customer = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
};

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

type Pricing = {
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
};

type LocationState = {
  customer: Customer;
  cartItems: CartItem[];
  pricing: Pricing;
};

type DeliveryMethod = "standard" | "express" | "overnight";

export function CheckoutReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!state) {
    navigate("/checkout/details", { replace: true });
    return null;
  }

  const { customer, cartItems, pricing } = state;

  // Delivery methods with costs
  const deliveryMethods = {
    standard: { label: "Free Shipping", days: "4-6", cost: 0 },
    express: { label: "Express Shipping", days: "2-3", cost: 100 },
    overnight: { label: "Overnight Shipping", days: "Next Day", cost: 250 },
  };

  const selectedMethod = deliveryMethods[selectedDelivery];
  const finalTotal = pricing.total + selectedMethod.cost;

  async function handleContinue() {
    setIsProcessing(true);
    setError(null);

    try {
      // Validate order before proceeding
      if (!cartItems || cartItems.length === 0) {
        setError("Your cart is empty");
        navigate("/cart", { replace: true });
        return;
      }

      // Here you would typically call your backend to:
      // 1. Verify inventory
      // 2. Create an order draft
      // 3. Initialize payment gateway
      console.log("Order Review Data:", {
        customer,
        cartItems,
        pricing,
        deliveryMethod: selectedDelivery,
        finalTotal,
      });

      // Redirect to payment page
      navigate("/payment", {
        state: {
          customer,
          cartItems,
          pricing: { ...pricing, shipping: selectedMethod.cost, total: finalTotal },
          deliveryMethod: selectedDelivery,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleEditDetails() {
    navigate("/checkout/details", {
      state: { cartItems },
    });
  }

  function handleEditCart() {
    navigate("/cart", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Review your order</h1>
          <p className="text-muted-foreground">Please verify your details before continuing</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Customer & Delivery Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Customer Details</h2>
                <button
                  onClick={handleEditDetails}
                  className="text-sm text-primary hover:underline"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <p className="text-foreground font-medium">
                    {customer.firstName} {customer.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="text-foreground font-medium">{customer.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="text-foreground font-medium">{customer.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Country</label>
                  <p className="text-foreground font-medium">{customer.country}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <label className="text-sm text-muted-foreground block mb-2">Delivery Address</label>
                <p className="text-foreground font-medium">
                  {customer.address}
                </p>
                <p className="text-foreground">
                  {customer.city}, {customer.state} {customer.postalCode}
                </p>
              </div>
            </div>

            {/* Delivery Method Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-foreground mb-6">Delivery Method</h2>

              <div className="space-y-4">
                {Object.entries(deliveryMethods).map(([key, method]) => (
                  <label
                    key={key}
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors"
                    style={{
                      borderColor: selectedDelivery === key ? "rgb(34, 197, 94)" : "rgb(229, 231, 235)",
                      backgroundColor: selectedDelivery === key ? "rgba(34, 197, 94, 0.05)" : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={key}
                      checked={selectedDelivery === key}
                      onChange={(e) => setSelectedDelivery(e.target.value as DeliveryMethod)}
                      className="w-4 h-4"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-foreground">{method.label}</p>
                      <p className="text-sm text-muted-foreground">{method.days} delivery days</p>
                    </div>
                    <span className="font-semibold text-foreground">
                      {method.cost === 0 ? "FREE" : `₹${method.cost}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        ₹{item.price}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₹{pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium text-green-600">
                    {selectedMethod.cost === 0 ? "FREE" : `₹${selectedMethod.cost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium text-foreground">₹{pricing.taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-green-600">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  disabled={isProcessing}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors"
                >
                  {isProcessing ? "Processing..." : "Continue to Payment"}
                </button>
                <button
                  onClick={handleEditCart}
                  className="w-full py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-foreground font-semibold rounded-md transition-colors"
                >
                  Edit Cart
                </button>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                🔒 Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
