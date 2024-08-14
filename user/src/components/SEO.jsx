import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = ({ title, description, keywords, hr, image, url }) => {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={hr} />
      {/* OpenGraph Tags */}
      <meta
        property="og:title"
        content={
          title || "Etsub Printing and Advertising | Quality Printing Services"
        }
      />
      <meta
        property="og:description"
        content={
          description ||
          "Etsub Printing and Advertising. We offer top-notch printing services including business cards, flyers, and t-shirt printing. Discover our services and get in touch!"
        }
      />
      <meta property="og:image" content={image || "/logo.png"} />
      <meta property="og:url" content={hr || currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Etsub Printing and Advertising" />
    </Helmet>
  );
};

export default SEO;
