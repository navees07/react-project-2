export default function Loader({ label = 'Loading the kit bag…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__ball" aria-hidden="true">
        <span className="loader__seam" />
        <span className="loader__seam loader__seam--b" />
      </span>
      <p className="loader__label">{label}</p>
    </div>
  )
}
