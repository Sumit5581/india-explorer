import { Star, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ReviewCard({ review }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 rounded-xl bg-muted/50 border border-border">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              {review.userAvatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-foreground">{review.userName}</h4>
            <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${
                i < review.rating 
                  ? 'fill-accent text-accent' 
                  : 'text-muted-foreground/30'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Comment */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        {review.comment}
      </p>

      {/* Helpful */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <button className="flex items-center gap-1 hover:text-primary transition-colors">
          <ThumbsUp className="w-3 h-3" />
          <span>Helpful ({review.helpful})</span>
        </button>
      </div>
    </div>
  );
}
