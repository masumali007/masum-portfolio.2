import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TIMELINE } from '../data/timeline'

export default function Timeline() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="timeline" className="py-16 md:py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Engineering Timeline</h2>
          <p className="text-xs font-mono text-zinc-600 -mt-5 mb-8">git log --all --oneline</p>
        </motion.div>

        <div className="relative space-y-0">
          {/* Vertical git spine */}
          <div className="absolute left-[120px] top-5 bottom-5 w-px bg-gradient-to-b from-red-500/60 via-zinc-700/50 to-transparent" />

          {TIMELINE.map((entry, i) => (
            <motion.div
              key={entry.hash}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.12 }}
              className="relative flex items-start gap-0 pb-8 last:pb-0 group"
            >
              {/* Year + hash column */}
              <div className="flex-shrink-0 w-[120px] flex flex-col items-end pr-5 pt-1.5">
                <span className={`text-[11px] font-mono font-bold ${entry.isActive ? 'text-red-400' : 'text-zinc-500'}`}>
                  {entry.year}
                </span>
                <span className="text-[9px] font-mono text-zinc-700 mt-0.5">
                  commit {entry.hash}
                </span>
              </div>

              {/* Git node (circle with branch dot style) */}
              <div className="relative flex-shrink-0 flex items-start pt-1.5 z-10">
                {/* Connector line to card */}
                <div className="absolute left-3 top-3 h-px w-5 bg-zinc-700 group-hover:bg-red-500/50 transition-colors" />
                {/* Outer ring */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${entry.isActive
                    ? 'border-red-500 bg-red-500/10 shadow-[0_0_14px_rgba(239,68,68,0.5)]'
                    : 'border-zinc-600 bg-dark-950 group-hover:border-zinc-400'
                  }`}
                >
                  {/* Inner dot */}
                  <div className={`w-2 h-2 rounded-full ${entry.isActive ? 'bg-red-400 animate-pulse' : 'bg-zinc-600'}`} />
                </div>
              </div>

              {/* Content card */}
              <div className="flex-1 ml-6 bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 group-hover:border-red-500/30 transition-all duration-300">
                {/* Branch badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-mono text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-full">
                    branch: {entry.branch}
                  </span>
                  {entry.isActive && (
                    <span className="text-[9px] font-mono text-emerald-500 border border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 rounded-full">
                      HEAD → main
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-zinc-100 mb-1.5">{entry.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{entry.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map(t => (
                    <span key={t} className="text-[9px] font-mono text-zinc-400 border border-zinc-700/60 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
