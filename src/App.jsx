import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import './App.css'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      retry: 1,                 // В случае ошибки переотправить запрос только 1 раз
    },
  },
});

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
    <div className="w-full min-h-screen bg-gray-50">
      {/* ШАПКА  */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto h-16 px-6 bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-bold text-2xl text-blue-600 tracking-tight cursor-pointer">
              <span className="flex items-center gap-2 font-black text-2xl tracking-tight select-none cursor-pointer">
                <svg 
                  className="w-7 h-8 text-blue-600 transform scale-x-125 origin-left" 
                  viewBox="0 0 24 32" 
                  fill="currentColor" 
                  xmlns="http://w3.org"
                >
                  <path d="M 2,2 L 22,2 L 19,7 L 8,7 L 8,13 L 18,13 L 15,18 L 8,18 L 8,30 L 2,30 Z" />
                </svg>
                <span className="text-gray-900 font-extrabold -ml-1">loors</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors text-blue-600 font-semibold">Аренда</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Продажа</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Новостройки</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Ипотека</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all shadow-sm">
              + Разместить объявление
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              Войти
            </button>
          </div>
        </div>
      </header> 

      {/* 2. ДИНАМИЧЕСКИЙ КОНТЕНТ (сюда будут подставляться HomePage или SearchResultsPage) */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
    </QueryClientProvider>
  )
}

export default App
