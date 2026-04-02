'use client'

import Link from 'next/link'

interface LoginButtonProps {
  href?: string
  label?: string
}

export function LoginButton({ href = '/login', label = 'LOGIN' }: LoginButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <Link
        href={href}
        className="relative inline-block align-middle text-black font-bold text-sm px-6 py-3 cursor-pointer border-3 border-black rounded-[30px] uppercase tracking-widest transition-colors duration-700 bg-transparent z-2 overflow-hidden group hover:text-white"
      >
        <span className="relative z-10">{label}</span>
        <div className="c-button__blobs absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none z-[-1] rounded-[30px]">
          <div className="absolute w-[40%] h-[140%] bg-black rounded-full top-0 left-0 transition-transform duration-700 translate-y-[140%] group-hover:translate-y-[-10px]" />
          <div className="absolute w-[40%] h-[140%] bg-black rounded-full top-0 left-[32%] transition-transform duration-700 delay-[60ms] translate-y-[140%] group-hover:translate-y-[-10px]" />
          <div className="absolute w-[40%] h-[140%] bg-black rounded-full top-0 left-[65%] transition-transform duration-700 delay-[25ms] translate-y-[140%] group-hover:translate-y-[-10px]" />
        </div>
      </Link>

      {/* SVG Filter for gooey effect */}
      <svg
        className="absolute -top-[9999px] -left-[9999px]"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
