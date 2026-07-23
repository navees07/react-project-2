import { useState } from 'react'

const CATEGORIES = [
  { value: 'cricket-gear', label: 'Cricket Gear' },
  { value: 'football-gear', label: 'Football Gear' },
]

const EMPTY_FORM = {
  title: '',
  price: '',
  description: '',
  category: 'cricket-gear',
  thumbnail: '',
}

export default function AddProductForm({ onAdd, isAdding }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', message }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)

    if (!form.title.trim() || !form.price) {
      setStatus({ type: 'error', message: 'Give the item a name and a price first.' })
      return
    }

    const result = await onAdd({
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim() || 'No description provided.',
      category: form.category,
      thumbnail: form.thumbnail.trim(),
    })

    if (result.ok) {
      setStatus({ type: 'success', message: `${form.title} is on the shelf.` })
      setForm(EMPTY_FORM)
    } else {
      setStatus({ type: 'error', message: result.message })
    }
  }

  return (
    <section className="add-form" aria-labelledby="add-form-heading">
      <div className="add-form__intro">
        <h2 id="add-form-heading">Stock the Shelf</h2>
        <p>Add your own bat, ball, boot or kit — it drops straight into the catalog above.</p>
      </div>

      <form className="add-form__grid" onSubmit={handleSubmit}>
        <label className="field">
          <span>Item name</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Carbon Strike Football Boots"
            required
          />
        </label>

        <label className="field">
          <span>Price (USD)</span>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="79.99"
            min="0"
            step="0.01"
            required
          />
        </label>

        <label className="field">
          <span>Category</span>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Image URL (optional)</span>
          <input
            type="url"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="https://…"
          />
        </label>

        <label className="field field--wide">
          <span>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="What makes this gear worth grabbing?"
          />
        </label>

        <button type="submit" className="add-form__submit" disabled={isAdding}>
          {isAdding ? 'Adding…' : 'Add to Catalog'}
        </button>
      </form>

      {status && (
        <p className={`add-form__status add-form__status--${status.type}`} role="status">
          {status.message}
        </p>
      )}
    </section>
  )
}
