import { X, ShoppingCart, Heart, Share2, Star, Truck, Shield, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";

interface ProductDetailsModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    description: string;
    features: string[];
    ecoImpact: string;
    inStock: boolean;
  };
  onClose: () => void;
}

const ProductDetailsModal = ({ product, onClose }: ProductDetailsModalProps) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isInFavorites = isFavorite(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error("This product is currently out of stock");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleFavoriteClick = () => {
    if (isInFavorites) {
      removeFromFavorites(product.id);
      toast.success(`${product.name} removed from favorites`);
    } else {
      addToFavorites(product);
      toast.success(`${product.name} added to favorites!`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {
        toast.error("Sharing failed");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-muted transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Recycle className="h-5 w-5 text-primary" />
              <p className="text-sm text-foreground/80">{product.ecoImpact}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            <h2 className="text-3xl font-bold text-foreground">{product.name}</h2>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-foreground/60">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-foreground/40 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-foreground/70 leading-relaxed">{product.description}</p>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground/70">
                    <span className="text-primary mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-foreground/60">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-foreground/60">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Recycle className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-foreground/60">Eco-Friendly</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 h-12 text-base font-semibold" 
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12"
                onClick={handleFavoriteClick}
              >
                <Heart 
                  className={`h-5 w-5 ${
                    isInFavorites ? "fill-primary text-primary" : ""
                  }`} 
                />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
