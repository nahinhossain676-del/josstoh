import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Joss Toh — Luxury You Can Afford',
  description: 'Premium streetwear crafted for those who demand quality without compromise.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
