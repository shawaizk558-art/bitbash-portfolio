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

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${className}`}> 
      <div className="flex -space-x-2">
        {avatarUrls.slice(0, 5).map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt="Team member"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-lg"
            loading="lazy"
          />
        ))}
      </div>
      <p className={`text-sm sm:text-base text-gray-700 text-center sm:text-left ${textClassName}`}>
        <span className="font-semibold text-gray-900">25+ Expert Developers</span>, One Mission — Build Better Software
      </p>
    </div>
  );
};


