import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://sakthimobile.vercel.app';
const PROJECT_ID = 'sakthi-mobiles-27d6f';

async function fetchCollectionDocIds(collectionName) {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionName}?pageSize=300`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.documents) return [];
    return data.documents.map(doc => {
      const parts = doc.name.split('/');
      return parts[parts.length - 1];
    });
  } catch (err) {
    console.error(`Error fetching collection ${collectionName}:`, err);
    return [];
  }
}

async function generateSitemap() {
  console.log('⚡ Automatically generating dynamic XML Sitemap for Sakthi Mobiles...');

  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/services', priority: '0.9', changefreq: 'daily' }
  ];

  const serviceIds = await fetchCollectionDocIds('services');
  const accessoryIds = await fetchCollectionDocIds('accessories');
  const secondsIds = await fetchCollectionDocIds('seconds_mobiles');

  const dynamicRoutes = [
    ...serviceIds.map(id => ({ url: `/service/${id}`, priority: '0.8', changefreq: 'weekly' })),
    ...accessoryIds.map(id => ({ url: `/service/${id}`, priority: '0.8', changefreq: 'weekly' })),
    ...secondsIds.map(id => ({ url: `/seconds-mobile/${id}`, priority: '0.9', changefreq: 'daily' }))
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  allRoutes.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${route.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
  console.log(`✅ sitemap.xml generated successfully with ${allRoutes.length} pages (Static: ${staticRoutes.length}, Services: ${serviceIds.length + accessoryIds.length}, Seconds Mobiles: ${secondsIds.length})!`);

  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
  console.log(`✅ robots.txt created pointing to ${DOMAIN}/sitemap.xml`);
}

generateSitemap();
