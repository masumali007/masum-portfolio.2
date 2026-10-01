import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NEOFETCH_LINES = [
  { key: 'OS',      val: 'Darwin / Linux x86_64 & ARM64' },
  { key: 'Kernel',  val: 'C++20 / Clang 17.0.0' },
  { key: 'Shell',   val: 'zsh 5.9 + Bash 5.2' },
  { key: 'Uptime',  val: 'B.Tech CSE Core (JECRC University)' },
  { key: 'Focus',   val: 'Low-Latency Systems, DSA, AI' },
  { key: 'Contact', val: 'masumali.codes@gmail.com' },
]

const HELP_TEXT = [
  { type: 'sys', text: '─────────────────────────────' },
  { type: 'sys', text: 'Available commands:' },
  { type: 'hint', text: '  about      → System bio' },
  { type: 'hint', text: '  skills     → Technical domains' },
  { type: 'hint', text: '  projects   → Engineering work' },
  { type: 'hint', text: '  contact    → Contact section' },
  { type: 'hint', text: '  sudo hire  → [AUTH] Download CV' },
  { type: 'hint', text: '  theme matrix → Matrix mode (5s)' },
  { type: 'hint', text: '  clear      → Clear terminal' },
  { type: 'sys', text: '─────────────────────────────' },
]

