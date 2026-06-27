import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Cloudflare Pages deploys this as a fully static site:
//   Build command:   npm run build
//   Build output:    dist
//   Root directory:  /
// No server adapter is needed — every page is pre-rendered at build time.
//
// NOTE: @astrojs/sitemap was removed after it crashed during the Cloudflare
// build (a version-compatibility bug, unrelated to this project's content).
// A sitemap can be re-added later, or generated manually — see README.
export default defineConfig({
  site: 'https://momery.live',
  output: 'static',
  integrations: [tailwind()],
  build: {
    format: 'directory', // /about/ instead of /about.html — cleaner URLs on Cloudflare Pages
  },
});
