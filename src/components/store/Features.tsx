import { Truck, Shield, RefreshCw, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ₹999",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Leaf,
    title: "Eco-Certified",
    description: "All products verified",
  },
];

const Features = () => {
  return (
    <section className="py-12 sm:py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="p-6 text-center border-none bg-background/80 backdrop-blur-sm hover-lift animate-fade-in-up"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {feature.description}
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

export default Features;
