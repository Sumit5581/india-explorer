import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceCard from '@/components/PlaceCard';
import { useWishlist } from '@/hooks/useWishlist';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <section className="py-12 px-4 flex-1">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground mb-8">Places you want to visit</p>

          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">Start exploring and add places you'd love to visit!</p>
              <Link to="/"><Button className="rounded-full">Explore Places</Button></Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
