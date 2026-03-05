import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal } from '../redux/cartSlice.js'
import CartItem from './CartItem.jsx'

/**
 * Cart component
 * Displays all items currently in the cart, total price, and navigation to Checkout.
 * Reads state from Redux store.
 */
const Cart = () => {
  const cartItems = useSelector(selectCartItems) // Get items from Redux
  const cartTotal = useSelector(selectCartTotal) // Get total price from Redux

  // ── Empty cart view ────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-6">Add some products to get started.</p>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Shopping Cart</h1>
      <p className="text-gray-400 text-sm mb-6">{cartItems.length} item(s)</p>

      {/* Cart item list — each CartItem has a unique key */}
      <div className="space-y-4 mb-8">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Cart summary card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-sm ml-auto">
        <div className="flex justify-between items-center text-lg mb-5 pb-4 border-b border-gray-100">
          <span className="font-semibold text-gray-700">Total</span>
          <strong className="text-indigo-600 text-2xl">${cartTotal.toFixed(2)}</strong>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to="/checkout"
            className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Proceed to Checkout →
          </Link>
          <Link
            to="/"
            className="block text-center text-indigo-600 hover:underline text-sm font-medium"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
