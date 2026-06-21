import '../index.css';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2  } from 'lucide-react'; 
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCoordinates } from '../api/geocode';
import {useDebounce} from '../hooks/useDebounce'
import { useAds } from '../hooks/useAds'; 

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  
  const RecomendatedSearch = [
    { id: 1, text: "Купить квартиру", deal_type: "sale", realty_type: "flat" },
    { id: 2, text: "Снять надолго", deal_type: "rent", realty_type: "flat" },
    { id: 3, text: "Купить дом", deal_type: "sale", realty_type: "flat" },
    { id: 4, text: "Купить участок", deal_type: "sale", realty_type: "flat" }
  ];

  // 1. Запрос к Яндексу (выполняется прямо тут)
  const { data: geoData, isFetching: isGeocoding } = useQuery({
    queryKey: ['geocode', debouncedSearchTerm],
    queryFn: () => fetchCoordinates(debouncedSearchTerm),
    enabled: debouncedSearchTerm.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });

    // Если geoData еще нет, передастся undefined, и хук внутри себя автоматически НЕ пойдет в сеть благодаря свойству enabled.
// Передаем два аргумента: адрес Яндекса и сырой ввод
const { data: itemList = [], isFetching: isSearchingDB } = useAds(geoData?.formattedName, debouncedSearchTerm);

  const isSearching = isGeocoding || isSearchingDB;

    const handleSearchChange = (value) => {
  setSearchTerm(value); // Просто обновляем стейт ввода, всё остальное сделает библиотека
};

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <div className='w-full h-[90vh] relative overflow-hidden flex flex-col items-center justify-center px-4'>
          <img 
            src={"src/assets/main-banner-new-brand.jpg"} 
            className="absolute inset-0 w-full h-full object-cover z-0" 
            alt="Главный баннер" 
          />
          
          <div className="w-full max-w-3xl bg-white p-5 rounded-3xl shadow-2xl border border-gray-100 relative z-20 mt-16">
            
            {/* 1. Поисковый контейнер */}
            <div className="flex flex-col gap-2 mb-4 relative">
              <div className="w-full relative flex items-center">
                  {isSearching ? (
    <Loader2 className="absolute left-4 w-5 h-5 text-blue-500 animate-spin" />
  ) : (
    <svg 
      className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" 
      viewBox="0 0 16 16" 
      fill="none" 
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M7.146.646a6.5 6.5 0 1 0 3.835 11.75l2.958 2.958 1.415-1.415-2.959-2.958A6.5 6.5 0 0 0 7.146.646Zm-4.5 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" 
        fill="currentColor"
      />
    </svg>
  )}
  
  <input 
    type="text" 
    placeholder="Введите город или улицу" 
    className="w-full pl-10 pr-14 py-3.5 bg-gray-50 border
    border-gray-200 rounded-2xl text-gray-900
    placeholder-gray-400 focus:outline-none focus:border-blue-500
    transition-colors text-sm"
    value={searchTerm}
    onChange={(e) => handleSearchChange(e.target.value)} 
  />

  <button 
    onClick={() => navigate(`/search?query=${searchTerm}`)}
    className="absolute right-3 bg-blue-600
    hover:bg-blue-700 text-white font-medium p-2
    rounded-xl transition-colors shadow-md text-sm
    flex items-center justify-center"
  >
    <ArrowRight className="w-4 h-4" />
  </button>
              </div>

              {/* Выпадающий список живого поиска */}
              {itemList.length > 0 && (
                <ul className='absolute top-full left-0 right-0
                mt-2 bg-white rounded-xl p-2 w-full
                max-h-60 overflow-y-auto z-50 shadow-xl'>
                  {itemList.map((item) => {
                    // Формируем красивую строку для отображения в списке
                    const roomsText = item.room_count ? `${item.room_count}-комн.` : 'Квартира';
                    const areaText = item.area_total ? `, ${item.area_total} м²` : '';
                    const addressText = item.address ? `, ${item.address}` : ', Адрес не указан';

                    const displayText = `${roomsText}${areaText}${addressText}`;
                    
                    return (
                      <li 
                        key={item.ad_id} 
                         className='mb-1 hover:bg-slate-100
                         rounded-md p-2 block cursor-pointer
                         transition-colors text-sm relative
                         after:absolute after:bottom-0
                         after:left-1/2 after:-translate-x-1/2
                         after:w-1/2 after:h-0.5
                         after:bg-gray-300 after:scale-x-0
                         hover:after:scale-x-100 after:transition-transform
                         after:duration-300 after:origin-center'
                        onClick={() => {
                          const currentAddress = item.address || '';
                                      
                          // Записываем адрес в инпут
                          setSearchTerm(currentAddress); 
                                      
                          // Переходим на страницу поиска
                          navigate(`/search?query=${encodeURIComponent(currentAddress)}`);
                        }}
                      >
                        {displayText}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* 2. Теги быстрого поиска по рекомендациям */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50">
              {RecomendatedSearch.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => navigate(`/search?deal_type=${item.deal_type}&realty_type=${item.realty_type}`)}
                  className="px-4 py-2 bg-blue-50/60 hover:bg-blue-50 text-blue-600 font-medium text-xs sm:text-sm rounded-xl transition-colors whitespace-nowrap active:scale-95"
                >
                  {item.text} 
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default HomePage;
