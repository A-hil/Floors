import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {ArrowLeft, CircleUserRound, SearchX } from 'lucide-react'; 
import {mockOffers} from '../mockOffers';
import { YMaps, Map } from '@pbe/react-yandex-maps';

export default function SearchResultPage() {
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoadDone, setIsFirstLoadDone] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLongTerm, setIsLongTerm] = useState(true);
  const navigate = useNavigate();
  
  const searchQuery = searchParams.get('query') || '';
  const dealType = searchParams.get('deal_type') || '';     // Считает "sale" или "rent"
  const realtyType = searchParams.get('realty_type') || '';

   useEffect(() => {
    // Делаем запрос к MockAPI, передавая параметр поиска, который мы кликнули
    const fetchFilteredresults = async () => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();
        
        if (searchQuery.trim() !== '') params.append('search', searchQuery.trim());
        if (dealType) params.append('deal_type', dealType);
        if (realtyType) params.append('realty_type', realtyType);

        const url = `https://minofev.tech{params.toString()}`;
        console.log("React отправляет запрос по адресу:", url);

        const response = await fetch(url);
        const results = await response.json();

        if (results && Array.isArray(results.data)) {
        setItemList(results.data); 
      } else {
        setItemList([]);
      }

      } catch (error) {
        console.error("Ошибка поиска:", error);
        setItemList([]);
      } finally {
        setIsLoading(false);
        setIsFirstLoadDone(true)
      }
    };

    if (searchQuery.trim() !== '' || dealType || realtyType) {
      fetchFilteredresults();
    }
  }, [searchQuery, dealType, realtyType]);



  // текущий тип сделки
  const action = searchParams.get('action') || 'buy'; 

  // Обработчик событий для динамеческого отображения 
  const handleActionChange = (e) => {
  const newAction = e.target.value; // 'buy' или 'rent'
    setSearchParams({
    // Скопировал с помощью сприд оператора значения что бы вручную не вводить кадждое 
    ...Object.fromEntries(searchParams), 
    action: newAction,
    type: searchParams.get('type') || 'flat', 
    //dayPriceRent: searchParams.get('dayPriceRent') || 'flat',
  });
};

  //Буду применять фильтр для исключительных значений типа "rent" || "buy"
  const filteredOffers = mockOffers.filter(offer => 
    offer.forAction.includes(action)
  );

  return (
<div className="w-full mx-auto px-12 mt-24">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm
        text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Назад
      </button>
    
        <h1>
          {searchQuery}
        </h1>
        
            <div className="flex flex-col md:flex-row
             gap-6 items-start">
              
              {/*Фильтры*/}
            <div className="p-6 rounded-2xl flex flex-col
            gap-5 w-full shrink-0 bg-white shadow-sm
            relative top-0 md:sticky md:top-24 md:w-64 md:z-20">

               {/* МИНИ-КАРТА ЯНДЕКС (Встроена в самый верх фильтров) */}
              <div className=" h-80 w-full md:h-32 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <YMaps>
                  <Map 
                    defaultState={{ 
                      center: [55.751574, 37.573856], // Координаты центра (например, Москва)
                      zoom: 10,                       // Масштаб карты
                      controls: []                    // Убираем лишние кнопки, чтобы карта оставалась миниатюрной
                    }} 
                    width="100%" 
                    height="100%" 
                  />
                </YMaps>
              </div>

              <div className="flex items-center justify-between
              border-b border-gray-50 pb-3">
                <h3 className="font-bold text-gray-900 
                text-base">Фильтры</h3>
                <button 
                  onClick={() => navigate('/search?action=buy&type=flat')}
                  className="text-xs font-semibold
                  text-gray-400 hover:text-blue-600
                  transition-colors"
                >
                  Сбросить
                </button>
              </div>
            {/*Тип */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <select className="w-full min-w-0 mt-1 px-2 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-gray-600 font-medium truncate">
                <option>Квартиры</option>
                <option>Комнаты</option>
                <option>Дома, Дачи...</option>
                <option>Коммерческая</option>
              </select>
              <select 
              value={action}
              onChange={handleActionChange}
              className="w-full min-w-0 mt-1 px-2 py-2
              bg-white border border-gray-200 rounded-xl
              text-xs focus:outline-none focus:border-blue-500
              text-gray-600 font-medium truncate">
                <option value="buy">Купить</option>
                <option value="rent">Снять</option>
              </select>
            </div>
            {/* Срок аренды */}
            {action === 'rent' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700">Срок аренды</label>
              <div className="grid grid-cols-2 gap-1 bg-gray-100 p-0.5 rounded-xl text-center">
                
                <button 
                  type="button"
                  onChange={handleActionChange}
                  onClick={() => setIsLongTerm(true)}
                  className={`py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    isLongTerm 
                      ? 'bg-white border border-gray-900 shadow-sm text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  На длит. срок
                </button>

                <button 
                  type="button"
                  onClick={() => setIsLongTerm(false)}
                  className={`py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    !isLongTerm 
                      ? 'bg-white border border-gray-900 shadow-sm text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Посуточно
                </button>

              </div>
            </div>
          )}


            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700">Где искать</label>
              <input type="text" placeholder="Все регионы, адрес" className="w-full px-3 py-2 bg-gray-100 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400" />
            </div>

            {/* 4. Количество комнат (Обновлено на чекбоксы из макета) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700">Количество комнат</label>
              <div className="flex flex-col gap-1.5 mt-1">
                {['Студия', '1 комната', '2 комнаты', '3 комнаты', '4 комнаты', '5 и больше', 'Своб. планировка'].map((room) => (
                  <label key={room} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-gray-700">{room}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Стоимость или Арендная плата */}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Цена, {action === 'buy' ? '₽' : '₽ / мес.'}
              </label>
              <div className="flex items-center gap-2">
                <input type="number" 
                placeholder="от"
                value={action}
                onChange={(e) => setSearchParams({ 
                  ...Object.fromEntries(searchParams), 
                  priceFrom: e.target.value 
                })} 
                className="w-full px-3 py-2 bg-gray-50
                border border-gray-200 rounded-xl text-xs
                focus:outline-none focus:border-blue-500
                transition-colors" />
                <input type="number"
                placeholder="до"
                value={action}
                onChange={(e) => setSearchParams({ 
                  ...Object.fromEntries(searchParams), 
                  priceTo: e.target.value 
                })}
                className="w-full px-3 py-2 bg-gray-50
                border border-gray-200 rounded-xl text-xs
                focus:outline-none focus:border-blue-500
                transition-colors" />
              </div>
            </div>

            {action === 'buy' && (
              <div className="flex flex-col gap-2 bg-blue-50/50 p-3 rounded-xl border border-blue-50/80">
                <label className="text-xs font-bold text-blue-600 uppercase tracking-wider">Ипотечные условия</label>
                <select className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-gray-600 font-medium">
                  <option>Любая ипотека</option>
                  <option>Семейная ипотека</option>
                  <option>IT-ипотека</option>
                  <option>Господдержка</option>
                </select>
              </div>
            )}

            {action === 'rent' && (
              <div className="flex flex-col gap-2 bg-emerald-50/40 p-3 rounded-xl border border-emerald-50/80">
                <label className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Условия аренды</label>
                <div className="flex flex-col gap-2 mt-1">
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500" />
                    Без залога
                  </label>
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500" />
                    Без комиссии агенту
                  </label>
                </div>
              </div>
            )}        
          </div>

            {/*Блок с сеткой карточек*/}
            {/* 1. ЕСЛИ ИДЕТ ЗАГРУЗКА — ПОКАЗЫВАЕМ ЛОАДЕР */}
            {isLoading ? (
              <div className="flex flex-col
              items-center justify-center
              py-20 gap-3 w-full h-screen">
                {/* Простой крутящийся спиннер на Tailwind CSS */}
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm font-medium">Ищем подходящие объявления...</p>
              </div>
            ) : (
              /* 2. ЕСЛИ ЗАГРУЗКА ЗАВЕРШЕНА, ПРОВЕРЯЕМ НАЛИЧИЕ ЭЛЕМЕНТОВ */
              <>
              {itemList.length > 0 ? (
            <div className='flex-1 flex flex-col gap-4'>
              {itemList?.map(offer => {
                const photos = offer.photo_storage || [];
                const mainPhoto = photos[0]?.url;
                const remainingPhotosCount = photos.length > 5 ? photos.length - 4 : 0;

                return (
                  <Link
                    key={offer.ad_id} // 2. Заменили offer.id на offer.ad_id
                    to={`/property/${offer.ad_id}`} // 3. Упростили динамический URL
                    className="block hover:shadow-lg transition-shadow rounded-2xl bg-white overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      
                      {/* Блок для изображения */}
                      <div className="relative h-48 md:h-full min-h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                        {/* Главная картинка объекта */}
                        {mainPhoto ? (
                          <img 
                            src={mainPhoto} 
                            alt="Объект недвижимости" 
                            className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-r-none"
                          />
                        ) : (
                          <span>Нет фото</span>
                        )}

                        {/* Побочные фото-карточки снизу (выводим до 4-х штук из photo_storage) */}
                        {photos.length > 0 && (
                          <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-center z-10">
                            {photos.slice(0, 4).map((photo, index) => (
                              <div 
                                key={photo.id || index} 
                                className="w-12 h-12 md:w-7 md:h-7 bg-gray-300 rounded-lg border-2 border-white shrink-0 cursor-pointer overflow-hidden shadow-md hover:opacity-90 hover:border-blue-500 transition-all"
                              >
                                <img src={photo.url} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                            
                            {/* Последняя карточка с общим счетчиком фотографий */}
                            {photos.length > 4 && (
                              <div className="relative w-12 h-12 md:w-7 md:h-7 bg-gray-300 rounded-lg border-2 border-white shrink-0 cursor-pointer overflow-hidden shadow-md hover:opacity-90 hover:border-blue-500 transition-all">
                                <img src={photos[4]?.url} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-[10px] md:text-[8px]">
                                  +{remainingPhotosCount}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Блок с текстовой информацией */}
                      <div className="p-4 flex flex-col justify-center text-left">
                        <div className="text-2xl font-semibold text-gray-900">
                          {/* 4. Заменили offer.rooms -> room_count; offer.area -> area_total */}
                          {offer.room_count}-комн. квартира, {offer.area_total} м², {offer.floor} эт.
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          {offer.address || 'Адрес не указан'}
                        </div>
                        <div className="text-xl font-semibold text-gray-900 mt-2">
                          {/* 5. На бэкенде цена лежит в offer.price. Форматируем её красиво */}
                          {Number(offer.price).toLocaleString()} ₽
                          
                          {/* 6. Поле deal_type подскажет, продажа это (sale) или аренда (rent) */}
                          {offer.deal_type === 'rent' && <span className="text-sm font-normal text-gray-500"> / мес.</span>}

                          {/* Блок условий, если это аренда */}
                          {offer.deal_type === 'rent' && (
                            <div className="text-xs text-gray-400 font-normal mt-1">
                              Залог: {offer.deposit ? `${Number(offer.deposit).toLocaleString()} ₽` : 'нет'}
                            </div>
                          )}
                        </div>

                        {/* Выводим живое описание из API вместо Lorem Ipsum */}
                        <div className="text-sm text-gray-500 mt-2 line-clamp-3">
                          {offer.description || 'Описание объекта отсутствует.'}
                        </div>
                      </div>

                      {/* Блок автора (на бэкенде Александра данные автора лежат прямо в объекте) */}
                      <div className="p-4 flex flex-col justify-center text-left border-t md:border-t-0 md:border-l border-gray-50">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden">
                          {offer.user?.avatar ? (
                            <img src={offer.user.avatar} alt="Аватар" className="w-full h-full object-cover" />
                          ) : (
                            <CircleUserRound className="w-8 h-8 text-gray-600" />
                          )}
                        </div>
                        <div className="text-sm font-medium text-gray-700 mt-2">
                          {offer.user?.name || 'Менеджер'}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {offer.user?.role === 'agent' ? 'Агентство' : 'Собственник'}
                        </div>
                        <span className="mt-4 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                          Посмотреть все объекты
                        </span>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>
            ) : (
            isFirstLoadDone && (
              <div className="flex flex-col items-center
              justify-center py-20 text-center p-8 w-full h-screen">
                <SearchX className="w-16 h-16 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600">Ничего не найдено</h3>
                <p className="text-gray-400 text-sm max-w-xs mt-1">
                  Попробуйте изменить запрос или скорректировать фильтры поиска
                </p>
              </div>
            )
          )}
        </>
      )}
    </div>
</div>
)
}