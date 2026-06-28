import { X, Search } from 'lucide-react';

export function SelectLocation({ isOpen, onClose, onSelectCity }) {
  // Если состояние isOpen false — компонент вообще ничего не рендерит
  if (!isOpen) return null;

  const popularCities = ['Москва и МО', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Задний полупрозрачный фон (бекдроп) — закрывает модалку при клике на него */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Контентное окно модалки */}
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Шапка модалки с кнопкой закрытия */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Выберите город</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Инпут поиска внутри модалки */}
        <div className="relative flex items-center mb-4">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Поиск города..." 
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Список городов */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => {
                onSelectCity(city);
                onClose(); // Закрываем после выбора
              }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              {city}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
