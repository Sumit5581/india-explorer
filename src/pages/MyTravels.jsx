import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useVisitedPlaces } from '@/hooks/useVisitedPlaces';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function MyTravels() {
  const { visitedPlaces } = useVisitedPlaces();
  const { user } = useAuth();

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <section className="py-12 px-4 flex-1">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">My Travel Log</h1>
          <p className="text-muted-foreground mb-8">Places you've visited in India</p>

          {!user && (
            <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm"><Link to="/login" className="text-primary font-medium underline">Login</Link> to save your travel history permanently.</p>
            </div>
          )}

          {visitedPlaces.length > 0 ? (
            <div className="space-y-4">
              {visitedPlaces.map((place) => (
                <Link key={place.id} to={`/place/${place.id}`} className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:shadow-md transition-shadow">
                  <img src={place.image} alt={place.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{place.name}</h3>
                    <p className="text-sm text-muted-foreground">{place.category}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>Visited on {formatDate(place.visitedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No places visited yet</h3>
              <p className="text-muted-foreground mb-6">Start exploring and mark places as visited!</p>
              <Link to="/"><Button className="rounded-full">Explore Places</Button></Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
