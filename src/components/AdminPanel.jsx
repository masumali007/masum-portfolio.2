import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getProfile, saveProfile,
  getProjects, addProject, deleteProject,
  getAchievements, addAchievement, deleteAchievement,
  getSuggestions, markSuggestionRead, deleteSuggestion,
} from '../data/store'
import toast from 'react-hot-toast'

const TABS = ['🏠 Dashboard', '🚀 Projects', '🏆 Achievements', '💬 Suggestions', '⚙️ Profile']
const STATUS_OPTIONS = ['Live', 'In Progress', 'Planning', 'Completed']
const GRADIENT_OPTIONS = ['from-cyan-500 to-blue-600', 'from-violet-500 to-purple-700', 'from-emerald-500 to-teal-600', 'from-orange-500 to-red-500', 'from-pink-500 to-rose-600', 'from-yellow-500 to-amber-600']
const EMOJI_OPTIONS = ['🌐', '🤖', '📚', '🎮', '🔬', '⚡', '🧠', '💡', '🛠️', '🚀', '✨', '🎯']
const ACH_CATEGORIES = ['certificate', 'hackathon', 'course', 'award']
const ACH_ICONS = { certificate: '🏅', hackathon: '⚡', course: '📚', award: '🌟' }

function toBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result)
    r.onerror = rej
    r.readAsDataURL(file)
  })
}

