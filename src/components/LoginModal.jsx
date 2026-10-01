import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export default function LoginModal({ onClose }) {
  const [tab, setTab] = useState('visitor') // 'visitor' | 'host'
  const { signInAsGuest, signInAsHost } = useAuth()

  // Visitor form
  const [vName, setVName] = useState('')
  const [vEmail, setVEmail] = useState('')

  // Host form
  const [hEmail, setHEmail] = useState('')
  const [hPass, setHPass] = useState('')
  const [hError, setHError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleVisitorSignIn = (e) => {
    e.preventDefault()
    if (!vName.trim() || !vEmail.trim()) { toast.error('Please fill in all fields'); return }
    signInAsGuest(vName.trim(), vEmail.trim(), null)
    toast.success(`Welcome, ${vName}! 👋`)
    onClose()
  }

  const handleHostLogin = async (e) => {
    e.preventDefault()
    setHError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = signInAsHost(hEmail.trim(), hPass)
    setLoading(false)
    if (result.success) {
      toast.success('Welcome back, Masum! 🚀')
      onClose()
    } else {
      setHError(result.error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="w-full max-w-md glass-card p-6 sm:p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-2xl font-black text-white mx-auto mb-4"
            style={{ boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}>M</div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Sign In</h2>
          <p className="text-slate-400 text-xs mt-1">Choose your sign-in method</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/4 p-1 rounded-xl mb-6">
          {[
            { key: 'visitor', label: '👤 Visitor Login', desc: 'Leave reviews' },
            { key: 'host', label: '🔐 Host Login', desc: 'Admin access' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                tab === t.key ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white' : 'text-slate-400 hover:text-white'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'visitor' ? (
            <motion.div key="visitor" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="mb-5 p-3 bg-blue-400/6 border border-blue-400/20 rounded-xl">
                <p className="text-blue-300 text-[11px] leading-relaxed">
                  Sign in to <strong>leave reviews</strong> and share your feedback on this portfolio.
                  Your name and comment will be shown publicly.
                </p>
              </div>
              <form onSubmit={handleVisitorSignIn} className="space-y-4">
                <div>
                  <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Display Name</label>
                  <input value={vName} onChange={e => setVName(e.target.value)} required
                    placeholder="Your name..." type="text"
                    className="w-full px-4 py-3 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all placeholder-slate-700" />
                </div>
                <div>
                  <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Email Address</label>
                  <input value={vEmail} onChange={e => setVEmail(e.target.value)} required
                    placeholder="your@email.com" type="email"
                    className="w-full px-4 py-3 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all placeholder-slate-700" />
                </div>
                <motion.button type="submit"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-bold glow-btn">
                  Continue as Visitor →
                </motion.button>
              </form>
              <p className="text-slate-600 text-[10px] text-center mt-4">
                Your data is stored locally on this device only.
              </p>
            </motion.div>
          ) : (
            <motion.div key="host" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-5 p-3 bg-amber-400/6 border border-amber-400/20 rounded-xl">
                <p className="text-amber-300 text-[11px] leading-relaxed">
                  🔐 <strong>Admin access</strong> for Masum only. Enables the Admin Panel for managing projects, achievements, and profile.
                </p>
              </div>
              <form onSubmit={handleHostLogin} className="space-y-4">
                <div>
                  <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Email</label>
                  <input value={hEmail} onChange={e => setHEmail(e.target.value)} required type="email"
                    placeholder="admin email..."
                    className="w-full px-4 py-3 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/60 transition-all placeholder-slate-700" />
                </div>
                <div className="relative">
                  <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Password</label>
                  <input value={hPass} onChange={e => setHPass(e.target.value)} required
                    type={showPass ? 'text' : 'password'} placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/60 transition-all placeholder-slate-700 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-[34px] text-slate-500 hover:text-white transition-colors text-xs">
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
                {hError && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-red-400 text-xs text-center bg-red-400/10 border border-red-400/20 rounded-lg py-2">
                    {hError}
                  </motion.p>
                )}
                <motion.button type="submit" disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.97 } : {}}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold glow-btn disabled:opacity-60">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" />
                      Verifying...
                    </span>
                  ) : 'Login as Admin →'}
                </motion.button>
              </form>
              <p className="text-slate-600 text-[10px] text-center mt-3">
                Default password: Admin@Masum2024 — change in AuthContext.jsx
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
