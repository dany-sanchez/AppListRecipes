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

const ShoppingList = ({ navigation, shoppingListIngredients, dispatch }) => {
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

  const saveIngredientInFridge = (ingredient) => {
    const action = { value: ingredient, type: fridgeTypes.SAVE_INGREDIENT_FRIDGE };
    dispatch(action);
  };

  const unsaveIngredientFromShoppingList = (ingredient) => {
    const action = { value: ingredient, type: shoppingListTypes.UNSAVE_INGREDIENT_SHOPPINGLIST };
    dispatch(action);
  };

  const actions = {
    saveIngredientToFridge: {
      icon: assets.fridgeIcon,
      typeList: typeAdd.fridge.value,
      action: saveIngredientInFridge
    },
    unsaveIngredient: {
      icon: assets.deleteIcon,
      action: unsaveIngredientFromShoppingList
    }
  };

  return (
    <View style={styles.mainView}>
      <SearchIngredient
        onChangeSearchTerm={searchTermChanged}
        searchTerm={searchTerm}
        onCheckRadio={sortValueChanged}
      />
      {shoppingListIngredients.length > 0 ? (
        <ListIngredients
          ingredients={shoppingListIngredients}
          sortBy={sortValue}
          textFilter={searchTerm}
          refreshingState={null}
          actions={actions}
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

const mapStateToProps = (state) => ({
  shoppingListIngredients: state.shoppingListState.ingredients,
});

export default connect(mapStateToProps)(ShoppingList);

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
