import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Bell, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Store in localStorage for demo
    localStorage.setItem('subscribedEmail', email);
    setIsSubscribed(true);
    
    toast({
      title: "Successfully subscribed!",
      description: "You'll get notified about new opportunities.",
    });
    
    setEmail('');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground font-bold text-sm">
              CSE
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight">CSE Jobs & Resources</h1>
              <p className="text-xs text-muted-foreground">Updated daily for students</p>
            </div>
          </div>
        </div>

        {/* Subscribe CTA */}
        <div className="flex items-center space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                <Bell className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Get Job Updates</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  Get notified when new jobs, internships, and resources are posted. 
                  We'll send you a weekly digest with the best opportunities.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-surface"
                    required
                  />
                  <Button type="submit" className="w-full bg-gradient-primary">
                    Subscribe for Free
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center">
                  No spam, unsubscribe anytime. Your email stays private.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}