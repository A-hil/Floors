import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import {  ArrowLeft,
          Heart,
          ChevronRight,
          Scaling,
          SquareSlash,
          ChefHat,
          Footprints,
          Shield
        } from 'lucide-react';

import avatarUrl from '../assets/_avatar_59956695-2-2.jpg';

export default function ViewCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapState = { center: [55.700141, 37.581519], zoom: 15 };

  const images = [
    "https://unsplash.com",
    "https://unsplash.com",
    "https://unsplash.com",
    "https://unsplash.com",
    "https://unsplash.com"
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-12 mt-24 mb-12 font-sans antialiased text-gray-900">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Назад к поиску
      </button>

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Продается 1-комн. квартира, 40,7 м²
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Московская область, Воскресенск, ул. Зелинского, 4 <span className="text-blue-600 cursor-pointer hover:underline ml-2">На карте</span>
        </p>
      </div>

      {/* Основной контейнер сетки */}
      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* ЛЕВАЯ ЧАСТЬ: Фотографии и характеристики (занимает всё свободное место) */}
        <div className="flex-1 w-full lg:max-w-[70%]">
          
          {/* Галерея изображений */}
          <div className="w-full mb-8">
            {/* Главное большое фото */}
            <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden shadow-sm relative">
              <img 
                src={images[activeImageIndex]} 
                alt="Интерьер квартиры" 
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Сетка миниатюр под главным фото */}
            <div className="max-w-md flex grid grid-cols-5 gap-2 mt-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex ? 'border-blue-600 shadow-md scale-[0.98]' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`Миниатюра ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Иконки быстрых параметров */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 mb-8">
            <div className="flex items-center gap-3">
              <Scaling className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Общая площадь</p>
                <p className="text-sm font-semibold">40,7 м²</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SquareSlash className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Жилая площадь</p>
                <p className="text-sm font-semibold">31,2 м²</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ChefHat className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Площадь кухни</p>
                <p className="text-sm font-semibold">6 м²</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Footprints className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Этаж</p>
                <p className="text-sm font-semibold">12 из 16</p>
              </div>
            </div>
          </div>

          {/* Подробные характеристики и информация о доме */}
          <div className="space-y-8 mt-8">
            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                Основные характеристики квартиры
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-sm">
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Тип жилья</dt>
                  <dd className="font-semibold text-gray-900">Вторичное жилье</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Санузел</dt>
                  <dd className="font-semibold text-gray-900">1 совмещенный</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Жилая площадь</dt>
                  <dd className="font-semibold text-gray-900">31,2 м² (комнаты изолированные)</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Балкон / Лоджия</dt>
                  <dd className="font-semibold text-gray-900">1 лоджия</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Площадь кухни</dt>
                  <dd className="font-semibold text-gray-900">6 м²</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Состояние</dt>
                  <dd className="font-semibold text-gray-900">Косметический (типовой) ремонт</dd>
                </div>
              </dl>
            </div>

            {/* Информация о доме */}
            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                Информация о доме
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-sm">
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Год постройки</dt>
                  <dd className="font-semibold text-gray-900">2008 год</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Количество подъездов</dt>
                  <dd className="font-semibold text-gray-900">3</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Материал стен</dt>
                  <dd className="font-semibold text-gray-900">Кирпичный</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Отопление</dt>
                  <dd className="font-semibold text-gray-900">Автономная котельная</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Перекрытия</dt>
                  <dd className="font-semibold text-gray-900">Железобетонные</dd>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100/70 pb-1.5">
                  <dt className="text-gray-500">Состояние дома</dt>
                  <dd className="font-semibold text-gray-900">Не аварийный</dd>
                </div>
              </dl>
            </div>
                      {/* Окно карты Яндекс */}
        
        <h2 className="text-xl font-bold mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                Расположение
              </h2>
        <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-100 shadow-inner relative z-0">
          <YMaps query={{ apikey: '0086099a-fbb4-4cc5-87c3-9dbbc326add4' }}>
            <Map 
              defaultState={mapState} 
              width="100%" 
              height="100%"
              modules={['control.ZoomControl', 'control.FullscreenControl']}
            >
              {/* Метка на карте */}
              <Placemark 
                geometry={[55.700141, 37.581519]} 
                properties={{
                  balloonContentBody: 'Центральный офис Сбербанка',
                }}
                options={{
                  preset: 'islands#emeraldCircleDotIcon', 
                }}
              />
            </Map>
          </YMaps>
        </div>
          </div>
          
        </div>

        <div className="w-full lg:w-[340px] flex flex-col gap-4 lg:sticky lg:top-24 z-10">
          
          {/* Карточка цены */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-3xl font-extrabold tracking-tight text-gray-900">4 000 000 ₽</span>
                <p className="text-xs text-gray-400 mt-1 font-medium">102 275 ₽/м²</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all border border-gray-100">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-blue-600 font-semibold mb-4 cursor-pointer hover:underline">
              Следить за изменением цены
            </p>

            <div className="text-xs space-y-2 text-gray-600 mb-6 border-t border-b border-gray-100 py-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Условия сделки</span>
                <span className="font-semibold text-gray-900">свободная продажа</span>
              </div>
            </div>

            <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm hover:shadow transition-all">
              Показать телефон
            </button>
          </div>

          {/* Эксперт от Циан */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl font-bold text-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div className="max-w-[180px]">
                <h4 className="text-xs font-bold text-gray-900">Крутой или не крутой</h4>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">Помощь с поиском и гарантия безопасной сделки</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          

          {/* Агентство Сбербанк */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
              <img src={avatarUrl} className="w-6 h-6" />

            <div>
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">агентство недвижимости</p>
              <h4 className="text-sm font-bold text-gray-900">Сбербанк</h4>
              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5 font-medium">
                Документы проверены
              </p>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}