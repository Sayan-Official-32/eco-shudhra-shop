import { Leaf, Home, Droplet, Heart, Utensils, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  {
    name: "Personal Care",
    icon: Sparkles,
    count: 45,
    color: "from-primary/20 to-primary/10",
  },
  {
    name: "Home Care",
    icon: Home,
    count: 32,
    color: "from-secondary/20 to-secondary/10",
  },
  {
    name: "Kitchen",
    icon: Utensils,
    count: 58,
    color: "from-accent/20 to-accent/10",
  },
  {
    name: "Wellness",
    icon: Heart,
    count: 27,
    color: "from-primary/20 to-primary/10",
  },
  {
    name: "Eco Living",
    icon: Leaf,
    count: 41,
    color: "from-secondary/20 to-secondary/10",
  },
  {
    name: "Natural Beauty",
    icon: Droplet,
    count: 36,
    color: "from-accent/20 to-accent/10",
  },
];

const Categories = () => {
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                style={{ animationDelay: `${index * 0.1}s` }}
                className={`group cursor-pointer hover-lift p-6 text-center bg-gradient-to-br ${category.color} border-none animate-fade-in-up`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-4 rounded-full bg-background/80 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.count} products
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
