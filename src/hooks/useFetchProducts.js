import { useState, useEffect } from 'react'

/**
 * useFetchProducts  — Custom hook
 * Fetches the full product list from dummyjson when the component mounts.
 * Encapsulates loading and error states so ProductList stays clean.
 *
 * @returns {{ products: Array, loading: boolean, error: string|null }}
 */
const useFetchProducts = () => {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    // Async fetch wrapped in try/catch for graceful error handling
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://dummyjson.com/products')
        if (!res.ok) {
          throw new Error(`Failed to fetch products — HTTP ${res.status}: ${res.statusText}`)
        }
        const data = await res.json()
        setProducts(data.products)
      } catch (err) {
        setError(err.message || 'An unexpected error occurred while loading products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, []) // Empty deps → only runs once on mount

  return { products, loading, error }
}

export default useFetchProducts
