import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  category,
  isNew,
  isBestseller,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover-lift cursor-pointer border-border">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-accent text-accent-foreground">New</Badge>
          )}
          {isBestseller && (
            <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>
          )}
        </div>

        {/* Wishlist button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Quick add to cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          {category}
        </div>
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">₹{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
