import React from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {ArrowRight } from 'lucide-react'; 

function HomePage () {
const navigate = useNavigate();
const RecomendatedSearch = [
    { id: 1, text: "Купить квартиру", action: "buy", type: "flat" },
    { id: 2, text: "Снять надолго", action: "rent", type: "flat" },
    { id: 3, text: "Снять посуточно", action: "daily", type: "flat" },
    { id: 4, text: "Купить дом", action: "buy", type: "house" },
    { id: 5, text: "Купить участок", action: "buy", type: "land" }
  ];
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
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="flex-1 relative flex items-center">
                <svg 
                 className="absolute left-4 w-5 h-5 text-gray-400" 
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
                <input 
                    type="text" 
                    placeholder="Купить квартиру с большой кухней рядом с метро" 
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                <button className="absolute bg-blue-600 hover:bg-blue-700 text-white font-medium px-2 py-1 rounded-2xl transition-colors shadow-md text-sm flex items-center justify-center gap-2 right-4">
                <ArrowRight className="w-4 h-4" />
                </button>
                </div>
                
            </div>

            {/* 2. Теги быстрого поиска по рекомендациям */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50">
                
                {RecomendatedSearch.map((item) => (
                    <button 
                    key={item.id}
                    onClick={() => navigate(`/search?action=${item.action}&type=${item.type}`)}
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
  
