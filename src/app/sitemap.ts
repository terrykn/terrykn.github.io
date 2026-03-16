import { MetadataRoute } from 'next';
import { DATA } from "@/data/resume";
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = DATA.url;

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1,
        },
    ];
}