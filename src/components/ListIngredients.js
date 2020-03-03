import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import IngredientItem from './IngredientItem';

const ListIngredients = ({
  ingredients,
}) => (
  <FlatList
    style={styles.listIngredients}
    data={ingredients}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <IngredientItem
        ingredient={item}
      />
    )}
  />
);
export default ListIngredients;

const styles = StyleSheet.create({
  listIngredients: {
    flex: 1,
  },
});
