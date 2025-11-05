import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>100% Sustainable Products</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Clean Living,
              <span className="text-gradient block mt-2">Green Future</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              Discover eco-friendly products that make a difference. From sustainable home goods to organic essentials, we've curated the best for you and the planet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { value: "10K+", label: "Happy Customers" },
                { value: "500+", label: "Eco Products" },
                { value: "50+", label: "Partner Brands" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image placeholder - Will generate a beautiful eco image */}
          <div className="relative animate-fade-in-up delay-300">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl overflow-hidden hover-lift">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop"
                alt="Sustainable eco-friendly products"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-2xl shadow-lg animate-scale-in">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Eco-Friendly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
