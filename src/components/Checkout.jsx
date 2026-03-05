import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice.js'

/**
 * Checkout component
 * - Shows a dummy form to collect user delivery details
 * - Shows a summary of all cart items
 * - On "Place Order": displays confirmation message, clears cart, redirects home
 */
const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  // Local form state for user detail fields
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: '',
  })

  // Controls the "Order placed" success screen
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Update a single form field
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Handle Place Order click
  const handlePlaceOrder = () => {
    // Simple validation: every field must be filled
    if (Object.values(form).some(v => v.trim() === '')) {
      alert('Please fill in all fields before placing your order.')
      return
    }
    setOrderPlaced(true)
    dispatch(clearCart()) // Empty the cart in Redux
    // Redirect to home automatically after 3 seconds
    setTimeout(() => navigate('/'), 3000)
  }

  // ── Empty cart guard ────────────────────────────────────────────────────────
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-4xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Your cart is empty!</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Products
        </button>
      </div>
    )
  }

  // ── Order success screen ────────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-6xl mb-4">✅</p>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-1">Thank you for shopping with ShoppyGlobe.</p>
        <p className="text-gray-400 text-sm">Redirecting to Home page...</p>
      </div>
    )
  }

  // ── Main checkout layout ────────────────────────────────────────────────────
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── Delivery Details Form ── */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-5">Delivery Details</h2>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text" id="name" name="name"
                value={form.name} onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email" id="email" name="email"
                value={form.email} onChange={handleChange}
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel" id="phone" name="phone"
                value={form.phone} onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">
                Street Address
              </label>
              <input
                type="text" id="address" name="address"
                value={form.address} onChange={handleChange}
                placeholder="123 Main Street"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            {/* City + ZIP row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-600 mb-1">
                  City
                </label>
                <input
                  type="text" id="city" name="city"
                  value={form.city} onChange={handleChange}
                  placeholder="New York"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-600 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text" id="zip" name="zip"
                  value={form.zip} onChange={handleChange}
                  placeholder="10001"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-5">Order Summary</h2>

          {/* List of cart items in summary */}
          <div className="space-y-3 mb-5">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.thumbnail} alt={item.title}
                  loading="lazy"
                  className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-indigo-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-4 mb-6">
            <span className="font-semibold text-gray-700">Total</span>
            <strong className="text-2xl text-indigo-600">${cartTotal.toFixed(2)}</strong>
          </div>

          {/* Place Order button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all text-base"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  )
}

export default Checkout
