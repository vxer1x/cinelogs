import './global.css';
import Script from 'next/script';

// app/layout.tsx
export const metadata = {
  title: 'vxer.info',
  description: 'Indian Movies Info.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Metadata */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Indian Movies Info." />
        <meta name="author" content="vxer.info" />
        
        {/* Favicon */}
        <link rel="icon" href="/popcorn.png" type="image/png" />
        
        {/* Google AdSense */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4613964821229195"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
