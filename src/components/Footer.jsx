export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-white/5 bg-dark-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <p className="text-sm font-black text-zinc-300 font-display">Masum Ali Rangrej</p>
            <p className="text-xs text-zinc-700 mt-0.5">Engineered with React, Vite, and Tailwind CSS</p>
          </div>

          <div className="flex gap-5 text-xs font-mono">
            <a href="https://github.com/masumali007" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/masum-ali-ab97092b8" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">LinkedIn ↗</a>
            <a href="mailto:masumali.codes@gmail.com" className="text-zinc-500 hover:text-zinc-300 transition-colors">Email ↗</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-700">© {year} All rights reserved.</span>
            <button
              onClick={scrollTop}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:border-red-500/50 hover:text-red-400 transition-all duration-200 font-mono text-sm"
              aria-label="Scroll to top"
            >↑</button>
          </div>

        </div>
      </div>
    </footer>
  )
}
