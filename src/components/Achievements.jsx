import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ACHIEVEMENTS } from '../data/achievements'

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="achievements" className="py-16 md:py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }}>
          <h2 className="section-title">Engineering Honors & Hackathons</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
              className="group relative bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6
                         hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(220,38,38,0.12)]
                         transition-all duration-300"
            >
              {/* Status Badge */}
              <div className={`inline-flex items-center gap-1.5 text-[10px] font-mono border px-2.5 py-1 rounded-full mb-4 ${a.statusColor}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {a.status}
              </div>

              <h3 className="text-base font-bold text-zinc-100 mb-1 group-hover:text-red-400 transition-colors font-display">
                {a.title}
              </h3>
              <p className="text-xs font-mono text-zinc-500 mb-3">{a.role}</p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">{a.desc}</p>

              <div className="flex flex-wrap gap-2">
                {a.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono text-red-400 border border-red-500/30 bg-red-500/5 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>

              {/* Subtle corner glow on hover */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
