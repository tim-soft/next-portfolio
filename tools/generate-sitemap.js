import fs from 'fs';
import getPathsObject from './getPathsObject';

// Create public folder
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}

// ROBOTS.txt
const robotsTxt = `User-agent: *
Sitemap: https://timellenberger.com/sitemap.xml
Disallow:`;

fs.writeFileSync('public/robots.txt', robotsTxt);

// SITEMAP.XML
const pathsObj = getPathsObject();
const today = new Date().toISOString();
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  ${Object.keys(pathsObj).map(
    path => `<url>
    <loc>https://timellenberger.com${path}</loc>
    <lastmod>${
      pathsObj[path].lastModified
        ? new Date(pathsObj[path].lastModified).toISOString()
        : today
    }</lastmod>
  </url>`
  )}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemapXml);
