import { useEffect, useState } from "react";
import RecipeDetail from "../components/RecipeDetails";
import { useLocation } from "react-router-dom";
import { responseDataToRecipe } from "../utils/utils";
import { useLoading } from "../context";
import api from "../utils/api";

export default function RecipePage() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const { setIsLoading } = useLoading();
  const location = useLocation();
  const recipeId = location.pathname.split("/").pop();

  const fetchRecipeDetails = (id) => {
    setIsLoading(true);
    api
      .get(`/lookup.php?i=${id}`)
      .then((response) => {
        console.log("Recipe details fetched successfully:", response.data);
        if (response.data) {
          setRecipeDetails(responseDataToRecipe(response.data));
        } else {
          console.error("No recipe found for the given ID.");
        }
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      }).finally(() => {
        setIsLoading(false);
      }
      );
  };

  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetails(recipeId);
    } else {
      console.error("Recipe ID is not available in the URL.");
    }
  }, [recipeId]);
  console.log("Recipe ID:", recipeId);
  console.log("Recipe Details:", recipeDetails);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <RecipeDetail recipe={recipeDetails} />
    </div>
  );
}