export default function AdminPanel({ onClose }) {
  const [tab, setTab] = useState(0)
  const [projects, setProjects] = useState(getProjects())
  const [achievements, setAchievements] = useState(getAchievements())
  const [suggestions, setSuggestions] = useState(getSuggestions())
  const [profile, setProfile] = useState(getProfile())

  const reload = () => {
    setProjects(getProjects())
    setAchievements(getAchievements())
    setSuggestions(getSuggestions())
    setProfile(getProfile())
  }

  // New project form
  const [pForm, setPForm] = useState({ title: '', description: '', status: 'Planning', tags: '', link: '', github: '', emoji: '🚀', color: GRADIENT_OPTIONS[0], image: null })
  const [pImg, setPImg] = useState(null)

  // New achievement form
  const [aForm, setAForm] = useState({ category: 'certificate', name: '', desc: '', date: '', link: '', icon: '' })

  const handlePImgChange = async (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 600000) { toast.error('Image must be under 600KB'); return }
    const b64 = await toBase64(f)
    setPImg(b64)
  }

  const handleProfilePicChange = async (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 600000) { toast.error('Image must be under 600KB'); return }
    const b64 = await toBase64(f)
    setProfile(prev => ({ ...prev, profilePic: b64 }))
  }

  const submitProject = (e) => {
    e.preventDefault()
    if (!pForm.title.trim()) { toast.error('Title required'); return }
    addProject({ ...pForm, tags: pForm.tags.split(',').map(t => t.trim()).filter(Boolean), image: pImg })
    window.dispatchEvent(new Event('projects-updated'))
    toast.success('Project added! 🚀')
    setPForm({ title: '', description: '', status: 'Planning', tags: '', link: '', github: '', emoji: '🚀', color: GRADIENT_OPTIONS[0], image: null })
    setPImg(null)
    reload()
  }

  const handleDeleteProject = (id) => {
    deleteProject(id)
    window.dispatchEvent(new Event('projects-updated'))
    toast.success('Project deleted')
    reload()
  }

  const submitAchievement = (e) => {
    e.preventDefault()
    if (!aForm.name.trim()) { toast.error('Name required'); return }
    addAchievement({ ...aForm, icon: aForm.icon || ACH_ICONS[aForm.category] })
    window.dispatchEvent(new Event('achievements-updated'))
    toast.success('Achievement added! 🏆')
    setAForm({ category: 'certificate', name: '', desc: '', date: '', link: '', icon: '' })
    reload()
  }

  const handleDeleteAchievement = (id) => {
    deleteAchievement(id)
    window.dispatchEvent(new Event('achievements-updated'))
    toast.success('Achievement deleted')
    reload()
  }

  const saveProfileData = (e) => {
    e.preventDefault()
    saveProfile(profile)
    window.dispatchEvent(new Event('profile-updated'))
    toast.success('Profile updated! ✅')
  }

  const handleDeleteSuggestion = (id) => {
    deleteSuggestion(id)
    toast.success('Suggestion deleted')
    reload()
  }

  const unreadSuggestions = suggestions.filter(s => !s.read).length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.2 }}
        className="w-full max-w-4xl bg-[#050d17]/95 backdrop-blur-xl border border-cyan-400/15 rounded-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-white text-sm">M</div>
            <div>
              <h2 className="text-white font-bold font-['Space_Grotesk']">Admin Panel</h2>
              <p className="text-slate-500 text-[10px]">Manage your portfolio content</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-sm">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 py-2 border-b border-white/5 flex-shrink-0 overflow-x-auto">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                tab === i ? 'bg-cyan-400/15 text-cyan-400 border border-cyan-400/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}>
              {t}
              {i === 3 && unreadSuggestions > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[9px] rounded-full">{unreadSuggestions}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5">
          {/* ─── Dashboard ─── */}
          {tab === 0 && (
            <div>
              <h3 className="text-white font-bold mb-4 font-['Space_Grotesk']">Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Projects', val: projects.length, icon: '🚀', color: 'from-cyan-500 to-blue-600' },
                  { label: 'Achievements', val: achievements.length, icon: '🏆', color: 'from-yellow-400 to-orange-500' },
                  { label: 'Suggestions', val: suggestions.length, icon: '💬', color: 'from-violet-400 to-purple-600' },
                  { label: 'Unread', val: unreadSuggestions, icon: '🔔', color: 'from-red-400 to-pink-500' },
                ].map(s => (
                  <div key={s.label} className="glass-card p-4 text-center">
                    <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl mb-2`}>{s.icon}</div>
                    <div className="text-2xl font-black text-white">{s.val}</div>
                    <div className="text-slate-500 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="glass-card p-4">
                <p className="text-slate-400 text-sm">
                  👋 Welcome to your Admin Panel! Use the tabs above to manage your portfolio content.
                  Changes are saved instantly and reflect on your live portfolio.
                </p>
                <div className="mt-3 p-3 bg-amber-400/6 border border-amber-400/20 rounded-xl">
                  <p className="text-amber-300 text-xs">
                    🔐 <strong>Security note:</strong> Your admin password is set in <code className="text-white font-mono">src/contexts/AuthContext.jsx</code>.
                    Change <code className="text-white font-mono">ADMIN_PASSWORD</code> to something personal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── Projects ─── */}
          {tab === 1 && (
            <div className="space-y-6">
              {/* Add project form */}
              <div className="glass-card p-5">
                <h4 className="text-white font-bold mb-4 text-sm font-['Space_Grotesk']">+ Add New Project</h4>
                <form onSubmit={submitProject} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Title *</label>
                      <input value={pForm.title} onChange={e => setPForm({...pForm, title: e.target.value})} required
                        placeholder="Project name..." className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                    </div>
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Status</label>
                      <select value={pForm.status} onChange={e => setPForm({...pForm, status: e.target.value})}
                        className="w-full px-3 py-2.5 bg-[#0a1628] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all">
                        {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Description</label>
                    <textarea value={pForm.description} onChange={e => setPForm({...pForm, description: e.target.value})}
                      rows={3} placeholder="Describe the project..."
                      className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none resize-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Tags (comma separated)</label>
                      <input value={pForm.tags} onChange={e => setPForm({...pForm, tags: e.target.value})}
                        placeholder="React, Python, AI..."
                        className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                    </div>
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Demo Link</label>
                      <input value={pForm.link} onChange={e => setPForm({...pForm, link: e.target.value})}
                        placeholder="https://..." type="url"
                        className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">GitHub Link</label>
                      <input value={pForm.github} onChange={e => setPForm({...pForm, github: e.target.value})}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                    </div>
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Project Image (max 600KB)</label>
                      <input type="file" accept="image/*" onChange={handlePImgChange}
                        className="w-full px-3 py-2 bg-white/4 border border-white/10 rounded-xl text-slate-400 text-xs outline-none file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-cyan-400/20 file:text-cyan-400 file:text-xs" />
                    </div>
                  </div>
                  {/* Emoji & Color */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-2 block">Emoji</label>
                      <div className="flex flex-wrap gap-2">
                        {EMOJI_OPTIONS.map(em => (
                          <button key={em} type="button" onClick={() => setPForm({...pForm, emoji: em})}
                            className={`w-8 h-8 text-lg rounded-lg flex items-center justify-center transition-all ${pForm.emoji === em ? 'bg-cyan-400/20 border border-cyan-400/50' : 'bg-white/5 hover:bg-white/10'}`}>
                            {em}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-2 block">Card Color</label>
                      <div className="flex flex-wrap gap-2">
                        {GRADIENT_OPTIONS.map(g => (
                          <button key={g} type="button" onClick={() => setPForm({...pForm, color: g})}
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g} transition-all ${pForm.color === g ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-[#050d17]' : ''}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-bold glow-btn">
                    Add Project →
                  </motion.button>
                </form>
              </div>

              {/* Projects list */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm font-['Space_Grotesk']">Existing Projects ({projects.length})</h4>
                <div className="space-y-3">
                  {projects.map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-3 glass-card">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color || 'from-cyan-500 to-blue-600'} flex items-center justify-center text-lg flex-shrink-0`}>
                        {p.emoji || '🚀'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{p.title}</div>
                        <div className="text-slate-500 text-xs">{p.status}</div>
                      </div>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteProject(p.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all flex-shrink-0 text-sm">
                        🗑️
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Achievements ─── */}
          {tab === 2 && (
            <div className="space-y-6">
              <div className="glass-card p-5">
                <h4 className="text-white font-bold mb-4 text-sm font-['Space_Grotesk']">+ Add Achievement</h4>
                <form onSubmit={submitAchievement} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Category</label>
                      <select value={aForm.category} onChange={e => setAForm({...aForm, category: e.target.value})}
                        className="w-full px-3 py-2.5 bg-[#0a1628] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all capitalize">
                        {ACH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Date (e.g. 2025)</label>
                      <input value={aForm.date} onChange={e => setAForm({...aForm, date: e.target.value})}
                        placeholder="2025" className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Name *</label>
                    <input value={aForm.name} onChange={e => setAForm({...aForm, name: e.target.value})} required
                      placeholder="Achievement name..." className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                  </div>
                  <div>
                    <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Description</label>
                    <input value={aForm.desc} onChange={e => setAForm({...aForm, desc: e.target.value})}
                      placeholder="Short description..." className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Link (optional)</label>
                      <input value={aForm.link} onChange={e => setAForm({...aForm, link: e.target.value})}
                        placeholder="https://..." type="url" className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                    </div>
                    <div>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Custom Icon (emoji)</label>
                      <input value={aForm.icon} onChange={e => setAForm({...aForm, icon: e.target.value})}
                        placeholder="🏅 (optional)" className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder-slate-700" />
                    </div>
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold glow-btn">
                    Add Achievement →
                  </motion.button>
                </form>
              </div>

              <div>
                <h4 className="text-white font-bold mb-3 text-sm font-['Space_Grotesk']">Existing ({achievements.length})</h4>
                <div className="space-y-2">
                  {achievements.map(a => (
                    <div key={a.id} className="flex items-center gap-3 p-3 glass-card">
                      <span className="text-2xl flex-shrink-0">{a.icon || ACH_ICONS[a.category] || '🏅'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{a.name}</div>
                        <div className="text-slate-500 text-xs capitalize">{a.category} • {a.date}</div>
                      </div>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteAchievement(a.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all flex-shrink-0 text-sm">
                        🗑️
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Suggestions ─── */}
          {tab === 3 && (
            <div>
              <h3 className="text-white font-bold mb-4 font-['Space_Grotesk']">Visitor Suggestions ({suggestions.length})</h3>
              {suggestions.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <div className="text-4xl mb-3">💬</div>
                  <p>No suggestions yet. They'll appear here as visitors submit them.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...suggestions].reverse().map(s => (
                    <div key={s.id} className={`glass-card p-4 ${!s.read ? 'border-cyan-400/25' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium">{s.name || 'Anonymous'}</span>
                            {!s.read && <span className="text-[9px] px-1.5 py-0.5 bg-cyan-400/15 text-cyan-400 rounded-full">New</span>}
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">{s.message}</p>
                          <span className="text-slate-600 text-[10px] mt-2 block">{new Date(s.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          {!s.read && (
                            <button onClick={() => { markSuggestionRead(s.id); reload() }}
                              className="text-[10px] px-2 py-1 rounded-lg bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 transition-all">
                              Mark Read
                            </button>
                          )}
                          <button onClick={() => handleDeleteSuggestion(s.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs">
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── Profile ─── */}
          {tab === 4 && (
            <div>
              <h3 className="text-white font-bold mb-4 font-['Space_Grotesk']">Edit Profile</h3>
              <form onSubmit={saveProfileData} className="space-y-4">
                {/* Profile pic */}
                <div className="flex items-center gap-4 glass-card p-4">
                  <img src={profile.profilePic} alt="" className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-cyan-400/25" />
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Profile Picture</p>
                    <input type="file" accept="image/*" onChange={handleProfilePicChange}
                      className="text-slate-400 text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-cyan-400/20 file:text-cyan-400 file:text-xs" />
                    <p className="text-slate-600 text-[9px] mt-1">Max 600KB. Stored locally.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Full Name' },
                    { key: 'role', label: 'Role / Title' },
                    { key: 'college', label: 'College' },
                    { key: 'location', label: 'Location' },
                    { key: 'email', label: 'Email' },
                    { key: 'phone', label: 'Phone' },
                    { key: 'linkedin', label: 'LinkedIn URL' },
                    { key: 'github', label: 'GitHub URL' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">{f.label}</label>
                      <input value={profile[f.key] || ''} onChange={e => setProfile({...profile, [f.key]: e.target.value})}
                        className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-400/50 transition-all" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 block">Bio</label>
                  <textarea value={profile.bio || ''} onChange={e => setProfile({...profile, bio: e.target.value})}
                    rows={4} className="w-full px-3 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white text-sm outline-none resize-none focus:border-cyan-400/50 transition-all" />
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold glow-btn">
                  Save Profile ✅
                </motion.button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
