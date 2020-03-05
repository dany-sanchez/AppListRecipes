import settingsTypes from '../definitions/types/settings';

const initialState = {
  apiData: {
    credits: null,
    lastUpdate: `${(new Date()).toLocaleDateString('fr-FR',
      { year: 'numeric', month: 'long', day: 'numeric' })} à ${new Date().toLocaleTimeString('fr-FR',
      { hour: '2-digit', minute: '2-digit' })}`
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
          lastUpdate: `${(new Date()).toLocaleDateString('fr-FR',
            { year: 'numeric', month: 'long', day: 'numeric' })} à ${new Date().toLocaleTimeString('fr-FR',
            { hour: '2-digit', minute: '2-digit' })}`
        }
      };
      return nextState || state;
    default:
      return state;
  }
}

export default settings;
