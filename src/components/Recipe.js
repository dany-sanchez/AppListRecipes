import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ActivityIndicator, Image, Text
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getRecipeImagePath, getRecipeDetails } from '../api/spoonacular';
import assets from '../definitions/assets';
import colors from '../definitions/colors';
import recipesTypes from '../store/definitions/types/recipes';

const Recipe = ({ navigation, savedRecipes, dispatch }) => {
  const [isLoading, setLoadingState] = useState(true);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    try {
      setRecipeData(await getRecipeDetails(navigation.getParam('recipeID')));
      setLoadingState(false);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error with function loadRecipe');
    }
  };

  const toggleSave = async () => {
    if (recipeData) {
      const action = { value: recipeData };

      if (isSaved()) {
        action.type = recipesTypes.UNSAVE_RECIPE;
      } else {
        action.type = recipesTypes.SAVE_RECIPE;
      }

      dispatch(action);
    }
  };

  const isSaved = () => savedRecipes.findIndex((obj) => obj.id === navigation.getParam('recipeID')) !== -1;

  const displaySavedRecipe = () => (
    <TouchableOpacity onPress={() => toggleSave()}>
      {isSaved()
        ? <Image source={assets.bookmarkIcon} style={styles.savedIcon} />
        : <Image source={assets.bookmarkIcon} style={styles.unsavedIcon} />}
    </TouchableOpacity>
  );

  const displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return null;
  };

  const displayWines = () => {
    if (recipeData.winePairing && Object.entries(recipeData.winePairing).length > 0) {
      return (
        <View style={styles.wineContainer}>
          <Text style={[styles.subTitleText, { fontStyle: 'italic' }]}>
            Un peu de vin monsieur ?
          </Text>
          <View style={styles.subDetailsContainer}>
            {recipeData.winePairing.pairedWines && recipeData.winePairing.pairedWines.length > 0
              ? <Text style={styles.pairedWines}>{recipeData.winePairing.pairedWines.join(', ')}</Text>
              : null}
            <Text style={styles.winePairingText}>{recipeData.winePairing.pairingText}</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  const displayInstructions = () => {
    if (recipeData.analyzedInstructions
      && Object.entries(recipeData.analyzedInstructions).length > 0) {
      return (
        <View style={styles.instructionsContainer}>
          <Text style={styles.subTitleText}>
            Instructions
          </Text>
          <View style={styles.subDetailsContainer}>
            <View>
              {recipeData.analyzedInstructions[0].steps.map((instruction) => (
                <View style={styles.instructionStep} key={instruction.number}>
                  <Text style={styles.stepNumber}>
                    {instruction.number}
                    .
                  </Text>
                  <Text style={styles.stepContent}>{instruction.step}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    }

    return null;
  };

  const displayIngredients = () => {
    if (recipeData.extendedIngredients
      && Object.entries(recipeData.extendedIngredients).length > 0) {
      return (
        <View style={styles.ingredientsContainer}>
          <Text style={styles.subTitleText}>
            Ingrédients
          </Text>
          <View style={styles.subDetailsContainer}>
            <View style={styles.ingredientsSubContainer}>
              <Text style={styles.ingredientsSubTitle}>Dans mon frigo</Text>
              {/* Afficher la liste d'ingrédients */}
            </View>
            <View style={[styles.ingredientsSubContainer, { borderLeftWidth: 1 }]}>
              <Text style={styles.ingredientsSubTitle}>Manquant</Text>
              {/* Afficher la liste d'ingrédients */}
            </View>
          </View>
        </View>
      );
    }

    return null;
  };

  const displayRecipe = () => {
    if (recipeData) {
      return (
        <ScrollView style={styles.scrollViewRecipe}>
          <Image
            style={styles.recipeImage}
            source={{ uri: getRecipeImagePath(recipeData.id, recipeData.imageType) }}
          />
          <View style={styles.descriptionContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>
                  {recipeData.title}
                </Text>
                {displaySavedRecipe()}
              </View>
              <View style={styles.cuisineDietContainer}>
                <Text style={styles.detailsText}>
                  {recipeData.cuisines.join(', ')}
                  {' '}
                  cuisine(s)
                </Text>
                <Text style={styles.detailsText}>
                  {recipeData.diets.join(', ')}
                  {' '}
                  diet(s)
                </Text>
              </View>
              <Text style={styles.detailsText}>
                Prêt en
                {' '}
                {recipeData.readyInMinutes}
                {' '}
                min, jusqu&apos;à
                {' '}
                {recipeData.servings}
                {' '}
                personnes
              </Text>
            </View>
            {displayIngredients()}
            {displayInstructions()}
            {displayWines()}
          </View>
        </ScrollView>
      );
    }
    return null;
  };

  return (
    <View style={styles.mainView}>
      {displayLoading()}
      {displayRecipe()}
    </View>
  );
};

const mapStateToProps = (state) => ({
  savedRecipes: state.recipes
});

export default connect(mapStateToProps)(Recipe);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewRecipe: {
    flex: 1,
  },
  recipeImage: {
    height: 250,
  },
  descriptionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  savedIcon: {
    height: 30,
    width: 30,
    tintColor: colors.mainOrangeColor,
  },
  unsavedIcon: {
    height: 30,
    width: 30,
    tintColor: colors.mainGreyColor,
  },
  cuisineDietContainer: {
    marginVertical: 10,
  },
  detailsText: {
    fontWeight: 'bold',
  },
  subTitleText: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 20,
  },
  stepNumber: {
    color: colors.mainOrangeColor,
    width: 20,
  },
  pairedWines: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  winePairingText: {
    fontStyle: 'italic',
  }
});
