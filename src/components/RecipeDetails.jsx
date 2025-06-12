import AppContainer from "./layout/AppContainer";
import { useFavorites } from "../context/FavoritesContext";
import FeatherIcon from "feather-icons-react";
import { useEffect } from "react";

export default function RecipeDetail({ recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isRecipeFavorited = recipe?.id && isFavorite(recipe.id);

  const handleFavoriteToggle = () => {
    if (recipe?.id) {
      toggleFavorite(recipe.id, recipe.title);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

return (
    <div className="relative pb-6">
        <div className="w-full h-64 md:h-80 lg:h-96 relative overflow-hidden">
            <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
            
            <button 
                onClick={() => window.history.back()}
                className="absolute top-4 left-4 p-2 bg-white bg-opacity-90 rounded-full shadow-md z-10 hover:bg-primary hover:bg-opacity-90 transition-colors duration-200 group"
            >
                <FeatherIcon icon="arrow-left" className="text-primary-light group-hover:text-white" size={24} />
            </button>

            <div className="absolute top-4 right-4 flex gap-2">
                {recipe.videoURL && (
                    <a 
                        href={recipe.videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white bg-opacity-90 rounded-full shadow-md z-10 hover:bg-primary hover:bg-opacity-90 transition-colors duration-200 group"
                    >
                        <FeatherIcon icon="play-circle" className="text-primary-light group-hover:text-white" size={24} />
                    </a>
                )}
                <button 
                    onClick={handleFavoriteToggle}
                    className="p-2 bg-white bg-opacity-90 rounded-full shadow-md z-10"
                >
                    {isRecipeFavorited ? (
                        <FeatherIcon icon="heart" className="text-red-500" size={24} fill="currentColor" />
                    ) : (
                        <FeatherIcon icon="heart" className="text-gray-500" size={24} />
                    )}
                </button>
            </div>
        </div>
        
        <div className="relative -mt-10 bg-white min-h-screen rounded-t-3xl shadow-md px-4 md:px-8 pt-8 pb-16">
            <AppContainer>
                <div className="max-w-4xl mx-auto mb-5">
                    <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {recipe.category && (
                            <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm">
                                {recipe.category}
                            </span>
                        )}
                        {recipe.area && (
                            <span className="px-3 py-1 bg-green-500 bg-opacity-10 text-green-600 rounded-full text-sm">
                                {recipe.area}
                            </span>
                        )}
                        {recipe.source && (
                            <a 
                                href={recipe.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-blue-500 bg-opacity-10 text-blue-600 rounded-full text-sm hover:bg-blue-500 hover:text-white transition-colors duration-200"
                            >
                                View Source
                            </a>
                        )}
                    </div>

                    {recipe.description && (
                        <p className="text-gray-700 mb-8">{recipe.description}</p>
                    )}
                    
                    <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                    {recipe.ingredients && recipe.ingredients.length > 0 ? (
                        <ul className="list-disc pl-5 mb-8">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="text-gray-700 mb-1">
                                    <span className="font-medium">{ingredient.name}</span>
                                    {ingredient.measure && ` - ${ingredient.measure}`}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 mb-8">No ingredients information available</p>
                    )}
                    
                    <h2 className="text-xl font-semibold mb-3">Instructions</h2>
                    {recipe.instructions ? (
                        <div className="text-gray-700">
                            {recipe.instructions.split('\n').filter(step => step.trim()).map((step, index) => (
                                <div key={index} className="flex items-start gap-3 mb-3">
                                    <p>{step.trim()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No instructions available</p>
                    )}
                </div>
            </AppContainer>
        </div>
    </div>
);
}