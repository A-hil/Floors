// src/api/geocode.js
export const fetchCoordinates = async (address) => {
  if (!address || !address.trim()) return null;
  
  const apiKey = `9c8b8d2a-840a-49d4-a982-f46579877864`;
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(address)}&format=json`;

  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Ошибка сети при геокодировании');
  const data = await response.json();
  // Безопасно извлекаем объект
  const geoObject = data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;
  if (!geoObject) return null;

  // Возвращаем только то, что реально используется в HomePage.jsx и хуке useAds
  return {
    coordinates: geoObject.Point?.pos, // Строка "долгота широта"
    formattedName: geoObject.metaDataProperty?.GeocoderMetaData?.text // Текст адреса
  };
};
