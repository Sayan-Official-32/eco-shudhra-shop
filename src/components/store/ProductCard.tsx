import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  onClick: () => void;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  reviews,
  inStock,
  onClick,
  ...rest
}: ProductCardProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isInFavorites = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInFavorites) {
      removeFromFavorites(id);
      toast.success(`${name} removed from favorites`);
    } else {
      addToFavorites({ id, name, price, originalPrice, image, category, rating, reviews, inStock, ...rest } as any);
      toast.success(`${name} added to favorites!`);
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-border hover:border-primary/50 relative"
    >
      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all"
        onClick={handleFavoriteClick}
      >
        <Heart 
          className={`h-5 w-5 transition-colors ${
            isInFavorites 
              ? 'fill-primary text-primary' 
              : 'text-muted-foreground hover:text-primary'
          }`} 
        />
      </Button>

      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
        {originalPrice && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            Save ₹{originalPrice - price}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <Badge variant="secondary" className="mb-2 text-xs">
            {category}
          </Badge>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
