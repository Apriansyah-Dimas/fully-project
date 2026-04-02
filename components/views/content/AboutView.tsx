'use client'

export function AboutView() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-12">
        <div className="text-center max-w-[900px] w-full">
          {/* About Image */}
          <div className="w-full h-[110px] mt-8 mb-6 flex justify-center">
            <img
              src="https://i.ibb.co.com/gFvvc2V2/gambarz.jpg"
              alt="About Image"
              className="w-full max-w-[900px] rounded-2xl object-cover"
            />
          </div>

          {/* About Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 text-left mx-auto">
            {/* Left: About Company - spans 2 rows */}
            <div className="col-span-1 row-span-2 bg-black text-white p-5 rounded-2xl flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">About Company</h3>
              <p className="text-sm leading-relaxed text-justify">
                Established in 2014, Imajin started its journey in 3D printing to become a start-up company that provides a platform that brings together supply and demand in the manufacturing industry by 2022.
              </p>
              <br />
              <p className="text-sm leading-relaxed text-justify">
                Imajin is a marketplace for manufacturers in Indonesia, from making molds, dies, spare parts, to renting CNC machines. Imajin reimagines the possibilities of digitizing the manufacturing industry.
              </p>
            </div>

            {/* Right Top: Vision */}
            <div className="col-span-1 row-span-1 bg-black text-white p-5 rounded-2xl flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3 uppercase tracking-widest">Vision</h3>
              <p className="text-sm leading-relaxed">
                Become digital creative manufacturing ecosystem
              </p>
            </div>

            {/* Right Bottom: Mission */}
            <div className="col-span-1 row-span-1 bg-[#6365b9] text-white p-5 rounded-2xl flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1">
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
      </main>
    )
  }
