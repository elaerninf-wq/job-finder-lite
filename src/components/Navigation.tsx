import { cn } from '@/lib/utils';
import { TABS, type TabType } from '@/data/content';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  savedCount: number;
}

export function Navigation({ activeTab, onTabChange, savedCount }: NavigationProps) {
  return (
    <div className="sticky top-16 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-xl px-4">
        <div className="flex space-x-1 overflow-x-auto py-3 scrollbar-hide">
          {TABS.map((tab) => {
            const count = tab.id === 'saved' ? savedCount : tab.count;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "nav-pill flex-shrink-0 flex items-center space-x-2 whitespace-nowrap",
                  isActive && "active"
                )}
              >
                <span>{tab.label}</span>
                {count !== undefined && count > 0 && (
                  <span className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium",
                    isActive 
                      ? "bg-primary-foreground text-primary" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}