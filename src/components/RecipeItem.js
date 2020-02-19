import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text, Image
} from 'react-native';

import colors from '../definitions/colors';
import assets from '../definitions/assets';
import { getRecipeImagePath } from '../api/spoonacular';

const RecipeItem = ({ recipe, onClickOnMe, isSaved }) => {
  const displaySaved = () => {
    if (isSaved) {
      return (
        <Image
          style={styles.recipeDataIcons}
          source={assets.bookmarkIcon}
        />
      );
    }

    return (
      <View />
    );
  };

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => onClickOnMe(recipe.id)}
    >
      <Image
        style={styles.recipeImage}
        source={{ uri: getRecipeImagePath(recipe.id) }}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text
            style={styles.recipeNameText}
            numberOfLines={1}
          >
            {recipe.title}
          </Text>
        </View>
        {displaySaved()}
      </View>
    </TouchableOpacity>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainOrangeColor,
  },
  recipeImage: {
    height: 120,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
  },
  recipeNameText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  recipeDataIcons: {
    height: 25,
    width: 25,
    tintColor: colors.mainOrangeColor,
    alignSelf: 'center',
    marginHorizontal: 10,
  }
});
