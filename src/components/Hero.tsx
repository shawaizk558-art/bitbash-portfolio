import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/SocialProof";

export const Hero = () => {
  return (
    <section className="relative min-h-[57vh] sm:min-h-[57vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60" />
      
      {/* Floating gradient blobs - Responsive sizing */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container-responsive text-center -mt-10">
         <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
           <div className="space-responsive-sm mt-8 sm:mt-14">
            <h1 className="text-4xl sm:text-[48px] font-bold leading-[1.1] tracking-tight font-sans">
              <span className="block sm:inline">Your Software, Built <span className="text-purple-600">Right</span> — Delivered <span className="text-purple-600">Fast</span> by a Team You Can Count On.</span>
            </h1>
             
            <p className="text-[19px] sm:text-[21px] text-black mx-auto max-w-none whitespace-normal overflow-visible break-words">
              The Software Development Agency for Full Stack Apps and Scripts
            </p>
           </div>
          
         {/* Call-to-Action Buttons (no input) */}
         <div className="relative max-w-3xl mx-auto -mt-20">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 -translate-y-2">
             <Button 
               variant="outline" 
               size="lg" 
               className="h-12 py-4 px-6 text-lg font-semibold rounded-xl w-full sm:w-auto bg-transparent hover:bg-transparent text-gray-900 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg shadow-gray-400/20 hover:shadow-gray-400/35 transition-colors transition-shadow duration-300"
               asChild
               style={{ height: '48px' }}
             >
               <a href="/contact">Contact Us</a>
             </Button>
             <Button 
               variant="hero" 
               size="lg" 
               className="h-12 py-4 px-6 text-lg font-semibold rounded-xl w-full sm:w-auto hover:scale-100 shadow-sm hover:shadow-lg shadow-gray-400/20 hover:shadow-gray-400/35 transition-colors transition-shadow duration-300"
               style={{ height: '48px' }}
             >
               Schedule a Call
             </Button>
           </div>
            
            {/* Social Proof - Reusable */}
            <SocialProof 
              className="pt-6 pb-8"
              avatars={["/zee.jpg", "/awais.jpg", "/hassan-arslan.png", "/mughees.jpg", "/fras.png"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
