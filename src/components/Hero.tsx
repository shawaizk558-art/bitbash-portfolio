import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60" />
      
      {/* Floating gradient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
           <div className="space-y-4">
             <h1 className="font-bold leading-[1.1] tracking-tight font-sans" style={{ fontSize: '48px' }}>
               Transform Your Business Today
               <br />
               with <span className="text-primary">Intelligent</span> Software Solutions
             </h1>
             
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               The Complete Platform for Modern Teams and Innovators
             </p>
           </div>
          
          <div className="relative max-w-3xl mx-auto">
            <Input 
              type="email" 
              placeholder="your@email.com"
              className="h-16 text-lg shadow-lg pr-52 w-full rounded-2xl"
            />
            <Button 
              variant="hero" 
              size="lg" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 text-base font-semibold rounded-xl"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">10,000+</span> Teams Worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
