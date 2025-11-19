import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import { parseCSV, Product } from "@/lib/csvParser";

interface ProductGridProps {
  selectedCategory: string | null;
  onProductCountsChange?: (counts: Record<string, number>) => void;
  onProductsLoad?: (products: Product[]) => void;
}

const ProductGrid = ({ selectedCategory, onProductCountsChange, onProductsLoad }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.csv');
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        const csvText = await response.text();
        const parsedProducts = parseCSV(csvText);
        setProducts(parsedProducts);
        
        // Calculate product counts by category
        const counts: Record<string, number> = {
          all: parsedProducts.length
        };
        
        parsedProducts.forEach(product => {
          counts[product.category] = (counts[product.category] || 0) + 1;
        });
        
        // Pass counts back to parent
        if (onProductCountsChange) {
          onProductCountsChange(counts);
        }

        // Pass products to parent for search
        if (onProductsLoad) {
          onProductsLoad(parsedProducts);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    loadProducts();
  }, [onProductCountsChange, onProductsLoad]);

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  if (loading) {
    return (
      <section id="shop" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shop" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="shop" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {selectedCategory ? `${selectedCategory} Products` : 'Featured Products'}
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              {selectedCategory 
                ? `Showing ${filteredProducts.length} products in ${selectedCategory}`
                : `Discover our curated collection of ${products.length} eco-friendly products`
              }
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                No products found in this category
              </p>
              <p className="text-sm text-muted-foreground">
                Try selecting a different category or browse all products
              </p>
            </div>
          )}
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
