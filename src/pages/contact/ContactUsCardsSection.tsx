import IconHpb from "@/components/Cards/IconHpb";

function ContactUsCardsSection() {
  return (
    <div className="py-8">
      <div className="container-responsive">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[1100px] mx-auto lg:mx-0 lg:max-w-none lg:w-full 2xl:gap-6">
          <IconHpb 
          icon={<img src="https://cdn.simpleicons.org/discord/5865F2" alt="discord logo" width={36} height={36} />} 
          heading={"Discord Support Ticket"} 
          desc={"Join the BitBash Discord and open a support ticket for fast, dedicated assistance."} 
          btncontent="Join Discord" 
          bluebtnlink="https://discord.gg/vBu9huKBvy" 
        />

          <IconHpb 
          icon={<img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="whatsapp logo" width={36} height={36} />} 
          heading={"WhatsApp & Inquiries"} 
          desc={"Get in touch via WhatsApp for instant responses. We're here to help with your automation needs."} 
          btncontent="Message on WhatsApp" 
          bluebtnlink="https://api.whatsapp.com/send/?phone=923249868488&text=Hi+Zeeshan%2C+I%27m+interested+in+automation.&type=phone_number&app_absent=0" 
        />

          <IconHpb 
          icon={<img src="https://cdn.simpleicons.org/googlecalendar/1a73e8" alt="calendar icon" width={36} height={36} />} 
          heading={"Book a Demo Call"} 
          desc={"Pick a time that suits you. We'll walk you through solutions and next steps."} 
          btncontent="Book a call" 
          bluebtnlink="https://cal.com/app-pilot-m8i8oo/30min" 
        />

          <IconHpb 
          icon={<img src="https://cdn.simpleicons.org/youtube/ff0000" alt="youtube logo" width={36} height={36} />} 
          heading={"Video Demos"} 
          desc={"Watch concise product walkthroughs and how‑to videos to see BitBash in action."} 
          btncontent="Visit Channel" 
          bluebtnlink="https://www.youtube.com/@bitbash-demos" 
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
    </div>
  );
}

export default ContactUsCardsSection;


