import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    image?: string;
    robots?: string;
    keywords?: string;
    structuredData?: object | object[];
}

export const SEO = ({ title, description, canonical, image, robots = "index, follow", keywords, structuredData }: SEOProps) => {
    // Use the canonical host Google should index to avoid duplicates between www/non-www
    const siteUrl = 'https://bitbash.dev';
    const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
    
    // Truncate description to optimal length for meta tags (150-160 chars)
    const metaDescription = description && description.length > 160 
        ? description.substring(0, 157).trim() + '...'
        : description;
    
    // Only use OG image if explicitly provided
    const metaImage = image ? `${siteUrl}${image}` : null;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={robots} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            {metaImage && (
                <>
                    <meta property="og:image" content={metaImage} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                </>
            )}
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content="BitBash" />
            {keywords && <meta property="og:keywords" content={keywords} />}

            {/* Twitter */}
            <meta name="twitter:card" content={metaImage ? "summary_large_image" : "summary"} />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            {metaImage && <meta name="twitter:image" content={metaImage} />}
            {keywords && <meta name="twitter:keywords" content={keywords} />}

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                Array.isArray(structuredData) ? (
                    structuredData.map((schema, index) => (
                        <script key={index} type="application/ld+json">
                            {JSON.stringify(schema)}
                        </script>
                    ))
                ) : (
                    <script type="application/ld+json">
                        {JSON.stringify(structuredData)}
                    </script>
                )
            )}
        </Helmet>
    );
};
