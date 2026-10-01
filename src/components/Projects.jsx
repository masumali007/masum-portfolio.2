import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { PROJECTS } from '../data/projects'

function CppSnippet({ code }) {
  return (
    <pre className="text-[10px] leading-relaxed overflow-hidden h-full font-mono">
      {code.map((line, i) => (
        <div key={i}>
          {line.parts.map((part, j) => (
            <span key={j} className={part.cls}>{part.text}</span>
          ))}
        </div>
      ))}
    </pre>
  )
}

function ArchDrawer({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-xl bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col overflow-y-auto shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 flex-shrink-0">
              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-0.5">Architecture Drawer</p>
                <h3 className="text-base font-bold text-zinc-100 font-display">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-colors font-mono"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* ── Section 1: Architecture Diagram ───────────────── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-red-500 rounded-full" />
                  <h4 className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">Architecture Diagram</h4>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                  {/* SVG Flow Diagram */}
                  <svg viewBox="0 0 400 120" className="w-full text-zinc-400" fill="none">
                    {/* Nodes */}
                    {['Client', 'Gateway', 'Core Engine', 'Output'].map((label, i) => (
                      <g key={label}>
                        <rect x={i * 95 + 5} y="35" width="80" height="32" rx="6"
                          fill="rgba(39,39,42,0.8)" stroke="rgba(63,63,70,0.8)" strokeWidth="1" />
                        <text x={i * 95 + 45} y="55" textAnchor="middle"
                          className="font-mono" fontSize="9" fill="#a1a1aa">{label}</text>
                        {/* Arrow */}
                        {i < 3 && (
                          <g>
                            <line x1={i * 95 + 87} y1="51" x2={i * 95 + 103} y2="51"
                              stroke="#EF4444" strokeWidth="1" strokeOpacity="0.6" />
                            <polygon points={`${i * 95 + 103},47 ${i * 95 + 109},51 ${i * 95 + 103},55`}
                              fill="#EF4444" fillOpacity="0.6" />
                          </g>
                        )}
                      </g>
                    ))}
                    {/* Flow label */}
                    <text x="200" y="100" textAnchor="middle" fontSize="8" fill="#52525b" className="font-mono">
                      {project.architecture.diagram}
                    </text>
                  </svg>
                </div>
              </div>

              {/* ── Section 2: Source Snippet ─────────────────────── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-blue-500 rounded-full" />
                  <h4 className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">Source Snippet</h4>
                  <span className="text-[9px] font-mono text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded ml-auto">C++20</span>
                </div>
                <div className="bg-[#0d1117] border border-zinc-800 rounded-xl p-4 overflow-auto max-h-52">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <CppSnippet code={project.snippet} />
                </div>
              </div>

              {/* ── Section 3: Metrics ────────────────────────────── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                  <h4 className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">Performance Metrics</h4>
                </div>
                <div className="space-y-2">
                  {project.architecture.metrics.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/60 rounded-lg px-4 py-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                      <span className="text-xs font-mono text-zinc-300">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-2">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-xs font-mono text-zinc-300 hover:text-white transition-colors">
                  Code [GitHub] ↗
                </a>
                <a href={project.docs}
                  className="flex-1 text-center py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-xs font-mono text-red-400 transition-colors">
                  Architecture Docs ↗
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="py-16 md:py-20 border-t border-white/5 relative">
      <div className="absolute bottom-0 left-1/4 w-96 h-72 bg-red-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Engineering Architecture</h2>
          <p className="text-xs font-mono text-zinc-600 -mt-5 mb-8">Click any card to open the architecture drawer →</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              onClick={() => setActiveProject(p)}
              className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl overflow-hidden hover:border-red-500/40 transition-all duration-300 shadow-lg hover:shadow-red-900/20 hover:shadow-xl flex flex-col group cursor-pointer"
            >
              {/* Code Header */}
              <div className="h-44 bg-[#0d1117] border-b border-zinc-800/80 p-4 overflow-hidden relative">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <CppSnippet code={p.snippet} />
                {/* Metric Badge */}
                <div className="absolute bottom-3 right-3 bg-zinc-900/90 backdrop-blur border border-emerald-500/30 px-2.5 py-1 rounded-md text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {p.metric}
                </div>
                {/* Hover hint */}
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[11px] font-mono text-red-400 bg-zinc-950/90 border border-red-500/30 px-3 py-1.5 rounded-lg">
                    Click to open Architecture →
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-base font-bold text-zinc-100 mb-3 group-hover:text-red-400 transition-colors">{p.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono text-blue-400 border border-blue-500/30 bg-blue-500/5 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-5 pt-4 border-t border-zinc-800/80">
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors">
                    Code [GitHub] ↗
                  </a>
                  <span className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors">
                    Architecture Docs →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Drawer */}
      <ArchDrawer project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
