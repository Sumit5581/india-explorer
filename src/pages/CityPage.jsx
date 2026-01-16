import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceCard from '@/components/PlaceCard';
import { getCityById, getPlacesByCity } from '@/data/touristData';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CityPage() {
  const { cityId } = useParams();
  const city = getCityById(cityId);
  const places = getPlacesByCity(cityId);

  if (!city) {
    return <div className="min-h-screen flex items-center justify-center">City not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <div className="relative h-72 md:h-96">
        <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 container">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <MapPin className="w-4 h-4" /> {city.state}
          </div>
          <h1 className="text-4xl font-bold text-white">{city.name}</h1>
          <p className="text-white/80 mt-2 max-w-2xl">{city.description}</p>
        </div>
      </div>

      {/* Places */}
      <section className="py-12 px-4 flex-1">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Tourist Places in {city.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
