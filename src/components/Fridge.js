import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchIngredient from './SearchIngredient';

const Fridge = () => (
  <View style={styles.mainView}>
    <SearchIngredient />
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
