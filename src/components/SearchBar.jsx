import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchCities } from '@/data/touristData';

export default function SearchBar({ onCitySelect, onSearching }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
      onSearching?.(true);
      
      // Simulate search delay for loading animation
      const timer = setTimeout(() => {
        const searchResults = searchCities(query);
        setResults(searchResults);
        setIsSearching(false);
        onSearching?.(false);
        setShowResults(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setShowResults(false);
      setIsSearching(false);
      onSearching?.(false);
    }
  }, [query]);

  const handleCityClick = (city) => {
    onCitySelect?.(city);
    setQuery('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a city in India... (e.g., Delhi, Mumbai, Jaipur)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-6 text-lg rounded-full border-2 border-border focus:border-primary bg-card shadow-lg transition-all duration-300 focus:shadow-xl"
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Loading Bar */}
      {isSearching && (
        <div className="mt-2 loading-bar" />
      )}

      {/* Search Results */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-xl border border-border overflow-hidden z-50 animate-fade-in">
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-3 py-2">
              Found {results.length} {results.length === 1 ? 'city' : 'cities'}
            </p>
            <div className="space-y-1">
              {results.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCityClick(city)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img 
                      src={city.image} 
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {city.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{city.state}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">
                      {city.placesCount} places
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {showResults && query && results.length === 0 && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-xl border border-border p-6 text-center z-50 animate-fade-in">
          <p className="text-muted-foreground">No cities found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try searching for Delhi, Mumbai, Jaipur, etc.</p>
        </div>
      )}
    </div>
  );
}
