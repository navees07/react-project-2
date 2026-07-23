import { categoryIcon } from './SportIcons.jsx'

export default function ProductCard({ id, title, price, description, category, thumbnail, isNew }) {
  const Icon = categoryIcon(category)

  return (
    <article className="card" style={{ '--stagger': `${(id % 12) * 40}ms` }}>
      {isNew && <span className="card__badge">Just Added</span>}
      <div className="card__media">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://cdn.dummyjson.com/products/images/sports-accessories/Cricket%20Bat/thumbnail.png'
          }}
        />
        <span className="card__number">#{String(id).padStart(3, '0')}</span>
      </div>

      <div className="card__body">
        <div className="card__category">
          <Icon size={14} />
          <span>{formatCategory(category)}</span>
        </div>
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>

      <div className="card__footer">
        <span className="card__price">${Number(price).toFixed(2)}</span>
        <button type="button" className="card__cta">
          Add to Kit
        </button>
      </div>
    </article>
  )
}

function formatCategory(category = '') {
  return category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
