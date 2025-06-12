import { useEffect, useState } from "react";
import AppContainer from "../components/layout/AppContainer";
import { useFavorites, useLoading } from "../context";
import api from "../utils/api";
import { responseDataToRecipe } from "../utils/utils";
import Pagination from "../utils/components/Pagination";
import RecipeCard from "../components/RecipeCard";
import FeatherIcon from "feather-icons-react";
export default function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { favorites } = useFavorites();
  const { setIsLoading } = useLoading();

  const itemsPerPage = 8;
  const totalPages =
    favorites.length > itemsPerPage
      ? Math.ceil(favorites.length / itemsPerPage)
      : 1 || 1;

  const currentRecipes = favoriteRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [favoriteRecipes]);

  useEffect(() => {
    window.scrollTo({
      top: -10,
      behavior: "smooth",
    });
  }, [currentPage]);

  const fetchFavoriteRecipes = async () => {
    try {
      setIsLoading(true);
      const recipes = await fetchFavorite();
      setFavoriteRecipes(recipes);
    } catch (error) {
      toast.error("Failed to fetch favorite. Please try again later.");
      console.error("Error fetching favorite recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFavorite = async () => {
    const requests = favorites.map((item) =>
      api.get(`/lookup.php?i=${item}`).then((response) => {
        return responseDataToRecipe(response.data);
      })
    );
    return Promise.all(requests);
  };

  useEffect(() => {
    fetchFavoriteRecipes();
  }, [favorites]);
  return (
    <AppContainer className="py-4">
      <div>
        <div className="">
          <button
            onClick={() => window.history.back()}
            className=" p-2 bg-white bg-opacity-90 rounded-full shadow-md z-10 hover:bg-primary hover:bg-opacity-90 transition-colors duration-200 group"
          >
            <FeatherIcon
              icon="arrow-left"
              className="text-primary-light group-hover:text-white"
              size={24}
            />
          </button>
          <h1 className="text-lg font-bold">My Favorite Recipes</h1>
          <p className="text-sm text-gray-600 mb-4">
            {favoriteRecipes.length} saved recipes
          </p>
        </div>
        {favoriteRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
              {currentRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 ">
            <p className="text-gray-500">
              You have no favorite recipes yet. Start adding some!
            </p>
          </div>
        )}
      </div>
    </AppContainer>
  );
}
