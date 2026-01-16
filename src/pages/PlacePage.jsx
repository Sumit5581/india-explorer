import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewCard from '@/components/ReviewCard';
import { Button } from '@/components/ui/button';
import { getPlaceById, getCityById, getReviewsByPlace } from '@/data/touristData';
import { useWishlist } from '@/hooks/useWishlist';
import { useVisitedPlaces } from '@/hooks/useVisitedPlaces';
import { Heart, Star, Clock, IndianRupee, Calendar, MapPin, Navigation, ArrowLeft } from 'lucide-react';

export default function PlacePage() {
  const { placeId } = useParams();
  const place = getPlaceById(placeId);
  const city = place ? getCityById(place.cityId) : null;
  const reviews = getReviewsByPlace(placeId);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isVisited, markAsVisited } = useVisitedPlaces();

  if (!place) {
    return <div className="min-h-screen flex items-center justify-center">Place not found</div>;
  }

  const inWishlist = isInWishlist(place.id);
  const visited = isVisited(place.id);

  const openDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Image */}
      <div className="relative h-72 md:h-[400px]">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link to={`/city/${place.cityId}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/30 px-3 py-2 rounded-full">
            <ArrowLeft className="w-4 h-4" /> Back to {city?.name}
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 container">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary text-white mb-3 inline-block">{place.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{place.name}</h1>
          <div className="flex items-center gap-4 mt-3 text-white/80">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-medium text-white">{place.rating}</span>
              <span>({place.reviewsCount.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8 px-4 flex-1">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{place.description}</p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <Clock className="w-5 h-5 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Timing</p>
                  <p className="text-sm font-medium">{place.timing}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <IndianRupee className="w-5 h-5 text-secondary mb-2" />
                  <p className="text-xs text-muted-foreground">Entry Fee</p>
                  <p className="text-sm font-medium">{place.entryFee}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <Calendar className="w-5 h-5 text-accent mb-2" />
                  <p className="text-xs text-muted-foreground">Best Time</p>
                  <p className="text-sm font-medium">{place.bestTime}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <MapPin className="w-5 h-5 text-destructive mb-2" />
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{city?.name}</p>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h2>
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                  ) : (
                    <p className="text-muted-foreground">No reviews yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="sticky top-20 space-y-4">
                <Button onClick={() => toggleWishlist(place)} variant={inWishlist ? "destructive" : "outline"} className="w-full rounded-xl">
                  <Heart className={`w-4 h-4 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
                {!visited && (
                  <Button onClick={() => markAsVisited(place)} className="w-full rounded-xl bg-secondary hover:bg-secondary/90">
                    Mark as Visited
                  </Button>
                )}
                {visited && (
                  <div className="p-3 rounded-xl bg-secondary/10 text-secondary text-center font-medium">
                    ✓ You've visited this place
                  </div>
                )}
                <Button onClick={openDirections} variant="outline" className="w-full rounded-xl">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
