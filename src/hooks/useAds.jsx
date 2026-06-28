// src/hooks/useAds.js
import { useQuery } from '@tanstack/react-query';

export function useAds(geoName) {
  return useQuery({
    queryKey: ['ads', geoName],
    queryFn: async () => {
      console.log('Запрос к API с адресом:', geoName);
      const response = await fetch(
        `https://student-college-api.minofev.tech/api/ads?address=${encodeURIComponent(geoName)}`
      );

      if (!response.ok) {
        throw new Error('Ошибка при загрузке объявлений с сервера');
      }
      const results = await response.json();
      return results && Array.isArray(results.data) ? results.data : [];
    },
    enabled: Boolean(geoName && geoName.trim().length > 0),
    staleTime: 60 * 1000,
  });
}
