import { createSlice } from '@reduxjs/toolkit'

// ─── Search Slice ─────────────────────────────────────────────────────────────
// Manages the product search / filter query in Redux state
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // Current search string entered by the user
  },
  reducers: {
    // Update the search query
    setSearchQuery(state, action) {
      state.query = action.payload
    },
    // Reset search query to empty
    clearSearch(state) {
      state.query = ''
    },
  },
})

export const { setSearchQuery, clearSearch } = searchSlice.actions

// Selector to read the current search query from Redux state
export const selectSearchQuery = (state) => state.search.query

export default searchSlice.reducer
