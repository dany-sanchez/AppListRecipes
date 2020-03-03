import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchIngredient from './SearchIngredient';

const ShoppingList = () => (
  <View style={styles.mainView}>
    <SearchIngredient />
  </View>
);

ShoppingList.navigationOptions = {
  title: 'Ma liste',
};

export default ShoppingList;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
