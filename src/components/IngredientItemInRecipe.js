import React from 'react';
import {
  StyleSheet, View, Text, Image
} from 'react-native';

import colors from '../definitions/colors';
import { getIngredientImagePath } from '../api/spoonacular';

const IngredientItemRecipe = ({ ingredient }) =>
// savedRecipes.findIndex((obj) => obj.id === navigation.getParam('recipeID')) !== -1;

  (
    <View
      style={styles.mainContainer}
    >
      <Image
        style={styles.ingredientImage}
        source={{ uri: getIngredientImagePath(ingredient.image) }}
      />
      <View style={styles.infoContainer}>
        <Text
          style={styles.ingredientNameText}
          numberOfLines={1}
        >
          {ingredient.original}
        </Text>
      </View>
    </View>
  );
export default IngredientItemRecipe;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  ingredientImage: {
    height: 50,
    width: 50,
    marginVertical: 20,
  },
  infoContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  ingredientNameText: {
    fontWeight: 'bold',
    fontSize: 12,
    flexWrap: 'wrap',
    textAlign: 'center'
  },
});
