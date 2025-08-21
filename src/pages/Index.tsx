import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { SearchAndFilters, type Filters } from '@/components/SearchAndFilters';
import { JobCard } from '@/components/JobCard';
import { ResourceCard } from '@/components/ResourceCard';
import { OfferCard } from '@/components/OfferCard';
import { JOBS, RESOURCES, OFFERS, type TabType, type Job, type Resource, type Offer } from '@/data/content';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    location: '',
    experience: '',
    type: '',
    remote: false
  });

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever savedJobs changes
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const handleSaveToggle = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Filter and search logic
  const filterJobs = (jobs: Job[]) => {
    return jobs.filter(job => {
      const matchesSearch = !filters.search || 
        job.role.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesExperience = !filters.experience || job.experience === filters.experience;
      const matchesType = !filters.type || job.type === filters.type;
      const matchesRemote = !filters.remote || job.location.toLowerCase().includes('remote');

      return matchesSearch && matchesLocation && matchesExperience && matchesType && matchesRemote;
    });
  };

  const filterResources = (resources: Resource[]) => {
    return resources.filter(resource => {
      const matchesSearch = !filters.search ||
        resource.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        resource.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        resource.type.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesSearch;
    });
  };

  const filterOffers = (offers: Offer[]) => {
    return offers.filter(offer => {
      const matchesSearch = !filters.search ||
        offer.course.toLowerCase().includes(filters.search.toLowerCase()) ||
        offer.provider.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesSearch;
    });
  };

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'jobs':
        return filterJobs(JOBS.filter(job => job.type === 'Full-time'));
      case 'internships':
        return filterJobs(JOBS.filter(job => job.type === 'Internship'));
      case 'resources':
        return filterResources(RESOURCES);
      case 'offers':
        return filterOffers(OFFERS);
      case 'saved':
        return filterJobs(JOBS.filter(job => savedJobs.includes(job.id)));
      default:
        return [];
    }
  };

  const currentData = getCurrentData();
  const showFilters = activeTab === 'jobs' || activeTab === 'internships' || activeTab === 'saved';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        savedCount={savedJobs.length}
      />

      {/* Main Content */}
      <main className="container max-w-screen-xl px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Find Your Next Opportunity
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jobs, internships, and free learning resources—updated daily for CS students and professionals.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8">
          <SearchAndFilters
            filters={filters}
            onFiltersChange={setFilters}
            showFilters={showFilters}
            resultCount={currentData.length}
          />
        </div>

        {/* Content Grid */}
        {currentData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.map((item) => {
              if (activeTab === 'jobs' || activeTab === 'internships' || activeTab === 'saved') {
                const job = item as Job;
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSaveToggle={handleSaveToggle}
                    isSaved={savedJobs.includes(job.id)}
                  />
                );
              } else if (activeTab === 'resources') {
                const resource = item as Resource;
                return <ResourceCard key={resource.id} resource={resource} />;
              } else if (activeTab === 'offers') {
                const offer = item as Offer;
                return <OfferCard key={offer.id} offer={offer} />;
              }
              return null;
            })}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="mb-4">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === 'saved' 
                ? "You haven't saved any jobs yet. Start exploring and save your favorites!"
                : "Try adjusting your search or filters to find more opportunities."
              }
            </p>
            {filters.search || filters.location || filters.experience || filters.type || filters.remote ? (
              <Button 
                onClick={() => setFilters({
                  search: '',
                  location: '',
                  experience: '',
                  type: '',
                  remote: false
                })}
                variant="outline"
                className="border-primary/20 hover:bg-primary/10"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            ) : null}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <div className="space-y-4">
            <p>
              <strong>Disclaimer:</strong> We aggregate publicly available job listings and resources. 
              Always verify details on official company pages before applying.
            </p>
            <div className="flex justify-center items-center space-x-6">
              <span>© 2025 CSE Jobs & Resources</span>
              <span>•</span>
              <span>Updated daily</span>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
