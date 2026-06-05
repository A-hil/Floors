import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
// Импортируем правильные названия иконок из Lucide
import {ArrowLeft, Home } from 'lucide-react'; 

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Извлекаем параметры из URL для заголовка
  const action = searchParams.get('action') || 'buy';
  const type = searchParams.get('type') || 'flat';

  return (
<div className="max-w-6xl mx-auto px-4 mt-24 min-h-screen relative">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
    <div className="flex items-center gap-3">
      <button 
        onClick={() => navigate('/')}
        className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
        title="На главную"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          {action === 'buy' ? 'Покупка' : 'Аренда'} {type === 'flat' ? 'квартир' : 'недвижимости'}
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Найдено 142 объявления</p>
      </div>
    </div>
  </div>


{/* Главная обертка для всего блока */}
<div className='relative w-full'>

  <div className='hidden md:block absolute left-0 top-0 w-60 z-30'>
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-lg flex flex-col gap-5 sticky top-24">
      
      <h3 className="font-bold text-gray-900 text-base border-b border-gray-50 pb-2">Фильтры</h3>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Количество комнат</label>
        <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
          <button className="flex-1 py-1.5 text-xs font-semibold bg-white rounded-lg shadow-sm text-blue-600">Студия</button>
          <button className="flex-1 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900">1</button>
          <button className="flex-1 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900">2</button>
          <button className="flex-1 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900">3+</button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Цена, ₽</label>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="от" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500" />
          <input type="number" placeholder="до" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Тип дома</label>
        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-gray-600 font-medium">
          <option>Любой</option>
          <option>Кирпичный</option>
          <option>Монолитный</option>
          <option>Панельный</option>
        </select>
      </div>

      <button className="w-full mt-2 py-2.5 bg-gray-50 hover:bg-gray-100 active:scale-95 text-gray-700 font-semibold text-xs rounded-xl transition-all border border-gray-100">
        Показать результаты
      </button>

    </div>
  </div>

  {/* КАРТОЧКИ: Чистая сетка, сдвинутая вправо на md:pl-64 */}
  {/* Удалены лишние классы order, md:col-span-3, которые были нужны для табличной верстки */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start md:pl-64">
    
    {/* Временная заглушка карточки 1 */}
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
        <Home className="w-12 h-12 stroke-[1]" />
      </div>
      <div className="p-4">
        <div className="text-xl font-bold text-gray-900">12 500 000 ₽</div>
        <div className="text-sm font-medium text-gray-700 mt-1">2-комн. квартира, 54 м², 12/17 эт.</div>
        <div className="text-xs text-gray-400 mt-2">Москва, ул. Ленина, д. 10</div>
      </div>
    </div>

  </div>

</div>


</div>
  );
}