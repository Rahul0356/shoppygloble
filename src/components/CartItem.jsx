import React from 'react'
import { useDispatch } from 'react-redux'
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/cartSlice.js'

/**
 * CartItem component
 * Displays one item in the shopping cart.
 * Allows quantity increase / decrease (min = 1) and removal via Redux actions.
 *
 * Props:
 *   item {object} — { id, title, price, thumbnail, quantity }
 */
const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  const handleRemove   = () => dispatch(removeFromCart(item.id))
  const handleIncrease = () => dispatch(increaseQuantity(item.id))
  // decreaseQuantity in the reducer guards against going below 1
  const handleDecrease = () => dispatch(decreaseQuantity(item.id))

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">

      {/* Product thumbnail — lazy loaded */}
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
      />

      {/* Item details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-sm truncate">{item.title}</h3>
        <p className="text-gray-400 text-xs mb-2">${item.price.toFixed(2)} each</p>

        {/* Quantity controls: − | count | + */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-gray-700 flex items-center justify-center transition"
          >
            −
          </button>
          <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 flex items-center justify-center transition"
          >
            +
          </button>
        </div>

        {/* Line subtotal */}
        <p className="text-sm text-gray-600 mt-1">
          Subtotal: <strong className="text-indigo-600">${(item.price * item.quantity).toFixed(2)}</strong>
        </p>
      </div>

      {/* Remove button */}
      <button
        onClick={handleRemove}
        aria-label={`Remove ${item.title}`}
        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition flex-shrink-0 text-xl"
      >
        🗑️
      </button>

    </div>
  )
}

export default CartItem
