import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Heart, MapPin, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-full gradient-tricolor flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Bharat Yatra
            </span>
            <span className="text-[10px] text-muted-foreground -mt-1">Discover Incredible India</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors story-link"
          >
            <span>Explore</span>
          </Link>
          <Link 
            to="/wishlist" 
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist</span>
          </Link>
          <Link 
            to="/my-travels" 
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
          >
            <MapPin className="w-4 h-4" />
            <span>My Travels</span>
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/login')}
                className="rounded-full"
              >
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/signup')}
                className="rounded-full btn-patriotic bg-primary hover:bg-primary/90"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <nav className="container py-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/wishlist" 
              className="block py-2 text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link 
              to="/my-travels" 
              className="block py-2 text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Travels
            </Link>
            <div className="pt-3 border-t border-border">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="font-medium">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-full"
                    onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="flex-1 rounded-full btn-patriotic"
                    onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
