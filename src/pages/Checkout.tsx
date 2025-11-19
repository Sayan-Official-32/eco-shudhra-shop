import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Lock } from "lucide-react";

// Add this array at the top of the file (after imports, before the component)
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "India",
    address: "",
    city: "",
    region: "",
    zip: "",
  });
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Save order to localStorage for future reference
    localStorage.setItem(
      "lastOrder",
      JSON.stringify({
        ...form,
        cart: cartItems,
        total: totalPrice,
        date: new Date().toISOString(),
      })
    );
    
    // Clear cart after successful order
    clearCart();
    setSaving(false);
    setSubmitted(true);
    
    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Redirect if cart is empty
  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">Add some products to checkout</p>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <form className="bg-card rounded-lg shadow-md p-6 lg:p-8" onSubmit={handleSubmit}>
            {/* Customer Details */}
            <h2 className="text-2xl font-bold mb-5">Customer details</h2>
            
            <div className="mb-4">
              <label className="block font-medium mb-2">Email*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-medium mb-2">First name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="given-name"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="family-name"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2">Phone*</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                autoComplete="tel"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Delivery Details */}
            <h2 className="text-2xl font-bold mb-5 mt-8">Delivery details</h2>

            <div className="mb-4">
            <label className="block font-medium mb-2">Country/Region*</label>
            <select
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
                {countries.map((country) => (
                <option key={country} value={country}>
                    {country}
                </option>
                ))}
            </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Address*</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                autoComplete="street-address"
                placeholder="House number, street name, area"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">City*</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                autoComplete="address-level2"
                placeholder="Bhubaneswar"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-medium mb-2">State*</label>
                <input
                  type="text"
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  required
                  className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Odisha"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Pin Code*</label>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{6}"
                  className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="postal-code"
                  placeholder="751001"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold mt-4"
              disabled={saving || submitted}
            >
              {saving ? "Processing..." : submitted ? "Order Completed!" : "Continue"}
            </Button>

            {submitted && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold text-center">
                ✓ Thank you for your order! Redirecting to homepage...
              </div>
            )}
          </form>

          {/* Right: Order Summary */}
          <div className="bg-muted rounded-lg shadow-md p-6 lg:p-8 h-fit lg:sticky lg:top-8">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Order summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h3>
                <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/cart")}
                className="text-xs"
                >
                Edit Cart
                </Button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">
                Your cart is empty
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm line-clamp-2">{item.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Quantity: {item.quantity}
                        </div>
                        <div className="font-bold text-primary mt-2">
                          ₹{item.price}
                        </div>
                        {item.originalPrice && (
                          <div className="text-xs text-muted-foreground line-through">
                            ₹{item.originalPrice}
                          </div>
                        )}
                      </div>
                      <div className="text-right font-bold">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
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

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Secure Checkout</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
