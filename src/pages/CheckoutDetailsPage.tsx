import { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

type LocationState = {
  cartItems: CartItem[];
};

export function CheckoutDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state || !state.cartItems || state.cartItems.length === 0) {
    navigate("/cart", { replace: true });
    return null;
  }

  const cartItems = state.cartItems;

  const [customer, setCustomer] = useState<Customer>({
    email: "aicoder001@gmail.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+91 98765 43210",
    country: "India",
    address: "House number, street name, area",
    city: "Bhubaneswar",
    state: "Odisha",
    postalCode: "751001",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const taxes = 0;
  const total = subtotal + shipping + taxes;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    navigate("/checkout/review", {
      state: {
        customer,
        cartItems,
        pricing: {
          subtotal,
          shipping,
          taxes,
          total,
        },
      },
    });
  }

  function handleChange(
    field: keyof Customer,
    value: string
  ) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-card border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Customer details
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={customer.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John"
                      value={customer.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Doe"
                      value={customer.lastName}
                      onChange={(e) =>
                        handleChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+91 98765 43210"
                    value={customer.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Delivery details
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Country/Region<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={customer.country}
                    onChange={(e) =>
                      handleChange("country", e.target.value)
                    }
                    required
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Address<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="House number, street name, area"
                    value={customer.address}
                    onChange={(e) =>
                      handleChange("address", e.target.value)
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Bhubaneswar"
                    value={customer.city}
                    onChange={(e) =>
                      handleChange("city", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      State<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Odisha"
                      value={customer.state}
                      onChange={(e) =>
                        handleChange("state", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Pin Code<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="751001"
                      value={customer.postalCode}
                      onChange={(e) =>
                        handleChange("postalCode", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors"
              >
                Continue
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  Order summary ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "item" : "items"})
                </h2>
                <a
                  href="/cart"
                  className="text-sm text-primary hover:underline"
                >
                  Edit Cart
                </a>
              </div>

              <div className="space-y-4 mb-6 border-b pb-6">
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
                      <p className="font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        {item.price}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">
                      {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    {subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium text-green-600">
                    FREE
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium text-foreground">
                    {taxes}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {total}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
