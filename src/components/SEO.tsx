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
    const siteUrl = 'https://bitbash.dev';
    const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
    const metaImage = image ? `${siteUrl}${image}` : `${siteUrl}/placeholder.webp`;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={robots} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content="BitBash" />
            {keywords && <meta property="og:keywords" content={keywords} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={metaImage} />
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
