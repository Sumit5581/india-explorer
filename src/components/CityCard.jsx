import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CityCard({ city }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/city/${city.id}`)}
      className="group relative overflow-hidden rounded-2xl bg-card shadow-md card-hover cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={city.image} 
          alt={city.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center gap-1 text-xs opacity-80 mb-1">
          <MapPin className="w-3 h-3" />
          <span>{city.state}</span>
        </div>
        <h3 className="text-xl font-bold mb-1">{city.name}</h3>
        <p className="text-sm opacity-80 line-clamp-2 mb-2">{city.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {city.placesCount} Places
          </span>
          <span className="text-sm font-medium text-primary bg-white/90 px-3 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
            Explore →
          </span>
        </div>
      </div>

      {/* Tricolor accent */}
      <div className="absolute top-0 left-0 w-1 h-full gradient-tricolor" />
    </div>
  );
}
