import Link from 'next/link'
import NeonParticles from '../components/NeonParticles'
import { useEffect, useState } from 'react'

const BUTTONS = [
  { name: 'Splunk', link: 'https://app.splunk.gg/u/exmadeGG' },
  { name: 'Injuries', link: 'https://www.logged.tg/auth/exmade' },
  { name: 'Cookie Bypasser', link: 'https://app.splunk.gg/u/exmadeGG' },
  { name: 'Hyperlink Gen', link: 'https://dsprs.vercel.app/hyperlink' }
]

export default function Methods() {
  const [theme, setTheme] = useState('neon')
  useEffect(() => {
    const t = localStorage.getItem('exmade_theme') || 'neon'
    setTheme(t)
  }, [])

  return (
    <div className={`app-root ${theme}`} style={{ filter: 'brightness(100%)' }}>
      <NeonParticles color={theme === 'neon' ? '255,0,0' : '160,160,160'} particleCount={90} maxSize={3} speed={0.7} opacity={0.9} />
      <main className="methods-main">
        <Link href="/"><a className="back-link">← Home</a></Link>

        <h2 className="methods-title">Methods</h2>

        <div className="methods-grid">
          {BUTTONS.map((b, i) => (
            <a
              key={i}
              href={b.link}
              target="_blank"
              rel="noopener noreferrer"
              className="method-btn"
            >
              {b.name}
            </a>
          ))}
        </div>

        <footer className="methods-footer">External links open in a new tab.</footer>
      </main>
    </div>
  )
}
