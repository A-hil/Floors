import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import HomePage from './pages/HomePage.jsx' 
import SearchResultsPage from './pages/SearchResultsPage.jsx'
import ViewCardPage from './pages/ViewCardPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/", 
        element: <HomePage />, 
      },
      {
        path: "/search",
        element: <SearchResultsPage />, 
      },
      { path: "/property", element: <ViewCardPage /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
