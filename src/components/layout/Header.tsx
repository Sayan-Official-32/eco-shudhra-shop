import { useState, useEffect } from "react";
import { Menu, ShoppingCart, Search, X, Leaf, Heart, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FavoritesDrawer from "@/components/store/FavoritesDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "#shop" },
    { name: "Categories", href: "#categories" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2 group">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                EcoShudhra
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Favorites Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary relative"
                onClick={() => setIsFavoritesOpen(true)}
              >
                <Heart className={`h-5 w-5 ${totalFavorites > 0 ? 'fill-primary text-primary' : ''}`} />
                {totalFavorites > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {totalFavorites}
                  </span>
                )}
              </Button>

              {/* Cart Button - Now navigates to /cart page */}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary relative"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Authentication - Desktop */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden sm:flex items-center gap-2 text-foreground hover:text-primary"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-muted-foreground text-xs">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/login")}
                    className="hidden sm:inline-flex"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate("/signup")}
                    className="hidden sm:inline-flex"
                  >
                    Sign Up
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 py-2 text-foreground">
                      <User className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigate("/login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        navigate("/signup");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Favorites Drawer */}
      <FavoritesDrawer 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
      />
    </>
  );
};

export default Header;
