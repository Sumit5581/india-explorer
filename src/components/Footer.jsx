import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-auto">
      {/* Tricolor strip */}
      <div className="h-1 gradient-tricolor" />
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-tricolor flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Bharat Yatra</span>
                <span className="block text-xs text-background/60">Discover Incredible India</span>
              </div>
            </div>
            <p className="text-background/70 text-sm max-w-md">
              Your ultimate guide to exploring the rich heritage, culture, and natural beauty of India. 
              Plan your journey across the land of diversity.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-background/10">
              <p className="text-xs text-background/60 italic">
                "अतिथि देवो भव" - Guest is God
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/wishlist" className="hover:text-accent transition-colors">My Wishlist</a></li>
              <li><a href="/my-travels" className="hover:text-accent transition-colors">Travel Log</a></li>
              <li><a href="/login" className="hover:text-accent transition-colors">Login</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>hello@bharatyatra.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-accent" />
                <a href="https://www.incredibleindia.org" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Incredible India
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © 2024 Bharat Yatra. Made with ❤️ in India
          </p>
          <div className="flex items-center gap-4">
            <span className="text-2xl">🇮🇳</span>
            <span className="text-xs text-background/40">जय हिंद</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
