import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice.js'

/**
 * ProductDetail component
 * Fetches detailed info about ONE product using the :id route parameter.
 * useEffect re-runs whenever the id param changes (dynamic routing).
 * Implements graceful error handling for failed fetches.
 */
const ProductDetail = () => {
  const { id }      = useParams()    // Dynamic route param from URL
  const navigate    = useNavigate()
  const dispatch    = useDispatch()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  // ── Fetch product on mount or when id changes ─────────────────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        if (!res.ok) {
          throw new Error(`Product not found — HTTP ${res.status}: ${res.statusText}`)
        }
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Failed to load product details.')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id]) // Re-fetch if the product id in the URL changes

  // Dispatch addToCart with essential product fields
  const handleAddToCart = () => {
    dispatch(addToCart({
      id:        product.id,
      title:     product.title,
      price:     product.price,
      thumbnail: product.thumbnail,
    }))
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <p className="text-4xl mb-3">⚠️</p>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Product</h2>
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-indigo-600 font-medium hover:underline mb-6 inline-block"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ── Images ── */}
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-80 object-contain rounded-xl bg-gray-50 mb-4"
          />
          {/* Thumbnail gallery — each image lazy-loaded */}
          <div className="flex gap-2 flex-wrap">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                loading="lazy"
                className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:border-indigo-400 transition cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 capitalize">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{product.title}</h1>
          <p className="text-gray-500 leading-relaxed mb-5">{product.description}</p>

          {/* Price / rating / stock */}
          <div className="flex items-center gap-5 mb-5 flex-wrap">
            <span className="text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">⭐ {product.rating}</span>
            <span className="text-sm font-semibold text-green-600">In Stock: {product.stock}</span>
          </div>

          {/* Extra metadata */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1 mb-6">
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Discount:</strong> {product.discountPercentage}% off</p>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-auto bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-3 rounded-xl transition-all text-base"
          >
            🛒 Add to Cart
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail
