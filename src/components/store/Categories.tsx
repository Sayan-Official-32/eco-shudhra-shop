import { Leaf, Home, Droplet, Heart, Utensils, Sparkles, Package } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CategoriesProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
  productCounts?: Record<string, number>;
}

const Categories = ({ onCategorySelect, selectedCategory, productCounts = {} }: CategoriesProps) => {
  const categories = [
    {
      name: "All Products",
      value: null,
      icon: Package,
      count: productCounts['all'] || 0,
      color: "from-purple-500/20 to-pink-500/10",
    },
    {
      name: "Personal Care",
      value: "Personal Care",
      icon: Sparkles,
      count: productCounts['Personal Care'] || 0,
      color: "from-primary/20 to-primary/10",
    },
    {
      name: "Home",
      value: "Home",
      icon: Home,
      count: productCounts['Home'] || 0,
      color: "from-secondary/20 to-secondary/10",
    },
    {
      name: "Kitchen",
      value: "Kitchen",
      icon: Utensils,
      count: productCounts['Kitchen'] || 0,
      color: "from-accent/20 to-accent/10",
    },
    {
      name: "Bags",
      value: "Bags",
      icon: Leaf,
      count: productCounts['Bags'] || 0,
      color: "from-primary/20 to-primary/10",
    },
    {
      name: "Electronics",
      value: "Electronics",
      icon: Droplet,
      count: productCounts['Electronics'] || 0,
      color: "from-secondary/20 to-secondary/10",
    },
    {
      name: "Clothing",
      value: "Clothing",
      icon: Heart,
      count: productCounts['Clothing'] || 0,
      color: "from-accent/20 to-accent/10",
    },
    {
      name: "Fitness",
      value: "Fitness",
      icon: Sparkles,
      count: productCounts['Fitness'] || 0,
      color: "from-primary/20 to-primary/10",
    },
  ];

  return (
    <section id="categories" className="py-16 sm:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need for a sustainable lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.value;
            
            return (
              <Card
                key={category.name}
                onClick={() => onCategorySelect(category.value)}
                style={{ animationDelay: `${index * 0.1}s` }}
                className={`group cursor-pointer hover-lift p-6 text-center bg-gradient-to-br ${category.color} border-none animate-fade-in-up transition-all duration-300 ${
                  isSelected 
                    ? 'ring-4 ring-primary shadow-xl scale-105' 
                    : ''
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-4 rounded-full bg-background/80 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 ${
                    isSelected ? 'bg-primary text-primary-foreground scale-110' : ''
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm sm:text-base transition-colors ${
                      isSelected ? 'text-primary' : 'text-foreground'
                    }`}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.count} products
                    </p>
                  </div>
                </div>

                {/* Selected indicator badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-pulse" />
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
