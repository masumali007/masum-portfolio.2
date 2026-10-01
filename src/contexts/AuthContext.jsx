import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  getAuthUser, setAuthUser, clearAuthUser,
  getHostAuth, setHostAuth, clearHostAuth,
  ADMIN_EMAIL, ADMIN_PASSWORD,
} from '../data/store'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)       // visitor (Google-style) user
  const [isHost, setIsHost] = useState(false)  // admin/host flag
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(getAuthUser())
    setIsHost(getHostAuth())
    setLoading(false)
  }, [])

  // ── Visitor sign-in (simulated Google) ──
  const signInAsGuest = useCallback((name, email, photoURL) => {
    const u = {
      uid: btoa(email + name).replace(/=/g, ''),
      displayName: name,
      email,
      photoURL: photoURL || null,
      provider: 'google-simulated',
      signedInAt: Date.now(),
    }
    setAuthUser(u)
    setUser(u)
    return u
  }, [])

  // ── Host login ──
  const signInAsHost = useCallback((email, password) => {
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setHostAuth(true)
      setIsHost(true)
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }, [])

  // ── Sign out ──
  const signOut = useCallback(() => {
    clearAuthUser()
    clearHostAuth()
    setUser(null)
    setIsHost(false)
  }, [])

  const signOutUser = useCallback(() => {
    clearAuthUser()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isHost, loading, signInAsGuest, signInAsHost, signOut, signOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
