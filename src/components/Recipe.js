import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ActivityIndicator, Image, Text
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getRecipeImagePath } from '../api/spoonacular';
import recipeDetailsFakeData from '../helper/recipeDetailsFakeData';
import assets from '../definitions/assets';
import colors from '../definitions/colors';

const Recipe = () => {
  const [isLoading, setLoadingState] = useState(true);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    try {
      // setRecipeData(await getRecipeDetails(navigation.getParam('recipeID')));
      setRecipeData(recipeDetailsFakeData);
      setLoadingState(false);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error with function loadRecipe');
    }
  };

  const toggleSave = () => {

  };

  const isSaved = () => true;

  const displaySaveRecipe = () => (
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
    if (recipeData.winePairing.pairedWines.length > 0) {
      return (
        <Text style={styles.pairedWines}>{recipeData.winePairing.pairedWines.join(', ')}</Text>
      );
    }

    return null;
  };

  const displayInstructions = () => (
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
  );

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
                {displaySaveRecipe()}
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
            <View style={styles.instructionsContainer}>
              <Text style={styles.subTitleText}>
                Instructions
              </Text>
              <View style={styles.subDetailsContainer}>
                {displayInstructions()}
              </View>
            </View>
            <View style={styles.wineContainer}>
              <Text style={[styles.subTitleText, { fontStyle: 'italic' }]}>
                Un peu de vin monsieur ?
              </Text>
              <View style={styles.subDetailsContainer}>
                {displayWines()}
                <Text style={styles.winePairingText}>{recipeData.winePairing.pairingText}</Text>
              </View>
            </View>
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

Recipe.navigationOptions = {
  title: 'Recette',
};

export default Recipe;

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
