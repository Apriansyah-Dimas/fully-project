import { PageShell } from '@/components/templates/PageShell'

export default function AboutPage() {
  return (
    <PageShell>
      <div className="text-center max-w-[900px] w-full animate-[fadeIn_0.5s_ease_forwards] scale-90">
        {/* About Image */}
        <div className="w-full h-[80px] mt-8 mb-6 flex justify-center">
          <img
            src="https://i.ibb.co.com/gFvvc2V2/gambarz.jpg"
            alt="About Image"
            className="w-full max-w-[900px] rounded-2xl object-cover"
          />
        </div>

        {/* About Grid */}
        <div className="grid grid-cols-[1fr_1fr] gap-4 text-left mx-auto">
          {/* Left: About Company */}
          <div className="bg-black text-white p-4 rounded-2xl flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">About Company</h3>
            <p className="text-sm leading-relaxed text-justify">
              Established in 2014, Imajin started its journey in 3D printing to become a start-up company that provides a platform that brings together supply and demand in the manufacturing industry by 2022.
            </p>
            <p className="text-sm leading-relaxed text-justify mt-3">
              Imajin is a marketplace for manufacturers in Indonesia, from making molds, dies, spare parts, to renting CNC machines. Imajin reimagines the possibilities of digitizing the manufacturing industry.
            </p>
          </div>

          {/* Right: Vision + Mission stacked */}
          <div className="flex flex-col gap-4">
            <div className="bg-black text-white p-4 rounded-2xl flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-2 uppercase tracking-widest">Vision</h3>
              <p className="text-sm leading-relaxed">
                Become digital creative manufacturing ecosystem
              </p>
            </div>

            <div className="bg-[#6365b9] text-white p-4 rounded-2xl flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">Mission</h3>
              <ul className="text-sm leading-relaxed">
                <li className="mb-2 pl-5 relative font-medium text-justify">
                  <span className="absolute left-0 text-[rgba(255,255,255,0.7)] font-bold">•</span>
                  Increasing local product to be manufactured
                </li>
                <li className="mb-2 pl-5 relative font-medium text-justify">
                  <span className="absolute left-0 text-[rgba(255,255,255,0.7)] font-bold">•</span>
                  Helping small manufacturer connect and digitalized
                </li>
                <li className="pl-5 relative font-medium text-justify">
                  <span className="absolute left-0 text-[#6365b9] font-bold">•</span>
                  Become a solution in manufacturing industry
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
