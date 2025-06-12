import FeatherIcon from "feather-icons-react";
import AppContainer from "../components/layout/AppContainer";
import { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import { useLoading, useSearch } from "../context";
import { toast } from "react-toastify";
import { responseDataToRecipe } from "../utils/utils";
import RecipeCard from "../components/RecipeCard";
import { useLocation, useNavigate } from "react-router-dom";
import SearchField from "../components/SearchField";

export default function HomePage() {
  const [inputData, setInputData] = useState({
    searchType: "recipe",
    searchKey: "",
  });
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const { setIsLoading } = useLoading();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchTrendingRecipes();
    fetchCategory();
  }, [location]);

  const fetchTrendingRecipes = async () => {
    try {
      setIsLoading(true);
      const recipes = await fetchTrending();
      setTrendingRecipes(recipes);
    } catch (error) {
      toast.error("Failed to fetch trending recipes. Please try again later.");
      console.error("Error fetching trending recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Trending Recipes:", trendingRecipes);

  const fetchTrending = async () => {
    const requests = Array(4)
      .fill()
      .map(() =>
        api.get("/random.php").then((response) => {
          return responseDataToRecipe(response.data);
        })
      );
    return Promise.all(requests);
  };

  const fetchCategory = () => {
    setIsLoading(true);
    api
      .get("/categories.php")
      .then((response) => {
        const categories = response.data.categories.map((category) => ({
          id: category.idCategory,
          name: category.strCategory,
          image: category.strCategoryThumb,
          discription: category.strCategoryDescription,
        }));
        setCategories(categories);
      })
      .catch((error) => {
        toast.error("Failed to fetch categories. Please try again later.");
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-l from-primary-dark to-primary-light w-full">
        <AppContainer className={"w-full h-full py-20 lg:py-28"}>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl md:text-3xl lg:text-7xl font-bold text-center text-white lg:pb-4">
              Discover Amazing Recipes
            </h1>
            <p className="text-xs lg:text-lg text-white text-center mb-8">
              Find your next favorite dish from thousands of recipes
            </p>
            <div className="flex flex-col gap-2 rounded-lg  bg-white bg-opacity-60 p-4 shadow-lg">
              <SearchField
                showSeperateButton={true}
                data={inputData}
                searchTrigger={searchTrigger}
                handleChange={handleInputChange}
              />
              <div className="flex gap-4 items-center justify-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="recipe"
                    name="searchType"
                    value="recipe"
                    defaultChecked
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <label
                    htmlFor="recipe"
                    className="ml-2 mr-4 text-sm text-gray-600"
                  >
                    Recipe Name
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ingredient"
                    name="searchType"
                    value="ingredient"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                  <label
                    htmlFor="ingredient"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Ingredient
                  </label>
                </div>
              </div>
            </div>
          </div>
        </AppContainer>
      </div>

      <AppContainer className="">
        <div className="">
          <div className="flex flex-col items-center justify-center pb-7 pt-5">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center lg:pb-4">
              Trending Recipes
            </h1>
            <p className="text-xs lg:text-lg text-center">
              Popular dishes everyone is cooking
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
            {trendingRecipes.map((recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            })}
          </div>
        </div>

        <div className="">
          <div className="flex flex-col items-center justify-center pb-7 pt-5">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center lg:pb-4">
              Browse by Category
            </h1>
            <p className="text-xs lg:text-lg text-center">
              Explore recipes by your favorite cuisine
            </p>
            <div className="flex items-center gap-1 mt-2">
              <FeatherIcon
                icon="chevron-left"
                size={16}
                className="text-gray-400"
              />
              <span className="text-sm text-gray-500">Scroll to see more</span>
              <FeatherIcon
                icon="chevron-right"
                size={16}
                className="text-gray-400"
              />
            </div>
          </div>
          <div className="">
            <div
              className="grid grid-flow-col gap-4 pb-8 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="h-24 w-24 md:h-32 md:w-32 flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => {
                    setSearchTrigger(true);
                    setInputData({
                      searchType: "category",
                      searchKey: category.name,
                    });
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover rounded-t-lg mb-4"
                  />
                  <h2 className="text-sm font-semibold mb-2">
                    {category.name}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex flex-col items-center justify-center pb-7 pt-5">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center lg:pb-4">
              Why Choose RecipeFinder?
            </h1>
            <p className="text-xs lg:text-lg text-center">
              Everything you need to discover and cook amazing meals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8">
            <div className="bg-white md:flex md:flex-col md:items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FeatherIcon icon="search" size={32} className="text-primary" />
              <h3 className="text-lg font-semibold mt-4">Extensive Database</h3>
              <p className="text-sm text-gray-600 mt-2 md:text-center">
                Access thousands of recipes from around the world.
              </p>
            </div>
            <div className="bg-white md:flex md:flex-col md:items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FeatherIcon icon="heart" size={32} className="text-primary" />
              <h3 className="text-lg font-semibold mt-4">Favorites</h3>
              <p className="text-sm text-gray-600 mt-2 md:text-center">
                Save your favorite recipes for easy access.
              </p>
            </div>
            <div className="bg-white md:flex md:flex-col md:items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FeatherIcon
                icon="smartphone"
                size={32}
                className="text-primary"
              />
              <h3 className="text-lg font-semibold mt-4">Mobile Friendly</h3>
              <p className="text-sm text-gray-600 mt-2 md:text-center">
                Enjoy a seamless experience on any device.
              </p>
            </div>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}
