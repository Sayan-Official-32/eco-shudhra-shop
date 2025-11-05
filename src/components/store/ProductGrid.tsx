import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Organic Bamboo Toothbrush Set",
    price: 299,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&h=500&fit=crop",
    category: "Personal Care",
    isNew: true,
  },
  {
    id: 2,
    name: "Reusable Cotton Produce Bags",
    price: 399,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
    category: "Kitchen",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Natural Coconut Bowl Set",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1587662163693-b8e4ec5a1e8e?w=500&h=500&fit=crop",
    category: "Kitchen",
  },
  {
    id: 4,
    name: "Eco-Friendly Cleaning Kit",
    price: 899,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&h=500&fit=crop",
    category: "Home Care",
    isBestseller: true,
  },
  {
    id: 5,
    name: "Organic Cotton Tote Bag",
    price: 349,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop",
    category: "Accessories",
    isNew: true,
  },
  {
    id: 6,
    name: "Sustainable Yoga Mat",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    category: "Fitness",
  },
  {
    id: 7,
    name: "Plant-Based Soap Bar Set",
    price: 449,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&h=500&fit=crop",
    category: "Personal Care",
    isBestseller: true,
  },
  {
    id: 8,
    name: "Stainless Steel Water Bottle",
    price: 699,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    category: "Kitchen",
    isNew: true,
  },
];

const ProductGrid = () => {
  return (
    <section id="shop" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully curated sustainable products for your eco-conscious lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in-up"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