export default function Hero({ matrixMode, setMatrixMode }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [termOutput, setTermOutput] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [neofetchReady, setNeofetchReady] = useState(false)
  const [typingCmd, setTypingCmd] = useState('')
  const termEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Typing animation on terminal tab open
  useEffect(() => {
    if (activeTab !== 'terminal') return
    setTypingCmd('')
    setNeofetchReady(false)
    const cmd = 'neofetch --engineer'
    let i = 0
    const interval = setInterval(() => {
      i++
      setTypingCmd(cmd.slice(0, i))
      if (i >= cmd.length) {
        clearInterval(interval)
        setTimeout(() => setNeofetchReady(true), 350)
      }
    }, 55)
    return () => clearInterval(interval)
  }, [activeTab])

  useEffect(() => {
    if (activeTab === 'terminal') termEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [termOutput, activeTab])

  useEffect(() => {
    if (activeTab === 'terminal') setTimeout(() => inputRef.current?.focus(), 150)
  }, [activeTab])

  const handleCommand = useCallback((e) => {
    if (e.key !== 'Enter' || !inputVal.trim()) return
    const raw = inputVal.trim()
    const cmd = raw.toLowerCase()
    const cmdLine = { type: 'cmd', text: `guest@masum:~$ ${raw}` }
    let response = []

    switch (cmd) {
      case 'help': response = HELP_TEXT; break
      case 'about':
        response = [
          { type: 'sys', text: 'Masum Ali Rangrej — Systems Engineer.' },
          { type: 'sys', text: 'Specializing in C++, low-latency systems & AI backends.' },
        ]; break
      case 'skills':
        response = [
          { type: 'sys', text: 'Languages:  C++20, C, Python, JavaScript, SQL' },
          { type: 'sys', text: 'Systems:    DSA, OOP, Memory Mgmt, Linux/POSIX' },
          { type: 'sys', text: 'Web:        React, FastAPI, Vite, REST' },
          { type: 'sys', text: 'Toolchain:  Git, GDB, Valgrind, VS Code' },
        ]; break
      case 'projects': scrollTo('projects'); response = [{ type: 'sys', text: '→ Scrolling to Engineering Architecture...' }]; break
      case 'contact': scrollTo('contact'); response = [{ type: 'sys', text: '→ Opening contact section...' }]; break
      case 'sudo hire':
        response = [
          { type: 'auth', text: '[SUDO] Authenticating credentials...' },
          { type: 'auth', text: '[AUTH GRANTED] Downloading Masum\'s core credentials...' },
        ]
        setTimeout(() => { const a = document.createElement('a'); a.href = '/Masum_Ali_Resume.pdf'; a.download = 'Masum_Ali_Resume.pdf'; a.click() }, 700)
        break
      case 'theme matrix':
        setMatrixMode(true)
        response = [{ type: 'matrix', text: '[SYSTEM] Matrix mode active for 5s...' }]
        setTimeout(() => setMatrixMode(false), 5000)
        break
      case 'clear': setTermOutput([]); setInputVal(''); return
      default: response = [{ type: 'err', text: `zsh: command not found: ${raw}` }]
    }
    setTermOutput(prev => [...prev, cmdLine, ...response])
    setInputVal('')
  }, [inputVal, setMatrixMode])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 items-center z-10">

        {/* LEFT */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 mb-6 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for Systems & AI Internships
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
            className="text-5xl md:text-7xl font-black text-zinc-100 tracking-tight leading-[1.05] mb-3 font-display"
          >
            Masum Ali<br />Rangrej
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.14 }}
            className="text-sm md:text-base text-red-400 font-bold mb-5 font-mono"
          >
            Systems Programming • C++ • High-Performance AI Infrastructure
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-zinc-400 leading-relaxed mb-8 max-w-lg"
          >
            B.Tech CSE Core student specializing in C++, algorithmic problem solving, and low-latency backend systems. Focused on building high-throughput software from first principles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 hover:from-red-600 hover:to-red-700
                         text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200
                         shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:shadow-[0_0_28px_rgba(220,38,38,0.5)]"
            >
              Explore Architecture ↓
            </button>
            <a
              href="/Masum_Ali_Resume.pdf" download
              className="border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-sm px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              Download CV ↓
            </a>
            <a
              href="https://github.com/masumali007" target="_blank" rel="noopener noreferrer"
              className="border border-zinc-800 hover:border-zinc-600 text-zinc-300 font-mono text-sm px-4 py-2.5 rounded-xl transition-colors duration-200"
            >
              GitHub ↗
            </a>
          </motion.div>
        </div>

        {/* RIGHT — Dual-tab card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.18 }}
          className="w-full max-w-md mx-auto lg:ml-auto"
        >
          {/* Tab bar */}
          <div className="flex gap-1 font-mono text-xs">
            {['profile', 'terminal'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-lg transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-zinc-950 border-t border-x border-zinc-800 text-red-400'
                    : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                [ {tab} ]
              </button>
            ))}
          </div>

          {/* Card */}
          <div
            className="bg-zinc-950/90 border border-red-500/20 rounded-b-2xl rounded-tr-2xl shadow-[0_0_30px_rgba(220,38,38,0.1)] overflow-hidden backdrop-blur-sm"
            style={{ height: '420px' }}
            onClick={() => activeTab === 'terminal' && inputRef.current?.focus()}
          >
            <AnimatePresence mode="wait">

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <img
                    src="/profile.jpg"
                    alt="Masum Ali Rangrej"
                    className="w-full h-full object-cover object-top rounded-b-2xl rounded-tr-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <p className="text-white font-black font-display text-xl leading-tight">Masum Ali Rangrej</p>
                    <p className="text-red-400 font-mono text-xs mt-0.5">Systems Engineer • JECRC University</p>
                  </div>
                </motion.div>
              )}

              {/* Terminal Tab */}
              {activeTab === 'terminal' && (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 flex flex-col font-mono text-xs text-zinc-300"
                >
                  {/* Chrome */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800/60 flex-shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                      <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                      <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                    </div>
                    <span className="ml-2 text-zinc-600 text-[11px]">masum@host: ~/core</span>
                  </div>

                  {/* Typing command */}
                  <div className="mb-3 flex-shrink-0">
                    <span className="text-emerald-400">guest@masum:~$</span>{' '}
                    <span className="text-zinc-200">{typingCmd}</span>
                    {!neofetchReady && <span className="animate-pulse text-emerald-400">█</span>}
                  </div>

                  {/* Neofetch */}
                  <AnimatePresence>
                    {neofetchReady && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                        className="mb-3 space-y-1 flex-shrink-0"
                      >
                        {NEOFETCH_LINES.map((line, i) => (
                          <motion.div
                            key={line.key}
                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.2 }}
                            className="flex"
                          >
                            <span className="text-red-400 w-20 flex-shrink-0">{line.key}</span>
                            <span className="text-zinc-300">{line.val}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Output */}
                  <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
                    {termOutput.map((out, idx) => (
                      <div key={idx} className={`leading-5 ${
                        out.type === 'err'    ? 'text-red-400' :
                        out.type === 'cmd'   ? 'text-zinc-100 font-semibold' :
                        out.type === 'auth'  ? 'text-emerald-400' :
                        out.type === 'matrix'? 'text-green-400' :
                        out.type === 'hint'  ? 'text-blue-400' : 'text-zinc-400'
                      }`}>{out.text}</div>
                    ))}
                    <div ref={termEndRef} />
                  </div>

                  {/* Input */}
                  {neofetchReady && (
                    <div className="flex items-center pt-2 border-t border-zinc-800/50 flex-shrink-0 mt-1">
                      <span className="text-emerald-400 mr-2 flex-shrink-0">guest@masum:~$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputVal}
                        onChange={e => setInputVal(e.target.value)}
                        onKeyDown={handleCommand}
                        className="bg-transparent outline-none flex-1 text-zinc-100 placeholder-zinc-700 caret-red-400 min-w-0"
                        placeholder="type 'help'..."
                        autoComplete="off" spellCheck="false"
                      />
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
