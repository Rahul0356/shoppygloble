import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice.js'

/**
 * ProductItem component
 * Renders a single product card in the product grid.
 *
 * Props:
 *   product {object} — { id, title, price, thumbnail, rating, stock, category }
 */
const ProductItem = ({ product }) => {
  const dispatch = useDispatch()

  // Dispatch addToCart action with the minimal data needed for cart display
  const handleAddToCart = () => {
    dispatch(addToCart({
      id:        product.id,
      title:     product.title,
      price:     product.price,
      thumbnail: product.thumbnail,
    }))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group">

      {/* Product image — lazy loaded for performance */}
      <Link to={`/product/${product.id}`} className="overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {/* Category label */}
        <span className="text-xs text-gray-400 uppercase tracking-wide mb-1 capitalize">
          {product.category}
        </span>

        {/* Title links to ProductDetail page */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>

        {/* Price and rating row */}
        <div className="flex items-center justify-between mt-auto mb-3">
          <span className="text-lg font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">⭐ {product.rating}</span>
        </div>

        {/* Add to Cart button — dispatches Redux action */}
        <button
          onClick={handleAddToCart}
          aria-label={`Add ${product.title} to cart`}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold py-2 rounded-lg transition-all"
        >
          Add to Cart
        </button>
      </div>

    </div>
  )
}

export default ProductItem
