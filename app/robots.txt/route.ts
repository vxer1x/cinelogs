import { NextResponse } from 'next/server';

export async function GET() {
  const content = `User-agent: *
Sitemap: https://www.vxer.info/sitemap.xml`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
