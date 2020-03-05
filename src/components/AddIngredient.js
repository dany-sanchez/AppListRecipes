import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import SearchIngredient, { radioButtons } from './SearchIngredient';
import ListIngredients from './ListIngredients';
import DisplayError from './DisplayError';
import { getIngredientsWithAutocompleteSearch } from '../api/spoonacular';
import assets from '../definitions/assets';
import fridgeTypes from '../store/definitions/types/fridge';
import shoppingListTypes from '../store/definitions/types/shoppingList';

export const typeAdd = {
  fridge: { label: 'mon frigo', value: 'fridge' },
  list: { label: 'ma liste', value: 'list' }
};

const AddIngredient = ({
  navigation, fridgeIngredients, shoppingListIngredients, dispatch
}) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(navigation.getParam('searchTerm') || '');
  const [isRefreshing, setRefreshingState] = useState(false);
  const [isErrorDuringDataLoading, setErrorDataLoading] = useState(false);
  const [sortValue, setSortValue] = useState(radioButtons.defaultValue);
  const typeAddRef = useRef(navigation.getParam('typeAdd') || { label: '', value: '' });

  useEffect(() => {
    loadIngredientsAutocomplete(searchTerm);
  }, [fridgeIngredients, shoppingListIngredients]);

  const searchTermChanged = (text) => {
    setSearchTerm(text);
    loadIngredientsAutocomplete(text);
  };

  const sortValueChanged = (value) => {
    setSortValue(value);
  };

  const loadIngredientsAutocomplete = async (searchPart) => {
    setRefreshingState(true);
    setErrorDataLoading(false);
    let spoonacularAutocompleteResult = [];
    try {
      if (searchPart.length > 0) {
        spoonacularAutocompleteResult = await getIngredientsWithAutocompleteSearch(searchPart);
      }
      setIngredients(spoonacularAutocompleteResult);
    } catch {
      setIngredients([]);
      setErrorDataLoading(true);
    } finally {
      setRefreshingState(false);
    }
  };

  const saveIngredientInShoppingList = (ingredient) => {
    const action = { value: ingredient, type: shoppingListTypes.SAVE_INGREDIENT_SHOPPINGLIST };
    dispatch(action);
  };

  const saveIngredientInFridge = (ingredient) => {
    const action = { value: ingredient, type: fridgeTypes.SAVE_INGREDIENT_FRIDGE };
    dispatch(action);
  };

  const actions = {
    [typeAdd.fridge.value]: {
      saveIngredientToFridge: {
        icon: assets.fridgeIcon,
        typeList: typeAdd.fridge.value,
        action: saveIngredientInFridge
      },
    },
    [typeAdd.list.value]: {
      saveIngredientToShoppingList: {
        icon: assets.shoppingCartIcon,
        typeList: typeAdd.list.value,
        action: saveIngredientInShoppingList
      },
    },
  };

  return (
    <View style={styles.mainView}>
      <SearchIngredient
        onChangeSearchTerm={searchTermChanged}
        searchTerm={searchTerm}
        onCheckRadio={sortValueChanged}
      />
      {isErrorDuringDataLoading ? (
        <DisplayError errorMessage="Erreur lors de la récupération des données" />
      ) : (
        <ListIngredients
          sortBy={sortValue}
          ingredients={ingredients}
          textFilter={searchTerm}
          refreshingState={isRefreshing}
          actions={actions[typeAddRef.current.value]}
        />
      )}
    </View>
  );
};

AddIngredient.navigationOptions = (props) => ({
  title: `Ajouter à ${props.navigation.getParam('typeAdd').label}`,
});

const mapStateToProps = (state) => ({
  fridgeIngredients: state.fridgeState.ingredients,
  shoppingListIngredients: state.shoppingListState.ingredients,
});

export default connect(mapStateToProps)(AddIngredient);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
