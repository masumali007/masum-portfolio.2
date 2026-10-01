import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  { prefix: '[SYS_INIT]', text: 'Loading Memory Allocator...', status: 'OK' },
  { prefix: '[KERN]',     text: 'Mounting C++20 Runtime...',   status: 'OK' },
  { prefix: '[NET]',      text: 'Establishing secure link...',  status: 'OK' },
  { prefix: '[STATUS]',   text: 'Systems Online.',              status: null },
]

export default function CyberBootLoader({ onComplete }) {
  const [lines, setLines] = useState([])
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      if (idx < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[idx]])
        idx++
      } else {
        clearInterval(interval)
        // Start exit animation after a brief pause
        setTimeout(() => {
          setExiting(true)
          // Call onComplete after exit animation finishes (500ms)
          setTimeout(onComplete, 600)
        }, 250)
      }
    }, 210)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, filter: 'blur(12px)', scale: 0.98 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#050507' }}
    >
          {/* Pulse rings */}
          <div className="relative flex items-center justify-center mb-12">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-red-500/20"
                animate={{ scale: [1, 1 + i * 0.4], opacity: [0.5, 0] }}
                transition={{ duration: 1.6, delay: i * 0.22, repeat: Infinity, ease: 'easeOut' }}
                style={{ width: 60, height: 60 }}
              />
            ))}
            {/* Core M badge */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-14 h-14 rounded-full border border-red-500/50 bg-red-600/5 flex items-center justify-center"
            >
              <span className="font-display font-black text-red-400 text-xl select-none">M</span>
            </motion.div>
          </div>

          {/* Log lines */}
          <div className="w-72 space-y-2">
            <AnimatePresence>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="flex items-center justify-between font-mono text-[11px]"
                >
                  <span>
                    <span className="text-red-500 mr-2">{line?.prefix}</span>
                    <span className="text-zinc-400">{line?.text}</span>
                  </span>
                  {line?.status && (
                    <span className="text-emerald-400">{line?.status}</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-4 h-px bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-700 via-red-500 to-red-700"
                initial={{ width: '0%' }}
                animate={{ width: `${(lines.length / BOOT_LINES.length) * 100}%` }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
  )
}
