import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scale to ₹100Cr+ With a Predictable Growth Engine | Ehroo',
  description:
    'Ehroo builds your organic sales pipeline end-to-end: product-led growth, AI visibility, SEO, CRO, inbound demand generation and paid acquisition in one predictable growth system.',
  icons: { icon: '/img/logo-mark.png' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

/** ?figma gives a static import mode: no motion, sticky header unpinned, every state visible. */
const FIGMA_MODE = `if(/[?&]figma\\b/.test(location.search))document.documentElement.classList.add('figma')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FIGMA_MODE }} />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
