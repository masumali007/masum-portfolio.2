import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SKILLS } from '../data/skills'

const METRICS = [
  { label: 'LeetCode & DSA',  value: '150+ Problems Solved (C++20)' },
  { label: 'Systems Focus',   value: 'Zero-Allocation & Cache-Friendly Algorithms' },
  { label: 'Core Toolchain',  value: 'Clang 17.0 • Valgrind • POSIX Shell' },
]

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="py-16 md:py-20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }}>
          <h2 className="section-title">Technical Domains</h2>
        </motion.div>

        {/* 4-column skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {SKILLS.map((domain, i) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.07 }}
              className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5
                         hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(220,38,38,0.08)]
                         transition-all duration-300 group"
            >
              <h3 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider mb-4 pb-3 border-b border-white/5 group-hover:text-red-400 transition-colors">
                {domain.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {domain.skills.map(skill => (
                  <span key={skill} className={`px-2.5 py-1.5 border rounded-md text-[11px] font-mono transition-colors ${domain.pillClass}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proof-of-work telemetry banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.45 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {METRICS.map((m, i) => (
            <div key={i} className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">{m.label}</span>
              <span className="text-sm font-mono text-zinc-300">{m.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
