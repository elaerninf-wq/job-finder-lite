import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export interface Filters {
  search: string;
  location: string;
  experience: string;
  type: string;
  remote: boolean;
}

interface SearchAndFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  showFilters?: boolean;
  resultCount?: number;
}

export function SearchAndFilters({ 
  filters, 
  onFiltersChange, 
  showFilters = true,
  resultCount 
}: SearchAndFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleFilterChange = (key: keyof Filters, value: string | boolean) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      location: '',
      experience: '',
      type: '',
      remote: false
    });
  };

  const hasActiveFilters = filters.location || filters.experience || filters.type || filters.remote;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search jobs, companies, or skills..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-12 bg-surface border-border"
        />
        {showFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Filter className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && showAdvanced && (
        <div className="grid gap-4 p-4 border border-border rounded-lg bg-surface/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              value={filters.location}
              onValueChange={(value) => handleFilterChange('location', value)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi/NCR</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.experience}
              onValueChange={(value) => handleFilterChange('experience', value)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">Fresher (0-1 years)</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange('type', value)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={filters.remote ? "default" : "outline"}
              onClick={() => handleFilterChange('remote', !filters.remote)}
              className="justify-start"
            >
              Remote Only
            </Button>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {filters.location && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.location}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange('location', '')}
                    />
                  </Badge>
                )}
                {filters.experience && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.experience}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange('experience', '')}
                    />
                  </Badge>
                )}
                {filters.type && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.type}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange('type', '')}
                    />
                  </Badge>
                )}
                {filters.remote && (
                  <Badge variant="secondary" className="gap-1">
                    Remote Only
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange('remote', false)}
                    />
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      {resultCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </div>
      )}
    </div>
  );
}