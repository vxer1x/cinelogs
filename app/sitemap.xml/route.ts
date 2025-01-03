import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const DOMAIN = 'https://www.vxer.info';

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(dateString: string | undefined): string {
  const date = dateString ? new Date(dateString) : null;
  return date && !isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();
}

export async function GET() {
  const pb = new PocketBase('https://vxer.pockethost.io');

  try {
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
    <loc>${escapeXml(`${DOMAIN}/movie/${movie.id}`)}</loc>
    <lastmod>${formatDate(movie.updated || movie.created)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
