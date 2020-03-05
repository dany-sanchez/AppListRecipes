import shoppingListTypes from '../definitions/types/shoppingList';

const initialState = { ingredients: [] };

function saveShoppingListIngredients(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case shoppingListTypes.SAVE_INGREDIENT_SHOPPINGLIST:
      nextState = {
        ...state,
        ingredients: [...state.ingredients, action.value]
      };
      return nextState || state;
    case shoppingListTypes.UNSAVE_INGREDIENT_SHOPPINGLIST:
      nextState = {
        ...state,
        ingredients: state.ingredients.filter((obj) => obj.id !== action.value.id)
      };
      return nextState || state;
    default:
      return state;
  }
}

export default saveShoppingListIngredients;
