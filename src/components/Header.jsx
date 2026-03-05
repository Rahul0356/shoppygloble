import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../redux/cartSlice.js'

/**
 * Header component
 * Displays the brand name, navigation links, and a cart icon with item count badge.
 * Cart count is read directly from Redux store.
 */
const Header = () => {
  // Get total cart item count from Redux to show on badge
  const cartCount = useSelector(selectCartCount)

  return (
    <header className="bg-indigo-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand / Home link */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-indigo-100 transition-colors">
          🛒 ShoppyGlobe
        </Link>

        {/* Navigation menu */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="font-medium hover:text-indigo-200 transition-colors"
          >
            Home
          </Link>

          {/* Cart link with badge showing item count */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-1.5 rounded-full font-medium"
          >
            <span>🛍️</span>
            <span>Cart</span>
            {/* Badge only visible when cart has items */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

      </div>
    </header>
  )
}

export default Header
