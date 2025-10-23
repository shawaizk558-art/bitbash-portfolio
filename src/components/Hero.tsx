import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60" />
      
      {/* Floating gradient blobs - Responsive sizing */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container-responsive text-center">
         <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
           <div className="space-responsive-sm">
             <h1 className="text-responsive-4xl sm:text-responsive-5xl font-bold leading-[1.1] tracking-tight font-sans">
               Automate Any Process <br className="hidden sm:block" /> 
               <span className="block sm:inline">Scale Without Limits.</span>
             </h1>
             
             <p className="text-responsive-base sm:text-responsive-lg text-muted-foreground max-w-2xl mx-auto">
               Browser Automation, Data Scraping & Mobile Automation Built for Growth
             </p>
           </div>
          
          {/* Mobile-First Email Form */}
          <div className="relative max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <Input 
                type="email" 
                placeholder="your@email.com"
                className="h-12 sm:h-16 text-responsive-base shadow-lg w-full rounded-2xl sm:pr-52"
              />
              <Button 
                variant="hero" 
                size="lg" 
                className="h-12 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 px-6 text-responsive-sm font-semibold rounded-xl w-full sm:w-auto"
              >
                <span className="hidden sm:inline">Book Free Automation Audit</span>
                <span className="sm:hidden">Book Free Audit</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile-Optimized Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-2 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
              ))}
            </div>
            <p className="text-responsive-xs text-muted-foreground text-center sm:text-left">
              Trusted by <span className="font-semibold text-foreground">50+</span> Businesses Worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
