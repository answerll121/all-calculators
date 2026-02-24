import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SEO = ({
    title,
    description,
    keywords,
    image,
    type = 'website',
    schema,
    fullTitle = false,
    schemaOnly = false
}) => {
    const { t, i18n } = useTranslation();
    const location = useLocation();

    // Construct Canonical URL (remove query params for strict canonical)
    const siteUrl = 'https://all-calculators-seven.vercel.app'; // Replace with actual domain when deployed
    const canonicalUrl = `${siteUrl}${location.pathname}`;

    const appTitle = t('app_title', { defaultValue: '모든 계산기' });
    const pageTitle = fullTitle ? title : `${title} | ${appTitle}`;
    const metaDescription = description || t('fallback_desc', { title: title || '모든 계산기', defaultValue: `${title || '모든 계산기'}는 쉽고 빠르게 처리해 주는 무료 계산기입니다.` });
    const metaImage = image || `${siteUrl}/icon.png.png`; // Default OG image

    // Dynamic JSON-LD Schema
    const structuredData = schema ? JSON.stringify(schema) : null;

    if (schemaOnly) {
        return (
            <Helmet>
                {structuredData && (
                    <script type="application/ld+json">
                        {structuredData}
                    </script>
                )}
            </Helmet>
        );
    }

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={keywords || t('search_placeholder')} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content={appTitle} />
            <meta property="og:locale" content={i18n.language} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* JSON-LD Schema Markup */}
            {structuredData && (
                <script type="application/ld+json">
                    {structuredData}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
