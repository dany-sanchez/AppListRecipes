import React, { useState } from 'react';
import {
  View, StyleSheet, Image, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import SearchIngredient, { radioButtons } from './SearchIngredient';
import ListIngredients from './ListIngredients';
import DisplayError from './DisplayError';
import assets from '../definitions/assets';
import colors from '../definitions/colors';
import { typeAdd } from './AddIngredient';
import fridgeTypes from '../store/definitions/types/fridge';
import shoppingListTypes from '../store/definitions/types/shoppingList';

const Fridge = ({
  navigation, fridgeIngredients, dispatch
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState(radioButtons.defaultValue);

  const searchTermChanged = (text) => {
    setSearchTerm(text);
  };

  const sortValueChanged = (value) => {
    setSortValue(value);
  };

  const navigateToAddIngredient = () => {
    navigation.navigate('AddIngredient', { searchTerm, typeAdd: typeAdd.fridge });
  };

  const saveIngredientInShoppingList = (ingredient) => {
    const action = { value: ingredient, type: shoppingListTypes.SAVE_INGREDIENT_SHOPPINGLIST };
    dispatch(action);
  };

  const unsaveIngredientFromFridge = (ingredient) => {
    const action = { value: ingredient, type: fridgeTypes.UNSAVE_INGREDIENT_FRIDGE };
    dispatch(action);
  };

  const actions = {
    saveIngredientToShoppingList: {
      icon: assets.shoppingCartIcon,
      typeList: typeAdd.list.value,
      action: saveIngredientInShoppingList
    },
    unsaveIngredient: {
      icon: assets.deleteIcon,
      action: unsaveIngredientFromFridge
    }
  };

  return (
    <View style={styles.mainView}>
      <SearchIngredient
        onChangeSearchTerm={searchTermChanged}
        searchTerm={searchTerm}
        onCheckRadio={sortValueChanged}
      />
      {fridgeIngredients.length > 0 ? (
        <ListIngredients
          ingredients={fridgeIngredients}
          sortBy={sortValue}
          textFilter={searchTerm}
          refreshingState={null}
          actions={actions}
        />
      ) : (
        <DisplayError errorMessage="Aucun ingrédient dans le frigo" />
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

Fridge.navigationOptions = {
  title: 'Mon frigo',
};

const mapStateToProps = (state) => ({
  fridgeIngredients: state.fridgeState.ingredients,
});

export default connect(mapStateToProps)(Fridge);

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
