import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Snowfall from './Snowfall';

export const metadata: Metadata = {
  title: 'Chamidu Sandeepa — DevOps & Full-Stack Engineer',
  description:
    'Chamidu Sandeepa is a Computing and Information Systems undergraduate focused on DevOps engineering and full-stack development.',
  openGraph: {
    title: 'Chamidu Sandeepa — Engineering with intention.',
    description: 'Aspiring DevOps & Full-Stack Engineer.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
  <Snowfall />
  {children}
</body>
    </html>
  );
}
