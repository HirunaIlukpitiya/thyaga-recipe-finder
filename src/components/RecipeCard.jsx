import FeatherIcon from "feather-icons-react";
import { useFavorites } from "../context";

export default function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(recipe.id);
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    toggleFavorite(recipe.id, recipe.title);
  }
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover hover:opacity-90 hover:scale-105 transition-all duration-300"
        />
        <button onClick={handleFavoriteToggle} className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-md transition-all duration-200">
          {isFav ? (
            <FeatherIcon
              icon="heart"
              className="text-red-500"
              size={18}
              fill="currentColor"
            />
          ) : (
            <FeatherIcon
              icon="heart"
              className="text-gray-500 hover:text-red-500"
              size={18}
            />
          )}
        </button>
      </div>
      <div className="p-4 h-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-semibold mb-2 truncate max-w-full">
            {recipe.title}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary bg-primary bg-opacity-15 px-2 rounded-lg text-sm">
            {recipe.category}
          </span>
          <span className="text-green-500 bg-green-500 bg-opacity-15 px-2 rounded-lg text-sm">
            {recipe.area}
          </span>
        </div>
      </div>
    </div>
  );
}
