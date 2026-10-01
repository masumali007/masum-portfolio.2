import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CONTACTS = [
  {
    label: 'Email',
    value: 'masumali.codes@gmail.com',
    href: 'mailto:masumali.codes@gmail.com',
    pillClass: 'border-red-500/30 text-red-400 bg-red-500/5',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  },
  {
    label: 'GitHub',
    value: 'github.com/masumali007',
    href: 'https://github.com/masumali007',
    pillClass: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
    icon: <path fill="currentColor" stroke="none" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/masum-ali-ab97092b8',
    href: 'https://www.linkedin.com/in/masum-ali-ab97092b8',
    pillClass: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
    icon: <><path fill="currentColor" stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect fill="currentColor" stroke="none" x="2" y="9" width="4" height="12"/><circle fill="currentColor" stroke="none" cx="4" cy="4" r="2"/></>
  }
]

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="contact" className="py-16 md:py-20 border-t border-white/5 bg-dark-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }}>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.1 }}>
            <p className="text-zinc-400 leading-relaxed mb-6">
              I am currently open to systems engineering internships and technical collaborations. Whether you have a project to discuss or just want to connect, I will get back to you promptly.
            </p>
            <p className="text-[11px] font-mono text-zinc-600 border border-zinc-800 rounded-lg px-3 py-2 inline-block mb-8">
              Press <span className="text-red-400">C</span> anywhere to copy email instantly
            </p>

            <div className="space-y-3">
              {CONTACTS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                  className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-xl
                             hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(220,38,38,0.1)]
                             transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${c.pillClass}`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">{c.icon}</svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">{c.label}</div>
                    <div className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{c.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
