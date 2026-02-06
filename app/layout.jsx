import "./globals.css";

export const metadata = {
  title: "Solo AI Product Incubator",
  description: "A system for continuously generating, testing, and scaling AI-powered tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Simple header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
            <a href="/" className="font-mono text-sm font-bold text-slate-800 no-underline">
              ethos
            </a>
            <nav className="flex items-center gap-4">
              <a
                href="https://guildry.paulb.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-slate-500 hover:text-slate-800 no-underline transition-colors"
              >
                Guildry →
              </a>
            </nav>
          </div>
        </header>
        <main className="pt-14">
          {children}
        </main>
      </body>
    </html>
  );
}
