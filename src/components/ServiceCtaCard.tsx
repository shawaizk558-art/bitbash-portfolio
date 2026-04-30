
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCtaCardProps {
  title: string;
  description: string;
  priceLabel?: string;
  bullets: string[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export const ServiceCtaCard = ({
  title,
  description,
  priceLabel = "Custom pricing",
  bullets,

}: ServiceCtaCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border border-purple-100 shadow-md overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
        <div className="space-y-4 sm:space-y-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl">{description}</p>
          <div>
            <p className="text-sm font-semibold text-gray-600">Starting from</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">{priceLabel}</p>
          </div>
          
        </div>
        <div className="space-y-3">
          {bullets.map((bullet) => (
            <div key={bullet} className="flex items-start gap-3 text-base text-gray-800">
              <Check className="w-5 h-5 text-purple-600 mt-0.5" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

