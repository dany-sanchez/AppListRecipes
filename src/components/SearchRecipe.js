import React, { useState, useRef } from 'react';
import {
  View, TextInput, StyleSheet, Image, Text, Keyboard
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../definitions/colors';
import assets from '../definitions/assets';
import ListRecipes from './ListRecipes';
import { getRecipesOfDietAndCuisineWithSearch } from '../api/spoonacular';
import DisplayError from './DisplayError';

const SearchRecipe = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [isRefreshing, setRefreshingState] = useState(false);
  const [isErrorDuringDataLoading, setErrorDataLoading] = useState(false);
  const searchTerm = useRef('');
  const paginationData = useRef({ currentOffset: 0, maxResults: 0 });

  const inputSearchTermChanged = (text) => {
    searchTerm.current = text;
  };

  const loadRecipes = async (prevRecipes) => {
    setRefreshingState(true);
    setErrorDataLoading(false);
    try {
      const spoonacularSearchResult = await getRecipesOfDietAndCuisineWithSearch(
        searchTerm.current,
        paginationData.current.currentOffset
      );
      paginationData.current = {
        currentOffset: paginationData.current.currentOffset + spoonacularSearchResult.number,
        maxResults: spoonacularSearchResult.totalResults
      };
      setRecipes([...prevRecipes, ...spoonacularSearchResult.results]);
    } catch {
      paginationData.current = { currentOffset: 0, maxResults: 0 };
      setRecipes([]);
      setErrorDataLoading(true);
    } finally {
      setRefreshingState(false);
    }
  };

  const searchRecipes = () => {
    paginationData.current = { currentOffset: 0, maxResults: 0 };
    loadRecipes([]);
  };

  const loadMoreRecipes = () => {
    if (paginationData.current.currentOffset < paginationData.current.maxResults) {
      loadRecipes(recipes);
    }
  };

  const navigateToRecipeDetails = (recipeID) => {
    navigation.navigate('Recipe', { recipeID });
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchField}
          placeholder="Nom de la recette"
          onChangeText={(text) => inputSearchTermChanged(text)}
          onSubmitEditing={searchRecipes}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => { searchRecipes(); Keyboard.dismiss(); }}
        >
          <Image
            style={styles.searchButtonIcon}
            source={assets.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchOptionsView}>
        <View style={styles.optionsContainer}>
          <View style={styles.optionButtonView}>
            <TouchableOpacity style={styles.optionButtonDiet}>
              <Text style={styles.textButton}>Régime ?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionButtonView}>
            <TouchableOpacity style={styles.optionButtonCuisine}>
              <Text style={styles.textButton}>Cuisine ?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textOptions}>OU</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.textButton}>Que puis-je cuisiner aujourd&apos;hui ?</Text>
        </TouchableOpacity>
      </View>
      {isErrorDuringDataLoading ? (
        <DisplayError errorMessage="Erreur lors de la récupération des données" />
      ) : (
        <ListRecipes
          recipes={recipes}
          refreshingState={isRefreshing}
          onClickNavigation={navigateToRecipeDetails}
          refreshRecipes={searchRecipes}
          loadMoreRecipes={loadMoreRecipes}
        />
      )}
    </View>
  );
};

SearchRecipe.navigationOptions = {
  title: 'Recherche',
};

export default SearchRecipe;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  searchView: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 10,
    flexDirection: 'row',
  },
  searchButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.mainOrangeColor,
  },
  searchButtonIcon: {
    height: 20,
    width: 20,
    tintColor: colors.mainWhiteColor,
  },
  searchOptionsView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  optionButtonView: {
    flex: 1,
  },
  optionButtonDiet: {
    backgroundColor: colors.mainBlackColor,
    borderRadius: 5,
    paddingVertical: 10,
    marginRight: 10,
  },
  optionButtonCuisine: {
    backgroundColor: colors.mainBlackColor,
    borderRadius: 5,
    paddingVertical: 10,
    marginLeft: 10,
  },
  textButton: {
    color: colors.mainWhiteColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchField: {
    flexGrow: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainOrangeColor,
  },
  textContainer: {
    alignItems: 'center',
    margin: 5,
  },
  textOptions: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
