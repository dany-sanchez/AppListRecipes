import React from 'react';
import {
  View, TextInput, StyleSheet, Image, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../definitions/colors';
import assets from '../definitions/assets';
import ListRecipes from './ListRecipes';
import recipesFakeData from '../helper/recipesFakeData';

const Search = ({ navigation }) => {
  const navigateToRecipeDetails = (recipeID) => {
    navigation.navigate('Recipe', { recipeID });
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchField}
          placeholder="Nom de la recette"
        />
        <TouchableOpacity style={styles.searchButton}>
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
      <ListRecipes
        recipes={recipesFakeData.results}
        onClickNavigation={navigateToRecipeDetails}
      />
    </View>
  );
};

Search.navigationOptions = {
  title: 'Recherche',
};

export default Search;

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
