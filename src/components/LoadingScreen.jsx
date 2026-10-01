import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('Booting system...')

  useEffect(() => {
    const stages = [
      { p: 15, t: 'Loading AI modules...' },
      { p: 35, t: 'Compiling projects...' },
      { p: 60, t: 'Rendering portfolio...' },
      { p: 80, t: 'Calibrating animations...' },
      { p: 95, t: 'Almost there...' },
      { p: 100, t: '🚀 Welcome!' },
    ]
    let i = 0
    const iv = setInterval(() => {
      if (i < stages.length) { setProgress(stages[i].p); setStage(stages[i].t); i++ }
      else clearInterval(iv)
    }, 430)
    return () => clearInterval(iv)
  }, [])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020409] cyber-grid overflow-hidden"
    >
      {/* Orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Scanning line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 2.5, ease: 'linear', repeat: Infinity }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="mb-8 relative"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-4xl font-black text-white shadow-2xl"
          style={{ boxShadow: '0 0 60px rgba(34,211,238,0.4)' }}>
          M
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-2 rounded-full border border-dashed border-cyan-400/30"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold gradient-text mb-1"
      >
        Masum Ali Rangrej
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-slate-400 font-mono text-xs mb-12 tracking-widest uppercase"
      >
        Core AI Software Engineer
      </motion.p>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: '280px' }}
        transition={{ delay: 0.9 }}
        className="w-70"
      >
        <div className="flex justify-between mb-2">
          <span className="text-xs text-slate-500 font-mono">{stage}</span>
          <span className="text-xs text-cyan-400 font-mono">{progress}%</span>
        </div>
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full loading-bar rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
