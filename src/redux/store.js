import { configureStore } from '@reduxjs/toolkit'
import cartReducer   from './cartSlice.js'
import searchReducer from './searchSlice.js'

// Configure the Redux store with two slices: cart and search
export const store = configureStore({
  reducer: {
    cart:   cartReducer,
    search: searchReducer,
  },
})
