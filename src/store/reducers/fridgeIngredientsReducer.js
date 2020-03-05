import fridgeTypes from '../definitions/types/fridge';

const initialState = { ingredients: [] };

function saveFridgeIngredients(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case fridgeTypes.SAVE_INGREDIENT_FRIDGE:
      nextState = {
        ...state,
        ingredients: [...state.ingredients, action.value]
      };
      return nextState || state;
    case fridgeTypes.UNSAVE_INGREDIENT_FRIDGE:
      nextState = {
        ...state,
        ingredients: state.ingredients.filter((obj) => obj.id !== action.value.id)
      };
      return nextState || state;
    case fridgeTypes.RESET:
      nextState = {
        ingredients: []
      };
      return nextState || state;

    default:
      return state;
  }
}

export default saveFridgeIngredients;
