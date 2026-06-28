import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // Оставляем этот импорт
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'

import App from './App.jsx'
import HomePage from './pages/HomePage.jsx' 
import SearchResultsPage from './pages/SearchResultsPage.jsx'
import ViewCardPage from './pages/ViewCardPage.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Отключаем лишние запросы при смене вкладок
      retry: 1,
    },
  },
});

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
      { 
        path: "/property/:id", 
        element: <ViewCardPage /> 
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
