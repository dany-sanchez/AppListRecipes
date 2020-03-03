import recipesTypes from '../definitions/types/recipes';

const initialState = { recipes: [] };

function saveRecipes(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case recipesTypes.SAVE_RECIPE:
      nextState = {
        ...state,
        recipes: [...state.recipes, action.value]
      };
      return nextState || state;
    case recipesTypes.UNSAVE_RECIPE:
      nextState = {
        ...state,
        recipes: state.recipes.filter((obj) => obj.id !== action.value.id)
      };
      return nextState || state;
    default:
      return state;
  }
}

export default saveRecipes;
