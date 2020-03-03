import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text, Image
} from 'react-native';

import colors from '../definitions/colors';
import assets from '../definitions/assets';
import { getIngredientImagePath } from '../api/spoonacular';

const IngredientItem = ({ ingredient }) => {
  const displayName = () => ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);

  const isSaved = () => true;
  // savedRecipes.findIndex((obj) => obj.id === navigation.getParam('recipeID')) !== -1;

  const displaySavedIngredient = () => (
    isSaved() ? (
      <TouchableOpacity style={styles.actionButtonSaved}>
        <Image
          style={styles.actionButtonSavedIcon}
          source={assets.shoppingCartIcon}
        />
      </TouchableOpacity>
    )
      : (
        <TouchableOpacity style={styles.actionButton}>
          <Image
            style={styles.actionButtonIcon}
            source={assets.shoppingCartIcon}
          />
        </TouchableOpacity>
      )
  );

  return (
    <View
      style={styles.mainContainer}
    >
      <Image
        style={styles.ingredientImage}
        source={{ uri: getIngredientImagePath(ingredient.name) }}
      />
      <View style={styles.infoContainer}>
        <Text
          style={styles.ingredientNameText}
          numberOfLines={1}
        >
          {displayName()}
        </Text>
        <View style={styles.actionButtonContainer}>
          {displaySavedIngredient()}
          <TouchableOpacity style={[styles.actionButton, { marginLeft: 10 }]}>
            <Image
              style={styles.actionButtonIcon}
              source={assets.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IngredientItem;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainOrangeColor,
    flexDirection: 'row',
  },
  ingredientImage: {
    height: 100,
    width: 100,
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
    fontSize: 18,
  },
  actionButtonContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: colors.mainBlackColor,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
  },
  actionButtonIcon: {
    height: 25,
    width: 25,
    tintColor: colors.mainWhiteColor,
  },
  actionButtonSaved: {
    padding: 10,
    justifyContent: 'center',
  },
  actionButtonSavedIcon: {
    height: 25,
    width: 25,
    tintColor: colors.mainOrangeColor,
  }
});
