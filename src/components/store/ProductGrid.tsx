import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: 1,
      name: "Organic Cotton Tote Bag",
      price: 499,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500",
      category: "Bags",
      rating: 4.5,
      reviews: 127,
      description: "Handcrafted from 100% organic cotton, this versatile tote bag is perfect for your daily shopping needs. Durable, washable, and sustainably produced with zero waste manufacturing.",
      features: [
        "100% organic cotton material",
        "Reinforced handles for heavy loads",
        "Machine washable and durable",
        "Spacious 15L capacity",
        "Fair trade certified production"
      ],
      ecoImpact: "Saves 5 plastic bags per use • Carbon neutral shipping",
      inStock: true,
    },
    {
      id: 2,
      name: "Bamboo Cutlery Set",
      price: 349,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500",
      category: "Kitchen",
      rating: 4.8,
      reviews: 89,
      description: "Travel-friendly bamboo cutlery set with a sleek carrying case. Say goodbye to single-use plastic utensils with this eco-conscious alternative.",
      features: [
        "Premium bamboo construction",
        "Includes fork, spoon, knife, and chopsticks",
        "Compact carrying case included",
        "Lightweight and portable",
        "Naturally antimicrobial"
      ],
      ecoImpact: "Prevents 100+ plastic utensils from landfills annually",
      inStock: true,
    },
    {
      id: 3,
      name: "Reusable Water Bottle",
      price: 599,
      originalPrice: 899,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
      category: "Bottles",
      rating: 4.7,
      reviews: 234,
      description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and designed for an active lifestyle.",
      features: [
        "Double-wall vacuum insulation",
        "750ml capacity",
        "Leak-proof design",
        "BPA-free materials",
        "Wide mouth for easy cleaning"
      ],
      ecoImpact: "Replaces 500+ plastic bottles per year",
      inStock: true,
    },
    {
      id: 4,
      name: "Eco-Friendly Notebook",
      price: 249,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500",
      category: "Stationery",
      rating: 4.6,
      reviews: 156,
      description: "Handmade notebook with recycled paper and a biodegradable cover. Perfect for journaling, sketching, or note-taking.",
      features: [
        "100% recycled paper",
        "Biodegradable cover",
        "120 pages",
        "Acid-free and chlorine-free",
        "Handcrafted binding"
      ],
      ecoImpact: "Made from post-consumer waste • Plants 1 tree per purchase",
      inStock: false,
    },
  ];

  return (
    <>
      <section id="shop" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Discover our curated collection of eco-friendly products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ProductGrid;
