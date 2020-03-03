import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchIngredient from './SearchIngredient';

import ListIngredients from './ListIngredients';
import DisplayError from './DisplayError';
import savedIngredients from '../helper/ingredientsFakeData';

const Fridge = () => (
  <View style={styles.mainView}>
    <SearchIngredient />
    { savedIngredients.length > 0 ? (
      <ListIngredients
        ingredients={savedIngredients}
      />
    ) : (
      <DisplayError errorMessage="Aucun ingrédient sauvegardé" />
    )}
  </View>
);


Fridge.navigationOptions = {
  title: 'Mon frigo',
};

export default Fridge;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
