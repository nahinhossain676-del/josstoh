import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JossToh',
  description: 'Luxury You Can Afford — Premium streetwear crafted for those who demand quality without compromise.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}