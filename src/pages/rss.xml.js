import rss from '@astrojs/rss';
import { blogPosts } from '../data/blogPosts';

export async function GET(context) {
  return rss({
    title: 'Lotus Nano Intelligence',
    description: 'Strategic PFAS and management insights and intelligence',
    site: 'https://lotus-nano.com', // Hardcoded instead of context.site
    items: blogPosts.map((post) => ({
      title: post.blogtitle,
      description: post.blogdescr,
      pubDate: new Date(post.publishDateFull),
      link: post.url,
      author: `${post.authorName} (${post.authorRole})`,
      categories: [post.categoryFull, post.category],
    })),
    customData: `<language>en-GB</language>`,
  });
}
