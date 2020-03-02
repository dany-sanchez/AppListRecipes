import { createStore } from 'redux';

import recipesReducer from './reducers/recipesReducer';

export default createStore(recipesReducer);
