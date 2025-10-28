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
      
      <div className="relative z-10 container-responsive text-center -mt-20">
         <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
           <div className="space-responsive-sm mt-8 sm:mt-14">
            <h1 className="text-4xl sm:text-[48px] font-bold leading-[1.1] tracking-tight font-sans">
              <span className="block sm:inline">Your Software, Built <span className="text-purple-600">Right</span> — Delivered <span className="text-purple-600">Fast</span> by a Team You Can Count On.</span>
            </h1>
             
            <p className="text-[19px] sm:text-[21px] text-black mx-auto max-w-none whitespace-normal overflow-visible break-words">
              The Software Development Agency for Full Stack Apps and Scripts
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
            
            {/* Social Proof - Match CTA styling */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white shadow-lg"
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 text-center sm:text-left">
                <span className="font-semibold text-gray-900">25+ Expert Developers</span>, One Mission — Build Better Software
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
