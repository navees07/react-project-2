import { CricketBallIcon, FootballIcon } from './SportIcons.jsx'

export default function Header({ productCount }) {
  return (
    <header className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__eyebrow">
          <CricketBallIcon size={16} />
          <span>Cricket</span>
          <span className="hero__eyebrow-x">×</span>
          <FootballIcon size={16} />
          <span>Football</span>
        </div>
        <h1 className="hero__title">
          GEAR UP<span className="hero__title-dot">.</span>
        </h1>
        <p className="hero__subtitle">
          Bats, balls, boots and kit built for the pitch. Real gear pulled live
          from the catalog — {productCount > 0 ? `${productCount} items on the shelf right now` : 'loading the shelf now'}.
        </p>
      </div>
      <SeamRule />
    </header>
  )
}

function SeamRule() {
  return (
    <svg className="hero__seam" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 20 L1200 20" stroke="#1F5C3F" strokeWidth="2" />
      <g className="hero__seam-stitches">
        {Array.from({ length: 40 }).map((_, i) => (
          <line
            key={i}
            x1={i * 30 + 6}
            y1="12"
            x2={i * 30 - 6}
            y2="28"
            stroke="#E0A526"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  )
}
