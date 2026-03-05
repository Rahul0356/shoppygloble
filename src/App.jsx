import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'

// ─── Lazy load all page components for code splitting & performance optimization ───
const ProductList  = lazy(() => import('./components/ProductList.jsx'))
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'))
const Cart         = lazy(() => import('./components/Cart.jsx'))
const Checkout     = lazy(() => import('./components/Checkout.jsx'))
const NotFound     = lazy(() => import('./components/NotFound.jsx'))

// Layout component: wraps every page with the sticky Header and a loading fallback
const Layout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
      {/* Suspense displays a spinner while a lazy component is being loaded */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </main>
  </div>
)

// ─── createBrowserRouter (modern API with better data-handling than BrowserRouter) ───
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/',            element: <ProductList /> },
      { path: '/product/:id', element: <ProductDetail /> },  // dynamic route param :id
      { path: '/cart',        element: <Cart /> },
      { path: '/checkout',    element: <Checkout /> },
      { path: '*',            element: <NotFound /> },        // 404 catch-all
    ],
  },
])

// Root App component — provides the router to the whole tree
function App() {
  return <RouterProvider router={router} />
}

export default App
