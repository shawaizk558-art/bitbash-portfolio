import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[62vh] sm:min-h-[63vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60" />
      
      {/* Floating gradient blobs - Responsive sizing */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container-responsive text-center -mt-8">
         <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
           <div className="space-responsive-sm mt-8 sm:mt-14">
             <h1 className="text-4xl sm:text-[48px] font-bold leading-[1.1] tracking-tight font-sans">
               <span className="block sm:inline">Your Software, Built <span className="text-purple-600">Right</span> and Delivered <span className="text-purple-600">Fast </span></span>
               <span className="block sm:inline">by a Team That Always Delivers</span>
             </h1>
             
             <p className="text-responsive-base sm:text-responsive-lg text-black max-w-2xl mx-auto">
               The Agency for Automation Scripts and Full-Stack Apps.
             </p>
           </div>
          
          {/* Mobile-First Email Form */}
          <div className="relative max-w-3xl mx-auto -mt-20">
            <div className="relative">
              <Input 
                type="email" 
                placeholder="your@email.com"
                className="h-12 sm:h-16 text-responsive-base shadow-lg w-full rounded-2xl sm:pr-52"
              />
               <Button 
                 variant="hero" 
                 size="lg" 
                 className="h-12 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 py-4 px-6 text-lg font-semibold rounded-xl w-full sm:w-[180px] text-white hover:scale-100 shadow-none hover:shadow-none"
                 style={{
                   height: '48px'
                 }}
               >
                <span className="hidden sm:inline">Schedule a call</span>
                <span className="sm:hidden">Schedule a call</span>
              </Button>
            </div>
            
            {/* Mobile-Optimized Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-2 mt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
              ))}
            </div>
             <p className="text-responsive-xs text-black text-center sm:text-left">
               <span className="font-semibold text-black">25+ Expert Developers</span>, One Mission — Build Better Software
             </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
