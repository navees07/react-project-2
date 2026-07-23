export function CricketBallIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#B3282D" stroke="#7A171B" strokeWidth="1" />
      <path
        d="M4 8c4 3 4 5 0 8M20 8c-4 3-4 5 0 8"
        stroke="#F3F1E7"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function FootballIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#F3F1E7" stroke="#1A1A1A" strokeWidth="1" />
      <path
        d="M12 7l3 2.2-1.1 3.6H10.1L9 9.2 12 7zM12 7V4M9 9.2 6 8M15 9.2l3-1.2M10.1 12.8 8 16M13.9 12.8 16 16"
        stroke="#1A1A1A"
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="#1A1A1A"
      />
    </svg>
  )
}

export function categoryIcon(category = '') {
  return category.toLowerCase().includes('football') ? FootballIcon : CricketBallIcon
}
