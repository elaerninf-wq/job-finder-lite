import { ExternalLink, Book, Map, FileText, Play, Wrench, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Resource } from '@/data/content';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { toast } = useToast();

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real app, this would open the external link
    toast({
      title: "Opening resource...",
      description: `Redirecting to ${resource.title}`,
    });
  };

  const getTypeIcon = (type: Resource['type']) => {
    const iconMap = {
      'Course': Book,
      'Roadmap': Map,
      'Cheat-sheet': FileText,
      'Playlist': Play,
      'Tools': Wrench
    };
    return iconMap[type] || Book;
  };

  const TypeIcon = getTypeIcon(resource.type);

  const getLevelColor = (level: Resource['level']) => {
    const colorMap = {
      'Beginner': 'bg-success/10 text-success border-success/20',
      'Intermediate': 'bg-warning/10 text-warning border-warning/20',
      'Advanced': 'bg-destructive/10 text-destructive border-destructive/20',
      'All levels': 'bg-primary/10 text-primary border-primary/20'
    };
    return colorMap[level] || 'bg-muted/10 text-muted-foreground border-muted/20';
  };

  return (
    <div className={cn(
      "card-bio group cursor-pointer transition-all duration-300 hover:shadow-card-hover",
      resource.featured && "ring-1 ring-primary/20 shadow-glow"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-card border border-border">
            <TypeIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className={cn("tag-chip", getLevelColor(resource.level))}>
                {resource.level}
              </span>
              {resource.featured && (
                <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                  <Award className="mr-1 h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{resource.type}</span>
              {resource.provider && (
                <>
                  <span>•</span>
                  <span>{resource.provider}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 mb-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {resource.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {resource.description}
        </p>
      </div>

      {/* Action */}
      <Button 
        onClick={handleOpen}
        variant="outline"
        className="w-full border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all"
        size="sm"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Open Resource
      </Button>
    </div>
  );
}