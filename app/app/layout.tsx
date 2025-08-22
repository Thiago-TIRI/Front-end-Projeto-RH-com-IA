
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'RH Matcher — Frontend',
  description: 'UI para a plataforma de gestão de currículos'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-30">
          <div className="container flex items-center justify-between h-14">
            <Link href="/" className="font-bold text-brand-700">RH Matcher</Link>
            <nav className="flex gap-6">
              <Link className="navlink" href="/upload">Upload</Link>
              <Link className="navlink" href="/matches">Matches</Link>
              <a className="navlink" href={process.env.NEXT_PUBLIC_API_BASE_URL + '/docs'} target="_blank" rel="noreferrer">API /docs</a>
            </nav>
          </div>
        </header>
        <main className="container py-8">
          {children}
        </main>
        <footer className="border-t py-6 text-center text-sm text-gray-500">
          <span>Feito com Next.js + Tailwind</span>
        </footer>
      </body>
    </html>
  )
}
