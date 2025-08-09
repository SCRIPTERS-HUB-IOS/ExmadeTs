export default function Methods() {
  const buttons = [
    { name: "Splunk", link: "https://app.splunk.gg/u/exmadeGG" },
    { name: "Injuries", link: "https://www.logged.tg/auth/exmade" },
    { name: "Cookie Bypasser", link: "https://app.splunk.gg/u/exmadeGG" },
    { name: "Hyperlink Gen", link: "https://dsprs.vercel.app/hyperlink" }
  ]

  const handleClick = (e) => {
    e.currentTarget.classList.add("clicked")
    setTimeout(() => {
      e.currentTarget.classList.remove("clicked")
    }, 200)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">Methods</h1>
      <div className="method-list">
        {buttons.map((btn, i) => (
          <a
            key={i}
            href={btn.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="glass-btn method-btn"
          >
            {i + 1}. {btn.name}
          </a>
        ))}
      </div>
    </div>
  )
}
