import { motion } from 'framer-motion'

function ChibiMascot() {
  // A simple, original chibi-style mascot built with SVG shapes (not a copyrighted character)
  return (
    <motion.svg
      width="220"
      height="220"
      viewBox="0 0 220 220"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
    >
      {/* Face */}
      <motion.circle cx="110" cy="95" r="48" fill="#FFE7D1" />
      {/* Hair */}
      <motion.path d="M62,96 C62,52 158,52 158,96 C158,60 62,60 62,96 Z" fill="#333" />
      {/* Fringe */}
      <motion.path d="M70,75 Q90,70 110,78 Q130,70 150,75 L150,88 Q130,83 110,88 Q90,83 70,88 Z" fill="#333" />
      {/* Eyes */}
      <motion.circle cx="95" cy="98" r="6" fill="#222" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
      <motion.circle cx="125" cy="98" r="6" fill="#222" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} />
      {/* Blush */}
      <circle cx="85" cy="110" r="5" fill="#FFB1B1" opacity="0.7" />
      <circle cx="135" cy="110" r="5" fill="#FFB1B1" opacity="0.7" />
      {/* Smile */}
      <path d="M95,118 Q110,128 125,118" stroke="#C76E4C" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Body */}
      <motion.rect x="82" y="140" width="56" height="44" rx="10" fill="#FF4D6D" animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
      {/* Arms */}
      <rect x="70" y="148" width="20" height="10" rx="5" fill="#FFE7D1" />
      <rect x="130" y="148" width="20" height="10" rx="5" fill="#FFE7D1" />
      {/* Bento box */}
      <motion.rect x="80" y="168" width="60" height="26" rx="6" fill="#FFF" stroke="#222" strokeWidth="2" animate={{ rotate: [0, -1.5, 1.5, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
      <circle cx="92" cy="181" r="5" fill="#2E7D32" />
      <rect x="100" y="176" width="12" height="10" rx="2" fill="#8D6E63" />
      <rect x="116" y="176" width="12" height="10" rx="2" fill="#FFB300" />
      <circle cx="136" cy="181" r="5" fill="#C62828" />
      {/* Feet */}
      <rect x="90" y="186" width="14" height="6" rx="3" fill="#333" />
      <rect x="116" y="186" width="14" height="6" rx="3" fill="#333" />
    </motion.svg>
  )
}

export default function Hero({ onExplore }) {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-pink-700 text-sm mb-4">
              🍱 Bento Jepang • Fresh & Halal
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Chibi Bento by Maruko Vibes
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              Nikmati nasi bento ala Jepang yang imut dan lezat, ditemani maskot chibi bergaya lucu.
              Pesan cepat, diantar hangat, bikin harimu makin happy!
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onExplore} className="px-5 py-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
                Lihat Menu
              </button>
              <a href="/test" className="px-5 py-3 rounded-lg bg-white text-gray-700 font-semibold border hover:bg-gray-50 transition">
                Cek Koneksi
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-tr from-pink-200 to-amber-200 rounded-full blur-3xl opacity-60"></div>
              <div className="relative">
                <ChibiMascot />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
