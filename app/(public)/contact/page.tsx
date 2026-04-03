import { PageShell } from '@/components/templates/PageShell'

export default function ContactPage() {
  return (
    <PageShell className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center max-w-[900px] w-full animate-[fadeIn_0.5s_ease_forwards]">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-black leading-[1.1] tracking-[-0.02em] mb-8">
          Contact Us
        </h1>

        {/* Contact Grid */}
        <div className="grid grid-cols-2 gap-6 text-left mx-auto">
          {/* LEFT: Locations Card (50%) */}
          <div className="bg-black text-white p-5 pr-12 pl-12 rounded-2xl flex flex-col justify-start">
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest flex items-center gap-3">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Locations
            </h3>
            <p className="text-sm leading-relaxed text-justify">
              <strong>Head Office</strong><br />
              Biomedical Campus - Knowledge Tower 1st Floor, Zone 2, Kavling Digital Hub Jl. Damai Foresta, Sampora, Cisauk Tangerang 15345
            </p>
            <p className="text-sm leading-relaxed text-justify mt-3">
              <strong>Deltamas 1 &amp; 2</strong><br />
              Rental Factory Building, Greenland International Industrial Center (GIIC) – Kota Deltamas, Blok A-8, Sukamukti, Kabupaten Bekasi, Jawa Barat 17330
            </p>
          </div>

          {/* RIGHT COLUMN WRAPPER */}
          <div className="grid grid-cols-2 gap-4">
            {/* Email Card (Top Left) */}
            <div className="bg-black text-white p-5 rounded-2xl flex flex-col justify-start">
              <h3 className="text-xl font-bold mb-3 uppercase tracking-widest flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email
              </h3>
              <a href="mailto:hrd@imajin.id" className="text-sm text-white no-underline font-semibold block py-1 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                hrd@imajin.id
              </a>
              <a href="mailto:generalaffair@imajin.id" className="text-sm text-white no-underline font-semibold block py-1 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                generalaffair@imajin.id
              </a>
            </div>

            {/* Phone Card (Top Right) */}
            <div className="bg-black text-white p-5 rounded-2xl flex flex-col justify-start">
              <h3 className="text-xl font-bold mb-3 uppercase tracking-widest flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Phone
              </h3>
              <a href="https://wa.me/6282170970993" target="_blank" rel="noopener noreferrer" className="text-sm text-white no-underline font-semibold inline-block py-1 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                +62 821-7097-0993
              </a>
            </div>

            {/* Social Media Card (Bottom Full Width) */}
            <div className="col-span-2 bg-[#6365b9] text-white p-5 rounded-2xl flex flex-col justify-start">
              <h3 className="text-xl font-bold mb-2 uppercase tracking-widest flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                Social Media
              </h3>
              <p className="text-sm mb-3">Follow us on various social media channels.</p>
              <div className="flex gap-3 flex-wrap">
                <a href="https://www.linkedin.com/company/imajinmanufacture/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,255,255,0.15)] text-white no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:bg-[#0A66C2]" title="LinkedIn">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/imajin.id/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,255,255,0.15)] text-white no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)] hover:-translate-y-0.5" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }} title="Instagram">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/imajin.id/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,255,255,0.15)] text-white no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:bg-[#1877F2]" title="Facebook">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@lifeatimajin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,255,255,0.15)] text-white no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:bg-[#000000]" title="TikTok">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.54-.05z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@imajinmanufacturing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,255,255,0.15)] text-white no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:bg-[#FF0000]" title="YouTube">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
