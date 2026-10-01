import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const stats = [
    { label: 'Location', value: 'Bikaner, Rajasthan' },
    { label: 'Education', value: 'B.Tech CSE Core' },
    { label: 'Institution', value: 'JECRC University' },
    { label: 'Expected', value: '2030' },
  ]

  return (
    <section id="about" className="py-16 md:py-20 border-t border-white/5 bg-dark-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="section-title">About</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="text-zinc-400 leading-relaxed mb-6">
              I am an engineering student with a strong foundation in systems programming and algorithmic design. My core expertise lies in C++, where I focus on memory management, performance optimization, and low-level system interactions.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Beyond core systems, I design scalable backend architectures and integrate AI models into robust infrastructure. I build software from first principles, ensuring efficiency and maintainability at every layer of the stack.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300"
          >
            <h3 className="text-base font-bold text-white mb-5 font-display">Academic Profile</h3>
            <div className="space-y-3">
              {stats.map(s => (
                <div key={s.label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-zinc-500">{s.label}</span>
                  <span className="text-sm font-medium text-zinc-300 font-mono">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
