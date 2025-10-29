import React from "react";
import { Button } from "@/components/ui/button";

type IconHpbProps = {
  icon: React.ReactNode;
  heading: string;
  desc: string;
  link?: string; // simple text link
  btncontent?: string; // label for primary button
  bluebtnlink?: string; // href for primary button
};

const IconHpb: React.FC<IconHpbProps> = ({ icon, heading, desc, link, btncontent, bluebtnlink }) => {
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
            <div className="mt-3">
              <a href={bluebtnlink} target="_blank" rel="noreferrer">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base h-10 px-4">{btncontent}</Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IconHpb;


