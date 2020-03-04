import { createStore, combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer, persistStore } from 'redux-persist';

import recipesReducer from './reducers/recipesReducer';
import settingsReducer from './reducers/settingsReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const reducer = combineReducers({
  "recipes" : recipesReducer,
  "settings" : settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
