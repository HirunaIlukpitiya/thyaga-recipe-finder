export function responseDataToRecipe(responseData) {

    if (!responseData || !responseData.meals) {
        return null;
    }

    if (Array.isArray(responseData.meals) && responseData.meals.length > 1) {
        return responseData.meals.map(meal => {
            if (!meal) return null;

            return {
                id: meal.idMeal,
                title: meal.strMeal,
                image: meal.strMealThumb,
                category: meal.strCategory,
                area: meal.strArea || "Unknown",
                instructions: meal.strInstructions,
                tags: meal.strTags ? meal.strTags.split(",").map(tag => tag.trim()) : [],
                videoURL: meal.strYoutube,
                source: meal.strSource,
                ingredients: Array.from({ length: 20 }, (_, i) => ({
                    name: meal[`strIngredient${i + 1}`],
                    measure: meal[`strMeasure${i + 1}`],
                })).filter(ing => ing.name && ing.name.trim() !== ""),
            };
        }).filter(Boolean);

    } else {
        const meal = responseData.meals[0];
        if (!meal) return null;

        return {
            id: meal.idMeal,
            title: meal.strMeal,
            image: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea || "Unknown",
            instructions: meal.strInstructions,
            tags: meal.strTags ? meal.strTags.split(",").map(tag => tag.trim()) : [],
            videoURL: meal.strYoutube,
            source: meal.strSource,
            ingredients: Array.from({ length: 20 }, (_, i) => ({
                name: meal[`strIngredient${i + 1}`],
                measure: meal[`strMeasure${i + 1}`],
            })).filter(ing => ing.name && ing.name.trim() !== ""),
        };
    }
}