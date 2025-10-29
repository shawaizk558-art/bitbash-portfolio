const logos = [
  { src: "https://cdn.simpleicons.org/javascript/000000", alt: "JavaScript" },
  { src: "https://cdn.simpleicons.org/typescript/000000", alt: "TypeScript" },
  { src: "https://cdn.simpleicons.org/react/000000", alt: "React" },
  { src: "https://cdn.simpleicons.org/nextdotjs/000000", alt: "Next.js" },
  { src: "https://cdn.simpleicons.org/nodedotjs/000000", alt: "Node.js" },
  { src: "https://cdn.simpleicons.org/python/000000", alt: "Python" },
  { src: "https://cdn.simpleicons.org/docker/000000", alt: "Docker" },
  { src: "https://cdn.simpleicons.org/kubernetes/000000", alt: "Kubernetes" },
  { src: "https://cdn.simpleicons.org/puppeteer/000000", alt: "Puppeteer" },
  { src: "https://cdn.simpleicons.org/selenium/000000", alt: "Selenium" },
  { src: "https://cdn.simpleicons.org/github/000000", alt: "GitHub" },
  { src: "https://cdn.simpleicons.org/postgresql/000000", alt: "PostgreSQL" },
  { src: "https://cdn.simpleicons.org/redis/000000", alt: "Redis" },
  { src: "https://cdn.simpleicons.org/tailwindcss/000000", alt: "TailwindCSS" },
  { src: "https://cdn.simpleicons.org/vite/000000", alt: "Vite" },
];

export default function TechLogos() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container-responsive">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-8 opacity-80">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-10 sm:h-12 md:h-12 object-contain grayscale opacity-80 transition-transform motion-safe:hover:animate-logo-nudge will-change-transform"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}


