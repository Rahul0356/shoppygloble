import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * NotFound component
 * Displayed for any route that doesn't match a defined path (404).
 * Shows proper error details: status code, attempted path, and description.
 */
const NotFound = () => {
  const navigate  = useNavigate()
  const location  = useLocation() // Captures the path the user tried to visit

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center max-w-lg">

        {/* Large 404 code */}
        <h1 className="text-9xl font-extrabold text-indigo-600 leading-none">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        {/* Error details box */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-left text-sm text-gray-600 mb-8 space-y-1">
          <p><strong>Error:</strong> 404 Not Found</p>
          <p>
            <strong>Requested Path:</strong>{' '}
            <code className="bg-red-100 px-1 py-0.5 rounded text-red-700">{location.pathname}</code>
          </p>
          <p><strong>Description:</strong> The server cannot find the requested resource at the given URL.</p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            🏠 Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg transition"
          >
            ← Go Back
          </button>
        </div>

      </div>
    </div>
  )
}

export default NotFound
