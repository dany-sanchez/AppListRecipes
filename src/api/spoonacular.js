import { store } from '../store/config';
import settingsTypes from '../store/definitions/types/settings';

const API_KEY = 'd99016218c4242bba3927c475191b2f9';
const API_URL = 'https://api.spoonacular.com';

const fetchUrl = async (url, errorMessage = 'Error when fetching url') => {
  try {
    const response = await fetch(url);
    if (response.headers.map['x-api-quota-used'] !== undefined) {
      const credits = response.headers.map['x-api-quota-used'];
      store.dispatch({
        type: settingsTypes.SET_API_DATA,
        value: {
          credits: (150 - Math.round(credits)),
          lastUpdate: (new Date()).toUTCString()
        }
      });
    }
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
  const url = `${API_URL}/recipes/search?apiKey=${API_KEY}&query=${searchTerm || '%20'}&diet=${diet || ''}&cuisine=${cuisine || ''}&offset=${startOffset || '0'}`;
  const response = await fetchUrl(url, 'Error with function getRecipesOfDietAndCuisineWithSearch');

  return response;
}

export async function getRecipesWithIngredientsFromFridge() {
  const ingredients = store.getState().fridgeState.ingredients.map(
    (ingredient) => ingredient.name
  ).join();
  const url = `${API_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients || ''}`;
  const response = await fetchUrl(url, 'Error with function getRecipesWithIngredientsFromFridge');

  return response;
}

export async function getRecipeDetails(recipeID) {
  const url = `${API_URL}/recipes/${recipeID}/information?apiKey=${API_KEY}`;
  const response = await fetchUrl(url, 'Error with function getRecipeDetails');

  return response;
}

export async function getIngredientsWithAutocompleteSearch(searchTerm) {
  const url = `${API_URL}/food/ingredients/autocomplete?apiKey=${API_KEY}&query=${searchTerm}&metaInformation=true`;
  const response = await fetchUrl(url, 'Error with function getIngredientsWithAutocompleteSearch');

  return response;
}

export function getRecipeImagePath(recipeID, type, dimensions) {
  return `https://spoonacular.com/recipeImages/${recipeID}-${dimensions || '556x370'}.${type || 'jpg'}`;
}

export function getIngredientImagePath(imageName, dimensions) {
  return `https://spoonacular.com/cdn/ingredients_${dimensions || '100x100'}/${imageName}`;
}
