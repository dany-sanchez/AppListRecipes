const API_KEY = 'd99016218c4242bba3927c475191b2f9';

const fetchUrl = async (url, errorMessage = 'Error when fetching url') => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`${errorMessage} ${error.message}`);
    throw error;
  }
};

export async function getRecipesOfDietAndCuisineWithSearch(searchTerm, startOffset, diet, cuisine) {
  const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${searchTerm || '%20'}&diet=${diet || ''}&cuisine=${cuisine || ''}&offset=${startOffset || '0'}`;
  const response = await fetchUrl(url, 'Error with function getRecipesOfDietAndCuisineWithSearch');

  return response;
}

export async function getRecipesWithIngredientsFromFridge() {
  // TODO: ajouter la recherche des ingrédients depuis le frigo
  const ingredients = '';
  const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients || ''}`;
  const response = await fetchUrl(url, 'Error with function getRecipesWithIngredientsFromFridge');

  return response;
}

export async function getRecipeDetails(recipeID) {
  const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`;
  const response = await fetchUrl(url, 'Error with function getRecipeDetails');

  return response;
}

export function getRecipeImagePath(recipeID, type, dimensions) {
  return `https://spoonacular.com/recipeImages/${recipeID}-${dimensions || '556x370'}.${type || 'jpg'}`;
}

export function getIngredientImagePath(ingredientName, type, dimensions) {
  return `https://spoonacular.com/cdn/ingredients_${dimensions || '100x100'}/${ingredientName}.${type || 'jpg'}`;
}
