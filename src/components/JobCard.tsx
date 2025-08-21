import { useState, useEffect } from 'react';
import { ExternalLink, Bookmark, BookmarkCheck, MapPin, Calendar, DollarSign, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Job } from '@/data/content';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface JobCardProps {
  job: Job;
  onSaveToggle: (jobId: string) => void;
  isSaved: boolean;
}

export function JobCard({ job, onSaveToggle, isSaved }: JobCardProps) {
  const { toast } = useToast();
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const posted = new Date(job.postedAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - posted.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Posted today';
      if (diffDays <= 7) return `Posted ${diffDays} days ago`;
      return `Posted ${Math.floor(diffDays / 7)} weeks ago`;
    };
    
    setTimeAgo(calculateTimeAgo());
  }, [job.postedAt]);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    onSaveToggle(job.id);
    toast({
      title: isSaved ? "Removed from saved" : "Saved successfully!",
      description: isSaved ? "Job removed from your saved list" : "Job saved to your list",
    });
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real app, this would open the external link
    toast({
      title: "Redirecting to application...",
      description: `Opening ${job.company}'s application page`,
    });
  };

  const isDeadlineSoon = job.deadline && new Date(job.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className={cn(
      "card-bio group cursor-pointer transition-all duration-300 hover:shadow-card-hover",
      job.featured && "ring-1 ring-primary/20 shadow-glow"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-card text-2xl font-bold border border-border">
            {job.logo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {job.role}
              </h3>
              {job.featured && (
                <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                  <Award className="mr-1 h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{job.company}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            isSaved && "text-primary"
          )}
        >
          {isSaved ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span>{job.ctc || job.stipend}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {job.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag-chip">
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="tag-chip">
              +{job.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Deadline Warning */}
        {job.deadline && (
          <div className={cn(
            "flex items-center space-x-2 text-sm",
            isDeadlineSoon ? "text-warning" : "text-muted-foreground"
          )}>
            <Calendar className="h-4 w-4" />
            <span>
              Apply by {new Date(job.deadline).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
              {isDeadlineSoon && " - Closing Soon!"}
            </span>
          </div>
        )}
      </div>

      {/* Action */}
      <Button 
        onClick={handleApply}
        className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        size="sm"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Apply Now
      </Button>
    </div>
  );
}