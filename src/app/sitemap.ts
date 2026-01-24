import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://manav-sonawane.me", lastModified: new Date() },
    { url: "https://manav-sonawane.me/projects", lastModified: new Date() },
    { url: "https://manav-sonawane.me/experience", lastModified: new Date() },
    { url: "https://manav-sonawane.me/contact", lastModified: new Date() },
  ];
}
