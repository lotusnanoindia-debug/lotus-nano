// Define constants at module level
const DEFAULT_AUTHOR = {
  name: 'Mark Schäfer',
  role: 'Founder, Lotus Nano',
  image:
    'https://the-knowledge-brokers.sirv.com/lotus-nano/Markus-Schafer-Lotus-Nano.png?w=100&h=100&profile=circular',
} as const;

// Update interface to make author fields optional
export interface BlogPost {
  category: string;
  url: string;
  blogtitle: string;
  blogdescr: string;
  img: string;
  publishDateFull: string;
  readTime: string;
  categoryFull: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: string;
}

// Helper function to merge defaults
function createBlogPost(
  post: Omit<BlogPost, 'authorName' | 'authorRole' | 'authorImage'>
): BlogPost {
  return {
    ...post,
    authorName: DEFAULT_AUTHOR.name,
    authorRole: DEFAULT_AUTHOR.role,
    authorImage: DEFAULT_AUTHOR.image,
  };
}

export const blogPosts: BlogPost[] = [
  createBlogPost({
    category: 'pfas',
    url: '/intelligence/pfas-transformation-playbook',
    blogtitle: 'The PFAS Transformation Playbook',
    blogdescr:
      'Why PFAS phase-outs stall — and how leaders turn PFAS challenges into competitive advantage',
    img: 'https://the-knowledge-brokers.sirv.com/lotus-nano/pfas-services.jpg?ch=600&w=972&sharpen=1',
    publishDateFull: '2025-07-15',
    readTime: '14 min',
    categoryFull: 'Executive Playbook',
  }),
  createBlogPost({
    category: 'pfas',
    url: '/intelligence/pfas-free-textile-playbook',
    blogtitle: 'The PFAS-Free Textile Playbook',
    blogdescr:
      'A strategic framework for textile leaders to transform regulatory challenges into competitive advantages with proven alternative technologies.',
    img: 'https://the-knowledge-brokers.sirv.com/lotus-nano/Textile-Fabric.jpg?ch=600&w=972&sharpen=1',
    publishDateFull: '2025-06-11',
    readTime: '18 min',
    categoryFull: 'Industry Playbook',
  }),
  createBlogPost({
    category: 'pfas',
    url: '/intelligence/why-consumers-demand-pfas-free',
    blogtitle: 'Why Consumers Demand PFAS-Free',
    blogdescr:
      'Informed consumer demand for PFAS-free products now drives real market change — only those able to deliver genuine alternatives remain relevant; everyone else, however transparent, is sidelined. Here’s why.',
    img: 'https://the-knowledge-brokers.sirv.com/lotus-nano/pfas-in-everyday-products.jpg?ch=600&w=972&sharpen=1',
    publishDateFull: '2025-07-15',
    readTime: '15 min',
    categoryFull: 'Strategy Guide',
  }),
  createBlogPost({
    category: 'pfas',
    url: '/intelligence/pfas-roadmap-for-manufacturers',
    blogtitle: 'This PFAS Exit Roadmap Beats Your Competitors',
    blogdescr:
      'From assessment to action: follow this 5-step path to transforming PFAS elimination into competitive advantage.',
    img: 'https://the-knowledge-brokers.sirv.com/lotus-nano/pfas12.jpg?profile=lotus-nano&w=1200&h=630',
    publishDateFull: '2025-01-12',
    readTime: '12 min',
    categoryFull: 'Strategic Guide',
  }),
  createBlogPost({
    category: 'pfas',
    url: '/intelligence/pfas-delay-tactics-playbook',
    blogtitle: 'The Delay Tactics Playbook',
    blogdescr:
      '25 Patterns Blocking PFAS Transformations — And The Steps That Will Put Your Deadlock Back on Track',
    img: 'https://the-knowledge-brokers.sirv.com/lotus-nano/pfas9.jpg?profile=lotus-nano&w=1200&h=630',
    publishDateFull: '2025-08-25',
    readTime: '15 min',
    categoryFull: 'Industry Playbook',
  }),
  createBlogPost({
    category: 'collab',
    url: '/intelligence/automotive-lens-anti-reflective-coating',
    blogtitle: 'Engineering Automotive Lighting Performance',
    blogdescr:
      'How leading engineering teams boost lighting efficiency while meeting strict regulations with advanced anti-reflective coatings.',
    img: 'https://the-knowledge-brokers.sirv.com/lotus-nano/automotive-AR-coating.jpeg?profile=lotus-nano&w=1200&h=630',
    publishDateFull: '2024-11-19',
    readTime: '15 min',
    categoryFull: 'Automotive Technology',
  }),
  createBlogPost({
    category: 'pfas',
    url: '/intelligence/pfas-future-outlook',
    blogtitle: 'PFAS Strategic Forecast',
    blogdescr:
      'Data-driven analysis of the $95.6 billion PFAS transition opportunity. Strategic insights for navigating the next 10 years of market transformation.',
    img: 'https://the-knowledge-brokers.sirv.com/lotus-nano/pfas-future-outlook.jpg?profile=lotus-nano&w=1200&h=630',
    publishDateFull: '2025-08-05',
    readTime: '18 min',
    categoryFull: 'Strategic Analysis',
  }),
  createBlogPost({
    category: 'collab',
    url: '/intelligence/pfas-free-cookware-coating-PE-CVD',
    blogtitle: 'Trouble Finding a Real Teflon Replacement?',
    blogdescr:
      'Novel advanced cold-plasma PE-CVD coating technology is set to deliver what cookware manufacturers have long been looking for: great durability, great non-stick performance, and 100% PFAS free.',
    img: 'https://the-knowledge-brokers.sirv.com/lotus-nano/fryingpan.webp?profile=lotus-nano&w=1200&h=630',
    publishDateFull: '2025-06-30',
    readTime: '10 min',
    categoryFull: 'PFAS Free Cookware',
  }),
];
