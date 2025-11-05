import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/store/Hero";
import Features from "@/components/store/Features";
import Categories from "@/components/store/Categories";
import ProductGrid from "@/components/store/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Categories />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
