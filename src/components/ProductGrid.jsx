import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, newestId }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No gear on the shelf yet. Add the first item below.</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} isNew={product.id === newestId} />
      ))}
    </div>
  )
}
