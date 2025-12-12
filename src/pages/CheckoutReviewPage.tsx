import { useLocation, useNavigate } from "react-router-dom";

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

export function CheckoutReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state) {
    navigate("/checkout/details", { replace: true });
    return null;
  }

  const { customer, cartItems, pricing } = state;

  function handleContinue() {
    console.log("Continue to payment / place order");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-semibold">
          Review your order
        </h1>

        <div className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
          {/* Left side: customer + delivery method */}
          <div className="space-y-6">
            {/* Customer details */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">
                Customer details
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Name
                  </dt>
                  <dd className="font-medium">
                    {customer.firstName} {customer.lastName}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Email
                  </dt>
                  <dd className="font-medium">
                    {customer.email}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Phone
                  </dt>
                  <dd className="font-medium">
                    {customer.phone}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Address
                  </dt>
                  <dd className="max-w-[60%] text-right font-medium">
                    {customer.address}, {customer.city}{" "}
                    {customer.postalCode}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Delivery method */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">
                Delivery method
              </h2>
              <div className="flex items-center justify-between rounded-md border bg-background px-4 py-3 text-sm">
                <div>
                  <p className="font-medium">
                    Free Shipping
                  </p>
                  <p className="text-xs text-muted-foreground">
                    4-6 delivery days
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  0
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleContinue}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Right side: order summary */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">
              Order summary
            </h2>

            <div className="space-y-4 border-b pb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-medium">
                  {pricing.subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Shipping
                </span>
                <span className="font-medium">
                  {pricing.shipping}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Taxes
                </span>
                <span className="font-medium">
                  {pricing.taxes}
                </span>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold">
                <span>Total</span>
                <span>{pricing.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
