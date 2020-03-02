import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RecipeItem from './RecipeItem';

const ListRecipes = ({
  recipes, onClickNavigation, refreshingState, savedRecipes, refreshRecipes, loadMoreRecipes
}) => {
  const isItSaved = (recipeID) => {
    if (savedRecipes.findIndex((obj) => obj.id === recipeID) !== -1) {
      return true;
    }
    return false;
  };

  return (
    <FlatList
      style={styles.listRecipes}
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      extraData={savedRecipes}
      renderItem={({ item }) => (
        <RecipeItem
          recipe={item}
          onClickOnMe={onClickNavigation}
          isSaved={isItSaved(item.id)}
        />
      )}
      onRefresh={refreshRecipes}
      refreshing={refreshingState}
      onEndReached={loadMoreRecipes}
      onEndReachedThreshold={0.5}
    />
  );
};

const mapStateToProps = (state) => ({
  savedRecipes: state.recipes
});

export default connect(mapStateToProps)(ListRecipes);

const styles = StyleSheet.create({
  listRecipes: {
    flex: 1,
  },
});
