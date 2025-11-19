import { useId } from "react";

interface StructuredDataProps {
  data: unknown;
  id?: string;
}

export const StructuredData = ({ data, id }: StructuredDataProps) => {
  const generatedId = useId();
  const scriptId = id ?? `structured-data-${generatedId}`;

  return (
    <script
      type="application/ld+json"
      id={scriptId}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
};

