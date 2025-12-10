import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type IconHpbProps = {
  icon: React.ReactNode;
  heading: string;
  desc: string;
  link?: string; // simple text link
  btncontent?: string; // label for primary button
  bluebtnlink?: string; // href for primary button
};

const IconHpb: React.FC<IconHpbProps> = ({ icon, heading, desc, link, btncontent, bluebtnlink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (bluebtnlink?.startsWith('mailto:')) {
      const email = bluebtnlink.replace('mailto:', '');
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (bluebtnlink?.includes('whatsapp.com')) {
      // Extract phone number from WhatsApp URL
      const phoneMatch = bluebtnlink.match(/phone=([^&]+)/);
      if (phoneMatch && phoneMatch[1]) {
        const phoneNumber = phoneMatch[1];
        await navigator.clipboard.writeText(phoneNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else if (bluebtnlink?.includes('t.me')) {
      // Extract username from Telegram URL
      const usernameMatch = bluebtnlink.match(/t\.me\/([^/?]+)/);
      if (usernameMatch && usernameMatch[1]) {
        const username = usernameMatch[1];
        await navigator.clipboard.writeText(username);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const isWhatsAppLink = bluebtnlink?.includes('whatsapp.com');
  const isEmailLink = bluebtnlink?.startsWith('mailto:');
  const isTelegramLink = bluebtnlink?.includes('t.me');

  return (
    <div className="group p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-0.5 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-50 flex items-center justify-center ring-1 ring-gray-200 overflow-hidden transition-transform motion-safe:group-hover:animate-logo-nudge will-change-transform">{icon}</div>
        <div className="flex-1 text-left">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5">{heading}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{desc}</p>
          {link && (
            <a href={`mailto:${link}`} className="inline-block text-sm sm:text-base font-semibold text-purple-600 hover:text-purple-700">
              {link}
            </a>
          )}
          {btncontent && bluebtnlink && (
            <div className="mt-3 flex gap-4 items-center">
              <a
                href={bluebtnlink}
                {...(isEmailLink ? {} : { target: "_blank", rel: "noreferrer" })}
              >
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base h-10 px-4">{btncontent}</Button>
              </a>
              {(isEmailLink || isWhatsAppLink || isTelegramLink) && (
                <div className="relative">
                  {copied && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                      copied
                    </span>
                  )}
                  <button
                    onClick={handleCopy}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    title={isEmailLink ? "Copy email" : isWhatsAppLink ? "Copy WhatsApp number" : "Copy Telegram username"}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div> 
      </div>
    </div>
  );
};

export default IconHpb;


