import IconHpb from "@/components/Cards/IconHpb";

function ContactUsCardsSection() {
  return (
    <div className="py-8">
      <div className="container-responsive">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[1100px] mx-auto lg:mx-0 lg:max-w-none lg:w-full 2xl:gap-6">
          <IconHpb
            icon={<img src="https://cdn.simpleicons.org/gmail/EA4335" alt="mail logo" width={36} height={36} />}
            heading={"Email Support"}
            desc={"Need help fast? Email our support specialists for detailed, reliable answers."}
            btncontent="sale@bitbash.dev"
            bluebtnlink="mailto:sale@bitbash.dev"
          />

          <IconHpb
            icon={<img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="whatsapp logo" width={36} height={36} />}
            heading={"WhatsApp & Inquiries"}
            desc={"Get in touch via WhatsApp for instant responses. We're here to help you with your needs"}
            btncontent="Message on WhatsApp"
            bluebtnlink="https://api.whatsapp.com/send/?phone=923249868488&text=Hi+Zeeshan%2C+I%27m+interested+in+automation.&type=phone_number&app_absent=0"
          />

          <IconHpb
            icon={<img src="https://cdn.simpleicons.org/googlecalendar/1a73e8" alt="calendar icon" width={36} height={36} />}
            heading={"Book a Demo Call"}
            desc={"Pick a time that suits you. We'll walk you through solutions and next steps."}
            btncontent="Book a call"
            bluebtnlink="https://calendar.app.google/RSyUVmGtkqpucGCY7"
          />

          <IconHpb
            icon={<img src="https://cdn.simpleicons.org/telegram/26A5E4" alt="telegram logo" width={36} height={36} />}
            heading={"Telegram Support"}
            desc={"Send us a quick DM on Telegram—our team is online and ready to help you."}
            btncontent="Send DM"
            bluebtnlink="https://t.me/Bitbash333"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactUsCardsSection;


