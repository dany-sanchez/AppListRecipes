import settingsTypes from '../definitions/types/settings';

const initialState = {
  apiData: {
    credits: null,
    lastUpdate: (new Date()).toUTCString()
  },
  addIngredientToShoppingList: false,
  removeIngredientFromShoppingList: false
};

function settings(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case settingsTypes.SET_API_DATA:
      nextState = {
        ...state,
        apiData: action.value
      };
      return nextState || state;
    case settingsTypes.ADD_INGREDIENT_TO_SHOPPING_LIST:
      nextState = {
        ...state,
        addIngredientToShoppingList: action.value
      };
      return nextState || state;
    case settingsTypes.REMOVE_INGREDIENT_FROM_SHOPPING_LIST:
      nextState = {
        ...state,
        removeIngredientFromShoppingList: action.value
      };
      return nextState || state;
    case settingsTypes.RESET:
      nextState = {
        apiData: {
          credits: null,
          lastUpdate: (new Date()).toUTCString()
        }
      };
      return nextState || state;
    default:
      return state;
  }
}

export default settings;
