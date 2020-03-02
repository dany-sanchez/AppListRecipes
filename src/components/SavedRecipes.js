import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ListRecipes from './ListRecipes';
import DisplayError from './DisplayError';

const SavedRecipes = ({ savedRecipes, navigation }) => {
  const navigateToRecipeDetails = (recipeID) => {
    navigation.navigate('Recipe', { recipeID });
  };

  return (
    <View style={styles.mainView}>
      { savedRecipes.length > 0 ? (
        <ListRecipes
          recipes={savedRecipes}
          refreshingState={false}
          onClickNavigation={navigateToRecipeDetails}
          refreshRecipes={null}
          loadMoreRecipes={null}
        />
      ) : (
        <DisplayError errorMessage="Aucune recette sauvegardée" />
      )}
    </View>
  );
};

SavedRecipes.navigationOptions = {
  title: 'Mes recettes',
};

const mapStateToProps = (state) => ({
  savedRecipes: state.recipes
});

export default connect(mapStateToProps)(SavedRecipes);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
