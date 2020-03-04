import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Text
} from 'react-native';
import colors from '../definitions/colors';
import RadioButton from './common/RadioButton';

export const radioButtons = {
  nom: { label: 'Nom', value: 'name' },
  rayon: { label: 'Rayon', value: 'aisle' },
  defaultValue: 'name'
};

const SearchIngredient = ({ onChangeSearchTerm, searchTerm, onCheckRadio }) => {
  const [radio, setRadio] = useState(radioButtons.defaultValue);

  const checkRadio = (value) => {
    setRadio(value);
    onCheckRadio(value);
  };

  return (
    <View>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchField}
          placeholder="Nom de l'ingrédient"
          onChangeText={(text) => onChangeSearchTerm(text)}
          onSubmitEditing={({ nativeEvent: { text } }) => onChangeSearchTerm(text)}
          value={searchTerm}
        />
      </View>
      <View style={styles.radioButtons}>
        <Text style={styles.sortBy}>Trier par : </Text>
        <RadioButton
          style={styles.radioButton}
          key={radioButtons.nom.value}
          label={radioButtons.nom.label}
          value={radioButtons.nom.value}
          onSelecting={checkRadio}
          selected={radio}
        />
        <RadioButton
          style={styles.radioButton}
          key={radioButtons.rayon.value}
          label={radioButtons.rayon.label}
          value={radioButtons.rayon.value}
          onSelecting={checkRadio}
          selected={radio}
        />
      </View>
    </View>
  );
};

export default SearchIngredient;

const styles = StyleSheet.create({
  searchView: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 10,
    flexDirection: 'row',
  },
  radioButtons: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchField: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainOrangeColor,
    paddingBottom: 5,
  },
  sortBy: {
    fontWeight: 'bold',
  },
});
