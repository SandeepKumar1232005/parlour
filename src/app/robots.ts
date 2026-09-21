import { MetadataRoute } from "next";
import { business } from "@/config/business";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = business.seo.siteUrl || "https://example.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
