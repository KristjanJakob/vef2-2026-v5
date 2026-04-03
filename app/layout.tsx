import './globals.scss';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="is">
      <body>
        <header style={{ padding: '1rem 2rem', background: '#111' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/" style={{ color: 'white' }}>Forsíða</Link>
            <Link href="/frettir" style={{ color: 'white' }}>Fréttir</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}