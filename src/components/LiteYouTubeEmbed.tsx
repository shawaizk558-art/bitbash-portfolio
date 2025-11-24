import { ReactNode, useMemo } from "react";

interface LiteYouTubeEmbedProps {
  videoId: string;
  title: string;
  isPlaying: boolean;
  onPlay: () => void;
  className?: string;
  placeholderClassName?: string;
  params?: string;
  children: ReactNode;
}

export const LiteYouTubeEmbed = ({
  videoId,
  title,
  isPlaying,
  onPlay,
  className,
  placeholderClassName,
  params = "rel=0&modestbranding=1&playsinline=1",
  children,
}: LiteYouTubeEmbedProps) => {
  const src = useMemo(() => {
    const separator = params ? "&" : "";
    return `https://www.youtube.com/embed/${videoId}?${params}${separator}autoplay=1`;
  }, [params, videoId]);

  if (isPlaying) {
    return (
      <iframe
        className={className}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className={placeholderClassName ?? className}
      onClick={onPlay}
      aria-label={`Play ${title}`}
      style={{ padding: 0 }}
    >
      {children}
    </button>
  );
};

