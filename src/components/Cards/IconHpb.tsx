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
        // Add + prefix if not already present
        const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
        await navigator.clipboard.writeText(formattedNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else if (bluebtnlink?.includes('t.me')) {
      // Extract username from Telegram URL
      const usernameMatch = bluebtnlink.match(/t\.me\/([^/?]+)/);
      if (usernameMatch && usernameMatch[1]) {
        const username = usernameMatch[1];
        // Add @ prefix if not already present
        const formattedUsername = username.startsWith('@') ? username : `@${username}`;
        await navigator.clipboard.writeText(formattedUsername);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const isWhatsAppLink = bluebtnlink?.includes('whatsapp.com');
  const isEmailLink = bluebtnlink?.startsWith('mailto:');
  const isTelegramLink = bluebtnlink?.includes('t.me');

  // Extract phone number for WhatsApp
  const getWhatsAppNumber = () => {
    if (isWhatsAppLink && bluebtnlink) {
      const phoneMatch = bluebtnlink.match(/phone=([^&]+)/);
      if (phoneMatch && phoneMatch[1]) {
        const phoneNumber = phoneMatch[1];
        return phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      }
    }
    return null;
  };

  // Extract username for Telegram
  const getTelegramUsername = () => {
    if (isTelegramLink && bluebtnlink) {
      const usernameMatch = bluebtnlink.match(/t\.me\/([^/?]+)/);
      if (usernameMatch && usernameMatch[1]) {
        return `@${usernameMatch[1]}`;
      }
    }
    return null;
  };

  const whatsAppNumber = getWhatsAppNumber();
  const telegramUsername = getTelegramUsername();

  return (
    <div className="group p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-0.5 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-50 flex items-center justify-center ring-1 ring-gray-200 overflow-hidden transition-transform motion-safe:group-hover:animate-logo-nudge will-change-transform">{icon}</div>
        <div className="flex-1 text-left">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5">{heading}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{desc}</p>
          
          {btncontent && bluebtnlink && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {/* Button on the left */}
              <div className="flex items-center gap-2">
              <a
                href={bluebtnlink}
                {...(isEmailLink ? {} : { target: "_blank", rel: "noreferrer" })}
              >
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base h-10 px-4">{btncontent}</Button>
              </a>
                
                {/* Copy button next to email button */}
                {isEmailLink && (
                <div className="relative">
                  {copied && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                      copied
                    </span>
                  )}
                  <button
                    onClick={handleCopy}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                      title="Copy email"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  </div>
                )}
              </div>

              {/* Email display on the right (for when link prop is used) */}
              {link && !isEmailLink && (
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="bg-gray-100 rounded px-2.5 py-[1px] border border-gray-200">
                    <a href={`mailto:${link}`} className="text-xs sm:text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                      {link}
                    </a>
                  </div>
                  <div className="relative">
                    {copied && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                        copied
                      </span>
                    )}
                    <button
                      onClick={handleCopy}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                      title="Copy email"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* WhatsApp number display on the right */}
              {whatsAppNumber && (
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="bg-gray-100 rounded px-2.5 py-[1px] border border-gray-200">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {whatsAppNumber}
                    </span>
                  </div>
                  <div className="relative">
                    {copied && isWhatsAppLink && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                        copied
                      </span>
                    )}
                    <button
                      onClick={handleCopy}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                      title="Copy WhatsApp number"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Telegram username display on the right */}
              {telegramUsername && (
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="bg-gray-100 rounded px-2.5 py-[1px] border border-gray-200">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {telegramUsername}
                    </span>
                  </div>
                  <div className="relative">
                    {copied && isTelegramLink && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                        copied
                      </span>
                    )}
                    <button
                      onClick={handleCopy}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                      title="Copy Telegram username"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
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


