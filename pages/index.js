import Link from 'next/link'
import { useEffect, useState } from 'react'
import NeonParticles from '../components/NeonParticles'

export default function Home() {
  const [brightness, setBrightness] = useState(100)
  const [theme, setTheme] = useState('neon') // 'neon' | 'glass'
  const [particleColor, setParticleColor] = useState('255,0,0')

  useEffect(() => {
    // remember last theme for user (persist)
    const t = localStorage.getItem('exmade_theme')
    const b = localStorage.getItem('exmade_brightness')
    if (t) setTheme(t)
    if (b) setBrightness(Number(b))
  }, [])

  useEffect(() => localStorage.setItem('exmade_theme', theme), [theme])
  useEffect(() => localStorage.setItem('exmade_brightness', brightness), [brightness])

  useEffect(() => {
    // switch particle color based on theme
    if (theme === 'neon') setParticleColor('255,0,0')
    else setParticleColor('160,160,160') // neutral glow for glass mode
  }, [theme])

  return (
    <div className={`app-root ${theme}`} style={{ filter: `brightness(${brightness}%)` }}>
      <div className="background-layer" />
      <NeonParticles color={particleColor} particleCount={100} maxSize={2.8} speed={0.8} opacity={0.95} />
      <main className="main">
        <header className="header">
          <h1 className="logo">exmadeW</h1>
          <div className="controls">
            <label className="control-row">
              <span>Theme</span>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="neon">Neon (default)</option>
                <option value="glass">Glass</option>
              </select>
            </label>

            <label className="control-row brightness">
              <span>Brightness</span>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                aria-label="Brightness slider"
              />
            </label>
          </div>
        </header>

        <section className="content">
          <Link href="/methods">
            <a className="primary-btn">Methods</a>
          </Link>

          <p className="hint">Click Methods to view Splunk / Injuries / Cookie / Hyperlink tools</p>
        </section>

        <footer className="footer">exmadeW · red neon theme · built for Vercel</footer>
      </main>
    </div>
  )
}
