import { createStore, combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer, persistStore } from 'redux-persist';

import recipesReducer from './reducers/recipesReducer';
import fridgeIngredientsReducer from './reducers/fridgeIngredientsReducer';
import shoppingListIngredientsReducer from './reducers/shoppingListIngredientsReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const reducers = combineReducers({
  recipeState: recipesReducer,
  fridgeState: fridgeIngredientsReducer,
  shoppingListState: shoppingListIngredientsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
