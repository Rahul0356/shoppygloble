import { createSlice } from '@reduxjs/toolkit'

// ─── Cart Slice ───────────────────────────────────────────────────────────────
// Manages the shopping-cart state: add, remove, increase, decrease, clear
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ id, title, price, thumbnail, quantity }]
  },
  reducers: {
    // Add product to cart; if already present, increment its quantity
    addToCart(state, action) {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Remove a product entirely from the cart by id
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // Increase the quantity of a cart item by 1
    increaseQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload)
      if (item) item.quantity += 1
    },

    // Decrease the quantity of a cart item — minimum allowed value is 1
    decreaseQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) item.quantity -= 1
    },

    // Empty the entire cart (called after order is placed)
    clearCart(state) {
      state.items = []
    },
  },
})

// ─── Actions ─────────────────────────────────────────────────────────────────
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectCartItems = (state) => state.cart.items
// Total number of individual items across all products
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
// Total monetary value of the cart
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export default cartSlice.reducer
