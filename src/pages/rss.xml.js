import rss from '@astrojs/rss';
import { blogPosts } from '../data/blogPosts';

export async function GET(context) {
  return rss({
    title: 'Lotus Nano Intelligence',
    description: 'Strategic PFAS insights and analysis from Lotus Nano.',
    site: context.site,
    items: blogPosts.map((post) => ({
      title: post.blogtitle,
      description: post.blogdescr,
      pubDate: new Date(post.publishDateFull),
      link: post.url,
      author: `${post.authorName} (${post.authorRole})`,
      categories: [post.categoryFull, post.category],
    })),
    customData: `<language>en-GB</language>`,
    stylesheet: '/rss-styles.xsl', // Optional: add custom styling
  });
}
