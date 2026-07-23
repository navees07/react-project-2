import { useState, useEffect, useCallback } from 'react'

const FETCH_URL = 'https://dummyjson.com/products/category/sports-accessories'
const ADD_URL = 'https://dummyjson.com/products/add'

/**
 * useProducts
 * Custom hook that owns all product data concerns for the catalog:
 * - loads the initial gear list on mount (useEffect)
 * - exposes loading / error state
 * - exposes an addProduct() action that POSTs a new item and
 *   prepends it to local state (dummyjson doesn't persist adds,
 *   so we simulate the "new item in the store" experience locally)
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(FETCH_URL)
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setProducts(data.products ?? [])
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Something went wrong loading the gear.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadProducts()
    return () => {
      cancelled = true
    }
  }, [])

  const addProduct = useCallback(async (newProduct) => {
    setIsAdding(true)
    setError(null)
    try {
      const res = await fetch(ADD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      const created = await res.json()

      // dummyjson always echoes id 101+ but never actually stores it,
      // so we give it a locally-unique id and drop it straight into the grid.
      const withThumbnail = {
        ...created,
        id: created.id ?? Date.now(),
        thumbnail: created.thumbnail || newProduct.thumbnail || fallbackThumbnail(newProduct.category),
      }
      setProducts((prev) => [withThumbnail, ...prev])
      return { ok: true, product: withThumbnail }
    } catch (err) {
      const message = err.message || 'Could not add this item to the catalog.'
      setError(message)
      return { ok: false, message }
    } finally {
      setIsAdding(false)
    }
  }, [])

  return { products, isLoading, isAdding, error, addProduct }
}

function fallbackThumbnail(category) {
  const isFootball = (category || '').toLowerCase().includes('football')
  return isFootball
    ? 'https://cdn.dummyjson.com/products/images/sports-accessories/Football/thumbnail.png'
    : 'https://cdn.dummyjson.com/products/images/sports-accessories/Cricket%20Bat/thumbnail.png'
}
