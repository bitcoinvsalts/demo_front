// netlify/build/generate-sitemap.js
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const baseUrl = 'https://directbooking.netlify.app';
  const response = await fetch('https://santahost.vercel.app/places');
  const data = await response.json();

  // Access the places array correctly
  const places = data.places;

  if (!Array.isArray(places)) {
    throw new Error('Expected places to be an array');
  }

  const urls = places.map((place) => {
    return `
      <url>
        <loc>${baseUrl}/place/${place._id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  });

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${urls.join('')}
    </urlset>
  `;

  writeFileSync(path.resolve(__dirname, '../../dist/client/sitemap.xml'), sitemap.trim());
}

generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error);
  process.exit(1);
});
