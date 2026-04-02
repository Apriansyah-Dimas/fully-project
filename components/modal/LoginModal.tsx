'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSupabase } from '@/components/providers/SessionProvider'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const GREETINGS = [
  'Good to see you',
  'Hi, welcome back',
  'Ready to start?',
  "Oh, it's you again",
  'You again?',
  'Ready to continue?',
]

type ScrambleQueueItem = {
  from: string
  to: string
  start: number
  end: number
  char?: string
}

class TextScramble {
  private el: HTMLElement
  private chars = '!<>-_\\/[]{}=+*^?#________'
  private queue: ScrambleQueueItem[] = []
  private frame = 0
  private frameRequest: number | null = null
  private resolver: (() => void) | null = null

  constructor(el: HTMLElement) {
    this.el = el
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)

    const promise = new Promise<void>((resolve) => {
      this.resolver = resolve
    })

    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 20)
      const end = start + Math.floor(Math.random() * 25)
      this.queue.push({ from, to, start, end })
    }

    if (this.frameRequest !== null) cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  destroy() {
    if (this.frameRequest !== null) cancelAnimationFrame(this.frameRequest)
  }

  private update() {
    let output = ''
    let complete = 0

    for (let i = 0; i < this.queue.length; i++) {
      const { from, to, start, end } = this.queue[i]
      let { char } = this.queue[i]

      if (this.frame >= end) {
        complete += 1
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output

    if (complete === this.queue.length) {
      this.resolver?.()
      this.resolver = null
      this.frameRequest = null
      return
    }

    this.frameRequest = requestAnimationFrame(this.update)
    this.frame += 1
  }

  private randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const { supabase } = useSupabase()
  const headerRef = useRef<HTMLHeadingElement>(null)
  const scrambleRef = useRef<TextScramble | null>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [headerText, setHeaderText] = useState('Sign In')

  useEffect(() => {
    if (isOpen) {
      const next = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
      setHeaderText(next)
    }
  }, [isOpen])

  useEffect(() => {
    if (!headerRef.current || !isOpen) return

    if (scrambleRef.current) {
      scrambleRef.current.destroy()
    }

    scrambleRef.current = new TextScramble(headerRef.current)
    const timer = window.setTimeout(() => {
      void scrambleRef.current?.setText(headerText)
    }, 250)

    return () => {
      window.clearTimeout(timer)
      scrambleRef.current?.destroy()
    }
  }, [headerText, isOpen])

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  const validatePassword = (value: string) => value.length >= 6

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (loading) return

    let valid = true
    setErrorEmail('')
    setErrorPassword('')

    if (!validateEmail(email)) {
      setErrorEmail('Please enter a valid email address.')
      valid = false
    }

    if (!validatePassword(password)) {
      setErrorPassword('Password must be at least 6 characters.')
      valid = false
    }

    if (!valid) return

    setLoading(true)
    const { data, error } = await supabase!.auth.signInWithPassword({
      email,
      password,
    })

    if (!error && rememberMe) {
      await supabase!.auth.setSession({
        access_token: data.session!.access_token,
        refresh_token: data.session!.refresh_token,
      })
    }

    setLoading(false)

    if (error) {
      setErrorPassword('Invalid email or password.')
      return
    }

    onSuccess()
  }

  const handleClose = () => {
    if (loading) return
    onClose()
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, loading])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[310] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="w-full max-w-[420px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="login-card">
                <header className="text-center mb-2">
                  <h1 ref={headerRef} className="scramble-text">
                    {headerText}
                  </h1>
                  <p>Enter your credentials to access your account.</p>
                </header>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="modal-email">Email Address</label>
                    <div className="relative">
                      <input
                        id="modal-email"
                        name="email"
                        type="email"
                        placeholder="name@company.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errorEmail) setErrorEmail('')
                        }}
                        onBlur={() => {
                          if (email && !validateEmail(email)) {
                            setErrorEmail('Please enter a valid email address.')
                          }
                        }}
                        className={errorEmail ? 'input-error' : ''}
                        disabled={loading}
                      />
                    </div>
                    <span className={`error-message ${errorEmail ? 'visible' : ''}`}>{errorEmail}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="modal-password">Password</label>
                    <div className="relative">
                      <input
                        id="modal-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (errorPassword) setErrorPassword('')
                        }}
                        onBlur={() => {
                          if (password && !validatePassword(password)) {
                            setErrorPassword('Password must be at least 6 characters.')
                          }
                        }}
                        className={errorPassword ? 'input-error' : ''}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={loading}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-5.94" />
                            <path d="M9.9 4.24A10.93 10.93 0 0 1 12 4c7 0 11 8 11 8a21.73 21.73 0 0 1-3.17 4.36" />
                            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                            <path d="M1 1l22 22" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <span className={`error-message ${errorPassword ? 'visible' : ''}`}>
                      {errorPassword}
                    </span>
                  </div>

                  <div className="remember-row flex items-center justify-between">
                    <label className="remember-me flex items-center gap-2.5 cursor-pointer group">
                      <div className="checkbox-wrapper relative">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="checkbox-input"
                          disabled={loading}
                        />
                        <div className="checkbox-custom">
                          <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      </div>
                      <span className="checkbox-label">Remember me</span>
                    </label>
                  </div>

                  <div className="actions flex gap-2.5 items-center mt-1">
                    <button
                      type="button"
                      className="secondary-action"
                      onClick={handleClose}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={loading ? 'loading' : ''}
                      disabled={loading}
                    >
                      <span className="spinner" />
                      <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                    </button>
                  </div>
                </form>

                <footer className="text-center">
                  Contact your administrator to request access.
                </footer>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
