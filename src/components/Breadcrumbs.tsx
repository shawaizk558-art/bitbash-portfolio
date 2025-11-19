import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = item.href.startsWith("http") ? (
            <a href={item.href} className={isLast ? "text-gray-900 font-medium" : "hover:text-purple-600 transition"}>
              {item.name}
            </a>
          ) : (
            <Link to={item.href} className={isLast ? "text-gray-900 font-medium" : "hover:text-purple-600 transition"}>
              {item.name}
            </Link>
          );

          return (
            <li key={item.href} className="flex items-center gap-1">
              {content}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

