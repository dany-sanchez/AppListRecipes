import React, { useState } from 'react';
import {
  View, StyleSheet, Image, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchIngredient, { radioButtons } from './SearchIngredient';
import ListIngredients from './ListIngredients';
import DisplayError from './DisplayError';
import savedIngredients from '../helper/ingredientsFakeData';
import assets from '../definitions/assets';
import colors from '../definitions/colors';
import { typeAdd } from './AddIngredient';

const ShoppingList = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState(radioButtons.defaultValue);

  const searchTermChanged = (text) => {
    setSearchTerm(text);
  };

  const sortValueChanged = (value) => {
    setSortValue(value);
  };

  const navigateToAddIngredient = () => {
    navigation.navigate('AddIngredient', { searchTerm, typeAdd: typeAdd.list });
  };

  return (
    <View style={styles.mainView}>
      <SearchIngredient
        onChangeSearchTerm={searchTermChanged}
        searchTerm={searchTerm}
        onCheckRadio={sortValueChanged}
      />
      {savedIngredients.length > 0 ? (
        <ListIngredients
          ingredients={savedIngredients}
          sortBy={sortValue}
          textFilter={searchTerm}
          refreshingState={null}
        />
      ) : (
        <DisplayError errorMessage="Aucun ingrédient dans la liste" />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={
          navigateToAddIngredient
        }
      >
        <Image
          style={styles.addButtonIcon}
          source={assets.addIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textButton}>Ajouter un nouvel ingrédient</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ShoppingList.navigationOptions = {
  title: 'Ma liste',
};

export default ShoppingList;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  addButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.mainOrangeColor,
    flexDirection: 'row',
  },
  addButtonIcon: {
    alignSelf: 'center',
    marginRight: 5,
    height: 25,
    width: 25,
    tintColor: colors.mainWhiteColor,
  },
  buttonView: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontWeight: 'bold',
    color: colors.mainWhiteColor,
  }
});
