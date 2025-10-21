import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static', // Keep this as static!
  adapter: netlify(), // Adapter enables server routes
  site: 'https://lotus-nano.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      serialize(item) {
        item.url = item.url.replace(/\/$/, '');

        if (item.url === 'https://lotus-nano.com') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (
          item.url.match(
            /\/(pfas-substitutes-sourcing|pfas-management-advisory|intelligence)$/
          )
        ) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (item.url.match(/\/(about|working-with-us)$/)) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (
          item.url.match(
            /\/(pfas-delay-tactics-playbook|pfas-free-cookware-coating-PE-CVD|pfas-free-textile-playbook|pfas-transformation-playbook|pfas-roadmap-for-manufacturers|pfas-future-outlook|why-consumers-demand-pfas-free|automotive-lens-anti-reflective-coating)$/
          )
        ) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.match(/\/(privacy|terms-of-service)$/)) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }

        item.lastmod = new Date();
        return item;
      },
    }),
    icon({
      include: {
        mdi: ['*'],
      },
    }),
  ],

  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  },
});
