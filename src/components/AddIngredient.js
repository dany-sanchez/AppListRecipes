import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchIngredient, { radioButtons } from './SearchIngredient';
import ListIngredients from './ListIngredients';
import DisplayError from './DisplayError';
import { getIngredientsWithAutocompleteSearch } from '../api/spoonacular';

export const typeAdd = {
  fridge: { label: 'mon frigo', value: 'fridge' },
  list: { label: 'ma liste', value: 'list' }
};

const AddIngredient = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(navigation.getParam('searchTerm') || '');
  const [isRefreshing, setRefreshingState] = useState(false);
  const [isErrorDuringDataLoading, setErrorDataLoading] = useState(false);
  const [sortValue, setSortValue] = useState(radioButtons.defaultValue);
  const typeAddRef = useRef(navigation.getParam('typeAdd') || { label: '', value: '' });

  useEffect(() => {
    loadIngredientsAutocomplete(searchTerm);
  }, []);

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
        />
      )}
    </View>
  );
};

AddIngredient.navigationOptions = (props) => ({
  title: `Ajouter à ${props.navigation.getParam('typeAdd').label}`,
});

export default AddIngredient;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
