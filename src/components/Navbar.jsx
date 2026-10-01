import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Timeline', href: 'timeline' },
  { label: 'Contact', href: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-950/90 backdrop-blur-md border-b border-zinc-800/50' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-red-600/10 border border-red-500/40 rounded-md flex items-center justify-center font-display font-black text-xs text-red-400 group-hover:bg-red-600/20 transition-colors shadow-[0_0_10px_rgba(220,38,38,0.2)]">
            M
          </div>
          <span className="font-display font-semibold text-zinc-200 text-sm hidden sm:block">Masum Ali Rangrej</span>
        </button>

        {/* Desktop Nav — clean, no telemetry here */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="px-3 py-1.5 text-[13px] font-mono text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors flex flex-col gap-1.5"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-950/95 backdrop-blur-md border-b border-zinc-800/50 px-6 pb-4 pt-1">
          {NAV_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left py-2.5 text-sm font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
