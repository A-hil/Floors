// src/hooks/useAds.js
import { useQuery } from '@tanstack/react-query';

export function useAds(geoName) {
  return useQuery({
    queryKey: ['ads', geoName],

    // 2. Сама функция запроса к вашей базе данных
    queryFn: async () => {
      const response = await fetch(
        `https://student-college-api.minofev.tech/api/ads?address=${encodeURIComponent(geoName)}`
      );

      if (!response.ok) {
        throw new Error('Ошибка при загрузке объявлений с сервера');
      }


      const results = await response.json();

      // Гарантируем возврат массива данных, чтобы не ломать метод .map() в UI
      return results && Array.isArray(results.data) ? results.data : [];
    },

    // 3. САМОЕ ВАЖНОЕ: хук заблокирован (enabled: false), пока Яндекс не вернет нам строку адреса.
    // Это предотвращает отправку пустых или некорректных запросов к БД при загрузке страницы.
    enabled: Boolean(geoName && geoName.trim().length > 0),

    // 4. Время жизни кэша (1 минута), чтобы не дергать ваш сервер слишком часто
    staleTime: 60 * 1000,
  });
}
