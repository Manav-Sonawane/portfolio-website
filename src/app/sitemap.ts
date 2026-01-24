import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://YOUR_DOMAIN_HERE", lastModified: new Date() },
    { url: "https://YOUR_DOMAIN_HERE/projects", lastModified: new Date() },
    { url: "https://YOUR_DOMAIN_HERE/experience", lastModified: new Date() },
    { url: "https://YOUR_DOMAIN_HERE/contact", lastModified: new Date() },
  ];
}
