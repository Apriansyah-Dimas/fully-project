'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useSupabase } from '@/components/providers/SessionProvider'
import { useRouter } from 'next/navigation'

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

export default function LoginPage() {
  const { supabase } = useSupabase()
  const router = useRouter()
  const headerRef = useRef<HTMLHeadingElement>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [headerText, setHeaderText] = useState('Sign In')

  useEffect(() => {
    const next = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
    setHeaderText(next)
  }, [])

  useEffect(() => {
    if (!headerRef.current) return
    const fx = new TextScramble(headerRef.current)
    const timer = window.setTimeout(() => {
      void fx.setText(headerText)
    }, 250)

    return () => {
      window.clearTimeout(timer)
      fx.destroy()
    }
  }, [headerText])

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  const validatePassword = (value: string) => value.length >= 6

  const handleCancel = () => {
    if (loading) return
    router.push('/')
  }

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

    router.push('/?view=home')
  }

  return (
    <main className="login-page min-h-[100dvh] flex items-center justify-center px-4 py-6 relative">
      <div className="w-full flex justify-center">
        <div className="card">
          <header className="text-center mb-2">
            <h1 ref={headerRef} className="scramble-text">
              {headerText}
            </h1>
            <p>Enter your credentials to access your account.</p>
          </header>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email Address</label>
              <div className="relative">
                <input
                  id="email"
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
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
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
                onClick={handleCancel}
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
      </div>

      <style>{`
        .login-page {
          background-color: var(--login-bg-color);
          color: var(--login-text-main);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        .login-page * {
          box-sizing: border-box;
        }

        .card {
          background: var(--login-card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--login-card-border);
          border-radius: var(--login-radius-card);
          padding: 36px;
          width: 100%;
          max-width: 420px;
          box-shadow: var(--login-shadow-card);
          display: flex;
          flex-direction: column;
          gap: 22px;
          opacity: 0;
          transform: translateY(20px);
          animation: login-fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .card h1 {
          font-size: 24px;
          font-weight: 600;
          color: var(--login-text-main);
          margin: 0 0 8px;
          letter-spacing: -0.02em;
          display: inline-block;
          min-height: 36px;
        }

        .scramble-text .dud {
          color: var(--login-accent-primary);
          opacity: 0.8;
          display: inline-block;
        }

        .card p {
          font-size: 14px;
          color: var(--login-text-muted);
          font-weight: 400;
          margin: 0;
        }

        .login-page label {
          font-size: 13px;
          font-weight: 500;
          color: var(--login-text-muted);
          margin-left: 2px;
        }

        .login-page input {
          width: 100%;
          background-color: var(--login-input-bg);
          border: 1px solid var(--login-input-border);
          border-radius: var(--login-radius-input);
          padding: 12px 44px 12px 14px;
          font-size: 15px;
          color: var(--login-text-main);
          outline: none;
          transition: all 0.2s ease;
        }

        .login-page input:hover {
          border-color: var(--login-input-border-hover);
        }

        .login-page input:focus {
          border-color: var(--login-accent-primary);
          box-shadow: 0 0 0 3px var(--login-accent-focus-ring);
        }

        .login-page input:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .password-toggle {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #8a8898;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .password-toggle:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.04);
          color: var(--login-text-main);
        }

        .password-toggle:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--login-accent-focus-ring);
        }

        .password-toggle:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .input-error {
          border-color: var(--login-text-error) !important;
        }

        .input-error:focus {
          box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2) !important;
        }

        .error-message {
          font-size: 12px;
          color: var(--login-text-error);
          min-height: 18px;
          opacity: 0;
          transform: translateY(-5px);
          transition: all 0.2s ease;
          margin-left: 2px;
        }

        .error-message.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .actions button[type='submit'] {
          flex: 1;
          background-color: var(--login-accent-primary);
          color: white;
          border: none;
          border-radius: var(--login-radius-input);
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .actions button[type='submit']:hover:not(:disabled) {
          background-color: var(--login-accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 101, 185, 0.3);
        }

        .actions button[type='submit']:active:not(:disabled) {
          transform: translateY(0);
        }

        .actions button[type='submit']:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .footer {
          text-align: center;
          font-size: 13px;
          color: var(--login-text-muted);
          line-height: 1.6;
        }

        .spinner {
          display: none;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: login-spin 0.8s linear infinite;
          margin-right: 2px;
          vertical-align: middle;
        }

        .loading .spinner {
          display: inline-block;
        }

        .secondary-action {
          flex: 1;
          background: transparent;
          border: 1px solid var(--login-input-border);
          border-radius: var(--login-radius-input);
          color: var(--login-text-main);
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
        }

        .secondary-action:hover:not(:disabled) {
          border-color: var(--login-input-border-hover);
          background-color: rgba(0, 0, 0, 0.03);
        }

        .secondary-action:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .remember-row {
          margin-top: -4px;
        }

        .remember-me {
          font-size: 13px;
          color: var(--login-text-muted);
          user-select: none;
        }

        .checkbox-wrapper {
          position: relative;
        }

        .checkbox-input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid var(--login-input-border);
          border-radius: 6px;
          background-color: var(--login-input-bg);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox-custom .checkmark {
          width: 12px;
          height: 12px;
          stroke: white;
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.2s ease;
        }

        .remember-me:hover .checkbox-custom {
          border-color: var(--login-input-border-hover);
          transform: scale(1.05);
        }

        .checkbox-input:checked + .checkbox-custom {
          background: linear-gradient(135deg, var(--login-accent-primary) 0%, #4a4d8a 100%);
          border-color: var(--login-accent-primary);
          box-shadow: 0 2px 8px rgba(99, 101, 185, 0.4);
        }

        .checkbox-input:checked + .checkbox-custom .checkmark {
          opacity: 1;
          transform: scale(1);
        }

        .checkbox-input:disabled + .checkbox-custom {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .checkbox-label {
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .remember-me:hover .checkbox-label {
          color: var(--login-text-main);
        }
      `}</style>
    </main>
  )
}
