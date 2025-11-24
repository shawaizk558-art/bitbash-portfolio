type MediaAsset = {
  videoKey: string | null;
  alt: string;
  avatarSrc: string;
  avatarAlt: string;
  avatarWrapperClass: string;
};

const MEDIA_MAP: Record<string, Partial<MediaAsset>> = {
  petla: {
    videoKey: "petla",
    alt: "Petla website preview",
    avatarSrc: "/petla.svg",
    avatarAlt: "Petla Logo",
    avatarWrapperClass: "bg-white p-1",
  },
  "actuary-list": {
    videoKey: "actuarylist",
    alt: "Actuary List website preview",
    avatarSrc: "/actuarylist-logo.png",
    avatarAlt: "Actuary List Logo",
    avatarWrapperClass: "bg-white",
  },
  "scraper-glass": {
    videoKey: "scraperglass",
    alt: "Scraper Glass website preview",
    avatarSrc: "/scraperglass-logo.png",
    avatarAlt: "Scraper Glass Logo",
  },
  "threads-scraper": {
    videoKey: "threads-scraper",
    alt: "Threads Scraper preview",
    avatarSrc: "/avatars/threads.svg",
    avatarAlt: "Threads Logo",
    avatarWrapperClass: "bg-white p-1.5",
  },
  "twitter-bot": {
    videoKey: "twitter",
    alt: "Twitter Bot preview",
    avatarSrc: "/avatars/x.svg",
    avatarAlt: "Twitter/X Logo",
    avatarWrapperClass: "bg-white p-1.5",
  },
  ttinit: {
    videoKey: "ttinit",
    alt: "TTinit TikTok Shop Affiliate Outreach Bot preview",
    avatarSrc: "/ttinit-logo.png",
    avatarAlt: "TTinit Logo",
  },
  "spotify-bot": {
    videoKey: "spotify",
    alt: "Spotify Bot preview",
    avatarSrc: "/avatars/spotify.svg",
    avatarAlt: "Spotify Logo",
    avatarWrapperClass: "bg-white p-1.5",
  },
  purepeak: {
    videoKey: "purepeak",
    alt: "PurePeak TikTok Shop scaling preview",
    avatarSrc: "/purepeak_ltd_logo.jpeg",
    avatarAlt: "PurePeak Logo",
  },
  "facebook-scraper": {
    videoKey: "facebook",
    alt: "Facebook Scraper preview",
    avatarSrc: "/avatars/facebook.svg",
    avatarAlt: "Facebook Logo",
    avatarWrapperClass: "bg-white p-1.5",
  },
  "linkedin-automation": {
    videoKey: "linkedin-automation",
    alt: "LinkedIn Automation System preview",
    avatarSrc: "/avatars/linkedin.svg",
    avatarAlt: "LinkedIn Logo",
    avatarWrapperClass: "bg-white p-1.5",
  },
  "spotify-automation": {
    videoKey: "spotify",
    alt: "Spotify automation preview",
  },
};

export const getMediaAssets = (slug: string): MediaAsset => {
  const defaults: MediaAsset = {
    videoKey: null,
    alt: `${slug} preview`,
    avatarSrc: "",
    avatarAlt: `${slug} logo`,
    avatarWrapperClass: "bg-gradient-to-br from-purple-400 to-purple-600",
  };

  const overrides = MEDIA_MAP[slug];

  if (!overrides) {
    return defaults;
  }

  return {
    ...defaults,
    avatarWrapperClass: "bg-white",
    ...overrides,
  };
};

export const getVideoSources = (videoKey: string) => [
  { src: `/media/${videoKey}.webm`, type: "video/webm" },
  { src: `/media/${videoKey}.mp4`, type: "video/mp4" },
];

export const getPosterPath = (videoKey: string) =>
  `/media-posters/${videoKey}.jpg`;

