import { useAds } from '../hooks/useAds';
import { useFavorites } from '../hooks/useFavorites';
import { AdCard } from './AdCard';

export function FavoritesList({ geoName }) {
  const { data: ads = [], isLoading } = useAds(geoName);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Фильтруем объявления из бэка: оставляем только те, чей ID есть в localStorage
  const favoriteAds = ads.filter((ad) => favorites.includes(ad.id));

  if (isLoading) return <div>Загрузка...</div>;
  if (favoriteAds.length === 0) return <div>Список избранного пуст</div>;

  return (
    <div className="favorites-grid">
      {favoriteAds.map((ad) => (
        <AdCard 
          key={ad.id} 
          ad={ad} 
          isLiked={true} 
          onLike={() => toggleFavorite(ad.id)} 
        />
      ))}
    </div>
  );
}