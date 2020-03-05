import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import IngredientItem from './IngredientItem';

const ListIngredients = ({
  ingredients, sortBy, refreshingState, textFilter, actions
}) => {
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  useEffect(() => {
    loadIngredients();
  }, [ingredients, sortBy, textFilter]);

  const loadIngredients = () => {
    let loadedIngredients = filterIngredients(ingredients);
    loadedIngredients = sortIngredients(loadedIngredients);

    setFilteredIngredients(loadedIngredients);
  };

  const sortIngredients = (ingredientsToSort) => ingredientsToSort.sort(
    (a, b) => a[sortBy].localeCompare(b[sortBy])
  );

  const filterIngredients = (ingredientsToFilter) => ingredientsToFilter.filter(
    ({ name }) => textFilter.trim().length === 0
      || name.trim().toLowerCase().includes(textFilter.trim().toLowerCase())
  );

  return (
    <FlatList
      style={styles.listIngredients}
      data={filteredIngredients}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <IngredientItem
          ingredient={item}
          actions={actions}
        />
      )}
      refreshing={refreshingState}
    />
  );
};
export default ListIngredients;

const styles = StyleSheet.create({
  listIngredients: {
    flex: 1,
  },
});
