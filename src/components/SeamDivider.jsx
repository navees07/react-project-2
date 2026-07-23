export default function SeamDivider({ label }) {
  return (
    <div className="seam-divider" role="separator">
      <span className="seam-divider__line" aria-hidden="true" />
      {label && <span className="seam-divider__label">{label}</span>}
      <span className="seam-divider__line" aria-hidden="true" />
    </div>
  )
}
