import { useState, useEffect, useRef, useCallback } from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'

import CyberBootLoader from './components/CyberBootLoader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Session-guarded boot animation
  const alreadyBooted = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('sys_booted')
  const [booting, setBooting] = useState(!alreadyBooted)
  const [matrixMode, setMatrixMode] = useState(false)

  const cursorRef = useRef(null)
  const rafRef = useRef(null)
  const mousePos = useRef({ x: -9999, y: -9999 })

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('sys_booted', '1')
    setBooting(false)
  }, [])

  // Recruiter console trap
  useEffect(() => {
    console.log(
      '%c[SYSTEM ACCESS GRANTED]\n%cLooking under the hood? I respect that.\nContact: %cmasumali.codes@gmail.com\n%cgithub.com/masumali007',
      'color: #EF4444; font-size: 16px; font-weight: bold; font-family: monospace;',
      'color: #22c55e; font-size: 13px; font-family: monospace;',
      'color: #60a5fa; font-size: 13px; font-family: monospace; text-decoration: underline;',
      'color: #a78bfa; font-size: 12px; font-family: monospace;'
    )
  }, [])

  // Cursor spotlight via rAF — 60fps, zero re-renders
  useEffect(() => {
    const onMouseMove = (e) => { mousePos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const loop = () => {
      if (cursorRef.current) {
        const { x, y } = mousePos.current
        cursorRef.current.style.background =
          `radial-gradient(600px circle at ${x}px ${y}px, rgba(185,28,28,0.07), transparent 70%)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // 'C' to copy email
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key.toLowerCase() === 'c') {
        navigator.clipboard.writeText('masumali.codes@gmail.com')
        toast.success('Copied masumali.codes@gmail.com!', {
          icon: '📋',
          style: { background: '#18181B', color: '#F4F4F5', border: '1px solid rgba(239,68,68,0.35)', fontSize: '13px' },
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Boot screen — mounts ABOVE everything */}
      {booting && <CyberBootLoader onComplete={handleBootComplete} />}

      <div className="min-h-screen bg-grid relative overflow-hidden">

        {/* Cursor spotlight */}
        <div ref={cursorRef} className="pointer-events-none fixed inset-0 z-30" />

        {/* Ambient glows */}
        <div className="absolute -top-24 left-1/3 w-96 h-96 bg-red-700/12 rounded-full blur-[150px] pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-orange-600/8 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/8 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* Header radial glow */}
        <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none -z-10"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(185,28,28,0.18), rgba(0,0,0,0))' }}
        />

        <Toaster position="bottom-right" />
        <Navbar />

        {matrixMode && (
          <style>{`main * { color: #22c55e !important; } main .bg-zinc-900\\/50, main .eng-card { border-color: rgba(34,197,94,0.3) !important; }`}</style>
        )}

        <main>
          <Hero matrixMode={matrixMode} setMatrixMode={setMatrixMode} />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Timeline />
          <Contact />
        </main>
        <Footer />

        {/* Telemetry pill — bottom-left, no more navbar collision */}
        <div className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-red-500/20 backdrop-blur-md text-[11px] font-mono text-zinc-500 select-none">
          <span className="text-emerald-400">●</span>
          <span>Engine: React+V8</span>
          <span className="text-zinc-700">|</span>
          <span>Latency: 12ms</span>
          <span className="text-zinc-700">|</span>
          <span>FPS: 60</span>
        </div>
      </div>
    </>
  )
}
