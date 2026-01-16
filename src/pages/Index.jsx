import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import CityCard from '@/components/CityCard';
import { cities } from '@/data/touristData';
import { MapPin, Compass, Heart, Map } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  const handleCitySelect = (city) => {
    navigate(`/city/${city.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="text-lg">🇮🇳</span>
              <span>Explore Incredible India</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Bharat Yatra
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the rich heritage, breathtaking landscapes, and vibrant culture of India. 
              Plan your perfect journey across the land of diversity.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onCitySelect={handleCitySelect} onSearching={setIsSearching} />

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              { icon: Compass, label: 'Explore Cities', color: 'text-primary' },
              { icon: MapPin, label: 'Tourist Places', color: 'text-secondary' },
              { icon: Heart, label: 'Save Wishlist', color: 'text-destructive' },
              { icon: Map, label: 'Get Directions', color: 'text-accent' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border">
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                <span className="text-sm font-medium text-center">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Popular Destinations</h2>
              <p className="text-muted-foreground mt-1">Explore the most visited cities in India</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
