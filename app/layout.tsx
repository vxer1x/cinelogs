import './global.css';

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
        {/* Link to favicon */}
        <link rel="icon" href="/popcorn.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
