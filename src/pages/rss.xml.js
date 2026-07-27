import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isGuidePublic } from '../data/recommendedGuidePublication';

export async function GET(context) {
  const guides = await getCollection('guides', (entry) => isGuidePublic(entry.slug));
  const procedures = await getCollection('procedures');
  const items = [...guides, ...procedures].map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.pubDate,
    link: `/${entry.collection === 'procedures' ? 'procedures' : 'guides'}/${entry.slug}/`
  }));

  return rss({
    title: 'Korea Tax Guide for Foreigners',
    description: 'Simple English guides for tax filing, Hometax, refunds, and documents in Korea.',
    site: context.site,
    items
  });
}
