import { useState, useEffect } from 'react';
import { ExternalLink, Clock, Tag, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Offer } from '@/data/content';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface OfferCardProps {
  offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const expiryDate = new Date(offer.expiresAt);
      const timeDiff = expiryDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setIsExpiringSoon(days <= 2);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [offer.expiresAt]);

  const handleClaim = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real app, this would open the external link
    toast({
      title: "Redirecting to offer...",
      description: `Opening ${offer.provider}'s offer page`,
    });
  };

  const savings = offer.originalPrice && offer.discountedPrice 
    ? calculateSavings(offer.originalPrice, offer.discountedPrice)
    : null;

  return (
    <div className={cn(
      "card-bio group cursor-pointer transition-all duration-300 hover:shadow-card-hover",
      offer.featured && "ring-1 ring-primary/20 shadow-glow"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-card text-2xl font-bold border border-border">
            {offer.logo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              {offer.isFree ? (
                <Badge className="bg-success text-success-foreground">
                  <Tag className="mr-1 h-3 w-3" />
                  FREE
                </Badge>
              ) : savings && (
                <Badge className="bg-warning text-warning-foreground">
                  <Tag className="mr-1 h-3 w-3" />
                  {savings}% OFF
                </Badge>
              )}
              {offer.featured && (
                <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                  <Award className="mr-1 h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{offer.provider}</p>
          </div>
        </div>
        
        <div className={cn(
          "flex items-center space-x-1 text-xs font-medium",
          isExpiringSoon ? "text-warning" : "text-muted-foreground"
        )}>
          <Clock className="h-4 w-4" />
          <span>{timeLeft}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 mb-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {offer.course}
        </h3>
        
        {/* Pricing */}
        <div className="flex items-center space-x-2">
          {offer.isFree ? (
            <span className="text-lg font-bold text-success">Free</span>
          ) : (
            <div className="flex items-center space-x-2">
              {offer.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {offer.originalPrice}
                </span>
              )}
              <span className="text-lg font-bold text-primary">
                {offer.discountedPrice || offer.originalPrice}
              </span>
            </div>
          )}
        </div>

        {/* Expiry Warning */}
        {isExpiringSoon && (
          <div className="flex items-center space-x-2 text-sm text-warning bg-warning/10 px-3 py-2 rounded-lg">
            <Clock className="h-4 w-4" />
            <span>Offer ending soon!</span>
          </div>
        )}
      </div>

      {/* Action */}
      <Button 
        onClick={handleClaim}
        className={cn(
          "w-full transition-all",
          offer.isFree || isExpiringSoon
            ? "bg-gradient-primary hover:opacity-90"
            : "bg-secondary hover:bg-secondary/80"
        )}
        size="sm"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        {offer.isFree ? 'Claim Free' : 'Get Offer'}
      </Button>
    </div>
  );
}

function calculateSavings(original: string, discounted: string): number {
  const originalNum = parseFloat(original.replace(/[^0-9.]/g, ''));
  const discountedNum = parseFloat(discounted.replace(/[^0-9.]/g, ''));
  return Math.round(((originalNum - discountedNum) / originalNum) * 100);
}