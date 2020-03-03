import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer, persistStore } from 'redux-persist';

import recipesReducer from './reducers/recipesReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, recipesReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
