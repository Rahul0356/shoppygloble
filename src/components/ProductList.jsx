import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useFetchProducts from '../hooks/useFetchProducts.js'
import ProductItem from './ProductItem.jsx'
import { selectSearchQuery, setSearchQuery } from '../redux/searchSlice.js'

/**
 * ProductList component
 * - Uses the custom hook useFetchProducts to fetch products on mount
 * - Uses Redux state for the search query to filter the displayed list
 * - Renders each product as a ProductItem card
 */
const ProductList = () => {
  const { products, loading, error } = useFetchProducts() // Custom hook
  const searchQuery = useSelector(selectSearchQuery)       // Redux search state
  const dispatch    = useDispatch()

  // Dispatch updated search query to Redux on every keystroke
  const handleSearch = (e) => dispatch(setSearchQuery(e.target.value))

  // Filter products based on Redux search query (case-insensitive title match)
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  // ── Error state (graceful error handling) ─────────────────────────────────
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <p className="text-4xl mb-3">⚠️</p>
          <h2 className="text-xl font-bold text-red-600 mb-2">Failed to Load Products</h2>
          <p className="text-red-500 text-sm mb-1">{error}</p>
          <p className="text-gray-500 text-sm">Please check your connection and try again.</p>
        </div>
      </div>
    )
  }

  return (
    <section>
      {/* Header row: title + search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        {/* Search input — updates Redux search state on change */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          aria-label="Search products"
          className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-full text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
        />
      </div>

      {/* No results message */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No products found for <strong>"{searchQuery}"</strong></p>
        </div>
      ) : (
        // Product grid — each card gets a unique key prop
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList
