import { Heart, Star, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { useVisitedPlaces } from '@/hooks/useVisitedPlaces';

export default function PlaceCard({ place, showActions = true }) {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isVisited, markAsVisited } = useVisitedPlaces();

  const inWishlist = isInWishlist(place.id);
  const visited = isVisited(place.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(place);
  };

  const handleVisitedClick = (e) => {
    e.stopPropagation();
    markAsVisited(place);
  };

  return (
    <div 
      onClick={() => navigate(`/place/${place.id}`)}
      className="group relative overflow-hidden rounded-2xl bg-card shadow-md card-hover cursor-pointer border border-border"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={place.image} 
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Wishlist Button */}
        {showActions && (
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              inWishlist 
                ? 'bg-destructive text-white' 
                : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-destructive'
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
            {place.category}
          </span>
        </div>

        {/* Visited Badge */}
        {visited && (
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
              ✓ Visited
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
          {place.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{place.rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            ({place.reviewsCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{place.timing}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {place.description}
        </p>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/place/${place.id}`);
              }}
            >
              View Details
            </Button>
            {!visited && (
              <Button 
                size="sm" 
                className="rounded-full btn-patriotic bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                onClick={handleVisitedClick}
              >
                Mark Visited
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
