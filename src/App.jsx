import { Outlet, Link } from 'react-router-dom';
import { 
  Sparkles, 
  CopyPlus, 
  MessageSquare, 
  Heart, 
  SearchCode, 
  Bell, 
  Plus 
} from 'lucide-react';
import { useFavorites } from './hooks/useFavorites';
import './App.css';
import './index.css';

function NavigationBar() {
  const { favorites } = useFavorites();

  return (
    <header className="fixed top-0 left-0
    right-0 z-50 bg-white border-b
    border-gray-100 shadow-sm ">
      <div className="w-full max-w-7xl
      mx-auto px-8 flex
      flex-col">
        {/* ВЕРХНЯЯ ПАНЕЛЬ */}
        <div className="h-16 flex items-center
        justify-between gap-4">
          
          {/* Логотип */}
          <Link to="/" className="flex items-center
          justify-center shrink-0">
            <img 
              src="../src/assets/Floors_icon.png" 
              alt="Логотип Floors"
              className="h-11 w-auto object-contain" 
            />
          </Link>

          {/* Правая часть с инструментами */}
          <div className="flex items-center gap-2
          sm:gap-4 ml-auto">
            
            {/* Баббл "Умный помощник" */}
            <button className="hidden md:flex
            items-center gap-2 bg-blue-50/60
            hover:bg-blue-50 text-blue-600
            px-3 py-1.5 rounded-full text-xs
            font-semibold transition-colors">
              <Sparkles className="w-3.5 h-3.5
              fill-blue-600" />
              <span>Умный помощник</span>
            </button>

            {/* Группа иконок из Lucide */}
            <div className="flex items-center
            gap-1 sm:gap-2 text-blue-600">

                <button className="p-2 hover:bg-gray-50
              rounded-lg transition-colors"
              title="Сравнение">
                <CopyPlus className="w-5 h-5" />
              </button>
              
              <button className="p-2 hover:bg-gray-50
              rounded-lg transition-colors"
              title="Сообщения">
                <MessageSquare className="w-5 h-5" />
              </button>
              
              {/* Избранное (Сердечко) со счетчиком */}
              <Link to="/favorites" className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors inline-block" title="Избранное">
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-blue-600' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
              
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors" title="Сохраненные поиски">
                <SearchCode className="w-5 h-5" />
              </button>
              
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors" title="Уведомления">
                <Bell className="w-5 h-5" />
              </button>
              </div>
            </div>

            {/* Кнопка размещения */}
            <button className="inline-flex items-center
            gap-1 bg-blue-600 hover:bg-blue-700
            active:bg-blue-800 text-white text-xs
            sm:text-sm font-semibold px-4 py-2
            rounded-xl transition-all shadow-sm
            whitespace-nowrap">
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Разместить за 0 ₽</span>
            </button>

            {/* Заглушка под Аватар пользователя */}
            
          </div>
          {/* НИЖНЯЯ ПАНЕЛЬ: Навигационные ссылки */}
        <div className="h-10 flex items-center
        border-t border-gray-50 overflow-x-auto
        no-scrollbar whitespace-nowrap">
          <nav className="flex items-center
          gap-6 text-xs sm:text-sm font-medium
          text-gray-600 py-1">
            <a href="#" 
            className="text-gray-600
            hover:text-blue-600 font-medium
            border-b-2 border-transparent
            hover:border-blue-600 pb-2
            translate-y-[1px]">Аренда</a>
            <a href="#" 
            className="text-gray-600
            hover:text-blue-600 font-medium
            border-b-2 border-transparent
            hover:border-blue-600 pb-2
            translate-y-[1px]">Продажа</a>
            <a href="#" 
            className="text-gray-600
            hover:text-blue-600 font-medium
            border-b-2 border-transparent
            hover:border-blue-600 pb-2
            translate-y-[1px]">Новостройки</a>
            <a href="#" 
            className="text-gray-600
            hover:text-blue-600 font-medium
            border-b-2 border-transparent
            hover:border-blue-600 pb-2
            translate-y-[1px]">Дома и участки</a>
            <a href="#" 
            className="text-gray-600
            hover:text-blue-600 font-medium
            border-b-2 border-transparent
            hover:border-blue-600 pb-2
            translate-y-[1px]">Коммерческая</a>
            <a href="#" 
            className="text-gray-600
            hover:text-blue-600 font-medium
            border-b-2 border-transparent
            hover:border-blue-600 pb-2
            translate-y-[1px]">Ипотека</a>
          </nav>
        </div>
        </div>

        
    </header>
  );
}

function App() {
  return (
      <div className="w-full min-h-screen bg-gray-50 pt-32">
        <NavigationBar />

        <main className="w-full">
          <Outlet />
        </main>
      </div>
  );
}

export default App;
