import { FC } from "react";

interface MetadataProps {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title: string;
    description: string;
    type: string;
    image?: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image?: string;
  };
}

const CustomMetadata: FC<MetadataProps> = ({
  title,
  description,
  keywords,
  openGraph,
  twitter,
}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph Tags */}
      {openGraph && (
        <>
          <meta property="og:title" content={openGraph.title} />
          <meta property="og:description" content={openGraph.description} />
          <meta property="og:type" content={openGraph.type} />
          {openGraph.image && <meta property="og:image" content={openGraph.image} />}
        </>
      )}

      {/* Twitter Cards */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card} />
          <meta name="twitter:title" content={twitter.title} />
          <meta name="twitter:description" content={twitter.description} />
          {twitter.image && <meta name="twitter:image" content={twitter.image} />}
        </>
      )}
    </>
  );
};

export default CustomMetadata;
