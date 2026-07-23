import { useState } from 'react'
import Header from './components/Header.jsx'
import Loader from './components/Loader.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import AddProductForm from './components/AddProductForm.jsx'
import SeamDivider from './components/SeamDivider.jsx'
import { useProducts } from './hooks/useProducts.js'
import './App.css'

export default function App() {
  const { products, isLoading, isAdding, error, addProduct } = useProducts()
  const [newestId, setNewestId] = useState(null)

  async function handleAdd(newProduct) {
    const result = await addProduct(newProduct)
    if (result.ok) {
      setNewestId(result.product.id)
    }
    return result
  }

  return (
    <div className="app">
      <Header productCount={products.length} />

      <main className="main">
        <SeamDivider label="The Shelf" />

        {isLoading && <Loader label="Loading the kit bag…" />}

        {!isLoading && error && (
          <div className="error-banner" role="alert">
            Couldn't load the gear: {error}
          </div>
        )}

        {!isLoading && !error && <ProductGrid products={products} newestId={newestId} />}

        <SeamDivider label="Add Your Own" />

        <AddProductForm onAdd={handleAdd} isAdding={isAdding} />
      </main>

      <footer className="footer">
        <p>Built for match day. Data served by dummyjson.com — Gearline, 2026.</p>
      </footer>
    </div>
  )
}
