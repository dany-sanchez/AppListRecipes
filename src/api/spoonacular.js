const API_KEY = 'd99016218c4242bba3927c475191b2f9';

export async function getRecipesOfDietAndCuisineWithSearch(searchTerm, startOffset, diet, cuisine) {
    try {
        const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${searchTerm || '%20'}&diet=${diet}&cuisine=${cuisine}&offset=${startOffset || '0'}`;

        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status)

    } catch (error) {
        console.log('Error with function getRecipesOfDietAndCuisineWithSearch ' + error.message);
        throw error;
    }
}

export async function getRecipeDetails(recipeID) {
    try {
        const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`;

        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status)

    } catch (error) {
        console.log('Error with function getRecipeDetails ' + error.message);
        throw error;
    }
}

export function getRecipeImagePath(recipeID, dimensions, type) {
    return recipeImagePath = `https://spoonacular.com/recipeImages/${recipeID}-${dimensions || '556x370'}.${type || 'jpg'}`;
}