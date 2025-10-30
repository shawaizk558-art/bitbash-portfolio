import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/SocialProof";

export const Hero = () => {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[65vh] flex items-center justify-center overflow-hidden pt-16 pb-8 sm:pb-12 lg:pb-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60 z-0" />
      
      {/* Floating gradient blobs - Responsive sizing, preserve desktop */}
      <div className="absolute top-10 sm:top-16 lg:top-20 left-2 sm:left-6 lg:left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-primary/20 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-10 sm:bottom-16 lg:bottom-20 right-2 sm:right-6 lg:right-10 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-accent/20 rounded-full blur-3xl animate-float z-0" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container-responsive text-center lg:-mt-10">
         <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
           <div className="space-responsive-sm mt-6 sm:mt-10 lg:mt-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold leading-[1.1] tracking-tight font-sans px-2 sm:px-0">
              <span className="block sm:inline">Your Software, Built <span className="text-purple-600">Right</span> — Delivered <span className="text-purple-600">Fast</span> by a Team You Can Count On.</span>
            </h1>
             
            <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-black mx-auto max-w-none whitespace-normal overflow-visible break-words px-4 sm:px-0">
              The Software Development Agency for Full Stack Apps and Scripts
            </p>
           </div>
          
         {/* Call-to-Action Buttons (no input) */}
         <div className="relative max-w-3xl mx-auto mt-8 sm:mt-10 lg:-mt-20">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:-translate-y-2">
             <Button 
               variant="outline" 
               size="lg" 
               className="h-12 lg:h-12 py-4 px-6 text-base sm:text-lg lg:text-lg font-semibold rounded-xl w-full sm:w-auto bg-transparent hover:bg-transparent text-gray-900 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg shadow-gray-400/20 hover:shadow-gray-400/35 transition-colors transition-shadow duration-300"
               asChild
             >
               <a href="/contact">Contact Us</a>
             </Button>
             <Button 
               variant="hero" 
               size="lg" 
               className="h-12 lg:h-12 py-4 px-6 text-base sm:text-lg lg:text-lg font-semibold rounded-xl w-full sm:w-auto hover:scale-100 shadow-sm hover:shadow-lg shadow-gray-400/20 hover:shadow-gray-400/35 transition-colors transition-shadow duration-300"
             >
               Schedule a Call
             </Button>
           </div>
            
            {/* Social Proof - Reusable */}
            <SocialProof 
              className="pt-6 sm:pt-8 pb-4 sm:pb-8 lg:pb-8"
              avatars={["/zee.jpg", "/awais.jpg", "/hassan-arslan.png", "/mughees.jpg", "/fras.png"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
