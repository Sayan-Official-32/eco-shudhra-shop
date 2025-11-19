import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/store/Hero";
import Features from "@/components/store/Features";
import Categories from "@/components/store/Categories";
import ProductGrid from "@/components/store/ProductGrid";

const AboutSection = () => (
  <section id="about" className="py-16 px-4 bg-background">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">About EcoShudhra</h2>
      <p className="text-lg text-foreground/80">EcoShudhra Shop is committed to offering eco-friendly and sustainable products while delivering a modern shopping experience. Our platform is built for speed, accessibility, and conscious consumer choices, powered by the latest web technologies.</p>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-16 px-4 bg-muted border-t border-border">
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="mb-6 text-foreground/80">Have questions, feedback, or want to collaborate? Get in touch with our team!</p>
      <a href="mailto:sayanpaul721632@gmail.com" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded font-bold hover:scale-105 transition-transform mt-2">Email Us</a>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Categories />
        <ProductGrid />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
