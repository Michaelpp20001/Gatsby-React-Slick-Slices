import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql, Link } from 'gatsby';

export default function SEO({ title, location, image, children, description }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <Link rel="alternate icon" href="/favicon.ico" />
      {/* Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/image.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      {children}
    </Helmet>
  );
}
