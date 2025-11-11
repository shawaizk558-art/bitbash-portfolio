import { useEffect } from "react";

export interface SocialProofProps {
  className?: string;
  textClassName?: string;
  avatars?: string[];
}

export const SocialProof = ({ className = "", textClassName = "", avatars }: SocialProofProps) => {
  const avatarUrls = avatars && avatars.length > 0
    ? avatars
    : [
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
      ];

  // Preload all avatar images instantly on component mount
  useEffect(() => {
    avatarUrls.slice(0, 5).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [avatarUrls]);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${className}`}> 
      <div className="flex -space-x-2">
        {avatarUrls.slice(0, 5).map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt="Team member"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-lg"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        ))}
      </div>
      <p className={`text-sm sm:text-base text-gray-700 text-center sm:text-left ${textClassName}`}>
        <span className="font-semibold text-gray-900">25+ Expert Developers</span>, One Mission — Build Better Software
      </p>
    </div>
  );
};


