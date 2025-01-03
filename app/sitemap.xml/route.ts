// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const DOMAIN = 'https://www.vxer.info';

export async function GET() {
  const pb = new PocketBase('https://vxer.pockethost.io');

  try {
    // Fetch movie records from PocketBase
    const movies = await pb.collection('movies').getFullList();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${movies
    .map(
      (movie) => `
  <url>
    <loc>${DOMAIN}/movie/${movie.id}</loc>
    <lastmod>${new Date(movie.updated || movie.created).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
