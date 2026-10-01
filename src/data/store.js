// ─────────────────────────────────────────────
// LocalStorage Data Layer
// All portfolio data (projects, achievements, reviews, suggestions, profile)
// is stored here. Admin can manage via the Admin Panel.
// ─────────────────────────────────────────────

const KEYS = {
  PROJECTS: 'maf_projects_v2',
  ACHIEVEMENTS: 'maf_achievements',
  REVIEWS: 'maf_reviews',
  SUGGESTIONS: 'maf_suggestions',
  PROFILE: 'maf_profile',
  AUTH_USER: 'maf_auth_user',
  HOST_AUTH: 'maf_host_auth',
}

// ── Helpers ────────────────────────────────
const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}
const write = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch (e) { console.warn('Storage write failed', e) }
}
const uid = () => crypto.randomUUID()

// ── Default Data ────────────────────────────
export const DEFAULT_PROFILE = {
  name: 'Masum Ali Rangrej',
  role: 'Core AI Software Engineer',
  tagline: 'B.Tech Student | AI & Technology Enthusiast',
  bio: 'I\'m a B.Tech student at JECRC University with a deep passion for Artificial Intelligence and building intelligent systems. I specialise in AI integration, generative AI, and building smart web applications that solve real-world problems. I believe in learning by building — every project sharpens my thinking.',
  college: 'JECRC University, Jaipur',
  location: 'Bikaner, Rajasthan, India',
  email: 'royalrabbit780@gmail.com',
  phone: '+91 9509848682',
  linkedin: 'https://www.linkedin.com/in/masum-ali-rangrej-ab97092b8',
  github: 'https://github.com/masumali007',
  profilePic: '/profile.jpg',
  year: '2024 – 2030',
}

const DEFAULT_PROJECTS = [
  {
    id: 'p1',
    title: 'High-Performance Data Pipeline',
    status: 'Live',
    description: 'Designed and implemented a scalable data processing pipeline in C++ capable of handling high-throughput event streams with low latency.',
    tags: ['C++', 'Concurrency', 'Algorithms'],
    metric: 'Latency: Sub-millisecond',
    link: '#',
    github: 'https://github.com/masumali007',
    image: null,
    isDefault: true,
    createdAt: Date.now(),
  },
  {
    id: 'p2',
    title: 'AI Model Inference Service',
    status: 'Live',
    description: 'Developed a robust backend service using FastAPI to serve machine learning models, optimizing for memory efficiency and quick response times.',
    tags: ['Python', 'FastAPI', 'AI'],
    metric: 'Architecture: Distributed',
    link: '#',
    github: 'https://github.com/masumali007',
    image: null,
    isDefault: true,
    createdAt: Date.now(),
  },
]

const DEFAULT_ACHIEVEMENTS = [
  { id: 'a1', category: 'course', name: 'Web Development Fundamentals', desc: 'HTML, CSS, JavaScript basics', icon: '🌐', date: '2024', link: '' },
  { id: 'a2', category: 'course', name: 'Python for Beginners', desc: 'Core Python programming', icon: '🐍', date: '2024', link: '' },
  { id: 'a3', category: 'course', name: 'Introduction to AI & ML', desc: 'AI fundamentals and ML concepts', icon: '🤖', date: '2024', link: '' },
  { id: 'a4', category: 'course', name: 'Generative AI Exploration', desc: 'Prompt engineering & Gen AI tools', icon: '✨', date: '2025', link: '' },
]

// ── Profile ─────────────────────────────────
export const getProfile = () => read(KEYS.PROFILE, DEFAULT_PROFILE)
export const saveProfile = (data) => write(KEYS.PROFILE, { ...getProfile(), ...data })

// ── Projects ────────────────────────────────
export const getProjects = () => read(KEYS.PROJECTS, DEFAULT_PROJECTS)
export const addProject = (project) => {
  const projects = getProjects()
  const newProject = { ...project, id: uid(), createdAt: Date.now(), isDefault: false }
  write(KEYS.PROJECTS, [...projects, newProject])
  return newProject
}
export const deleteProject = (id) => {
  write(KEYS.PROJECTS, getProjects().filter(p => p.id !== id))
}
export const updateProject = (id, updates) => {
  write(KEYS.PROJECTS, getProjects().map(p => p.id === id ? { ...p, ...updates } : p))
}

// ── Achievements ────────────────────────────
export const getAchievements = () => read(KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS)
export const addAchievement = (achievement) => {
  const list = getAchievements()
  const item = { ...achievement, id: uid(), createdAt: Date.now() }
  write(KEYS.ACHIEVEMENTS, [...list, item])
  return item
}
export const deleteAchievement = (id) => {
  write(KEYS.ACHIEVEMENTS, getAchievements().filter(a => a.id !== id))
}

// ── Reviews ─────────────────────────────────
export const getReviews = () => read(KEYS.REVIEWS, [])
export const addReview = (review) => {
  const reviews = getReviews()
  // Remove existing review by same user
  const filtered = reviews.filter(r => r.userId !== review.userId)
  const newReview = { ...review, id: uid(), createdAt: Date.now(), updatedAt: Date.now() }
  write(KEYS.REVIEWS, [...filtered, newReview])
  return newReview
}
export const updateReview = (id, updates) => {
  write(KEYS.REVIEWS, getReviews().map(r => r.id === id ? { ...r, ...updates, updatedAt: Date.now() } : r))
}
export const deleteReview = (id) => {
  write(KEYS.REVIEWS, getReviews().filter(r => r.id !== id))
}

// ── Suggestions ──────────────────────────────
export const getSuggestions = () => read(KEYS.SUGGESTIONS, [])
export const addSuggestion = (suggestion) => {
  const list = getSuggestions()
  const item = { ...suggestion, id: uid(), createdAt: Date.now(), read: false }
  write(KEYS.SUGGESTIONS, [...list, item])
  return item
}
export const markSuggestionRead = (id) => {
  write(KEYS.SUGGESTIONS, getSuggestions().map(s => s.id === id ? { ...s, read: true } : s))
}
export const deleteSuggestion = (id) => {
  write(KEYS.SUGGESTIONS, getSuggestions().filter(s => s.id !== id))
}

// ── Auth ─────────────────────────────────────
// Host credentials (change ADMIN_PASSWORD to your preference)
export const ADMIN_EMAIL = 'royalrabbit780@gmail.com'
export const ADMIN_PASSWORD = 'Admin@Masum2024'

export const getAuthUser = () => read(KEYS.AUTH_USER, null)
export const setAuthUser = (user) => write(KEYS.AUTH_USER, user)
export const clearAuthUser = () => localStorage.removeItem(KEYS.AUTH_USER)

export const getHostAuth = () => read(KEYS.HOST_AUTH, false)
export const setHostAuth = (val) => write(KEYS.HOST_AUTH, val)
export const clearHostAuth = () => localStorage.removeItem(KEYS.HOST_AUTH)
