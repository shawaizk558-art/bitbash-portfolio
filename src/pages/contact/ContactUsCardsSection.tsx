import IconHpb from "@/components/Cards/IconHpb";
import { Mail } from "@/lib/icons";

function ContactUsCardsSection() {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[1100px] mx-auto">
        <IconHpb 
          icon={<img src="https://cdn.simpleicons.org/discord/5865F2" alt="discord logo" width={36} height={36} />} 
          heading={"Discord Support Ticket"} 
          desc={"Join the BitBash Discord and open a support ticket for fast, dedicated assistance."} 
          btncontent="Join Discord" 
          bluebtnlink="https://discord.gg/vBu9huKBvy" 
        />

        <IconHpb 
          icon={<Mail className="w-7 h-7 sm:w-8 sm:h-8 text-gray-700" />} 
          heading={"Email & Inquiries"} 
          desc={"Prefer email? We’ll get back to you promptly with clear, actionable answers."} 
          link="hello@bitbash.com" 
        />

        <IconHpb 
          icon={<img src="https://cdn.simpleicons.org/googlecalendar/1a73e8" alt="calendar icon" width={36} height={36} />} 
          heading={"Book a Demo Call"} 
          desc={"Pick a time that suits you. We’ll walk you through solutions and next steps."} 
          btncontent="Book a call" 
          bluebtnlink="https://cal.com/app-pilot-m8i8oo/30min" 
        />

        <IconHpb 
          icon={<img src="https://cdn.simpleicons.org/youtube/ff0000" alt="youtube logo" width={36} height={36} />} 
          heading={"Video Demos"} 
          desc={"Watch concise product walkthroughs and how‑to videos to see BitBash in action."} 
          btncontent="Demo Videos" 
          bluebtnlink="https://www.youtube.com/playlist?list=PLntOMYCvthNFFupW1JcikSYA6z9nDSW99" 
        />

        <IconHpb 
          icon={<img src="https://cdn.simpleicons.org/telegram/26A5E4" alt="telegram logo" width={36} height={36} />} 
          heading={"Telegram Support"} 
          desc={"Send us a quick DM on Telegram—our team is online and ready to help."} 
          btncontent="Send DM" 
          bluebtnlink="https://t.me/devpilot1" 
        />
      </div>
    </div>
  );
}

export default ContactUsCardsSection;


