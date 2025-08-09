import Link from 'next/link'
import { useState } from 'react'
import { FaDiscord } from 'react-icons/fa'

export default function Home() {
  const [brightness, setBrightness] = useState(100)

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white transition-all duration-300" style={{ filter: `brightness(${brightness}%)` }}>
      
      {/* Title */}
      <h1 className="text-5xl font-bold mb-10 text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">exmadeW</h1>

      {/* Methods Button */}
      <Link href="/methods" className="glass-btn mb-6">
        Methods
      </Link>

      {/* Discord Button */}
      <a
        href="https://discord.gg/skDSzwCScu"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-btn flex items-center gap-2 mb-6 bg-[rgba(0,102,255,0.15)] border-blue-500 hover:shadow-[0_0_25px_rgba(0,102,255,0.8)]"
      >
        <FaDiscord className="text-blue-400 text-xl" />
        Our Discord
      </a>

      {/* Brightness Slider */}
      <div className="w-64 mt-4 text-center">
        <label className="mb-2 block">Brightness</label>
        <input
          type="range"
          min="50"
          max="150"
          value={brightness}
          onChange={(e) => setBrightness(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  )
}
