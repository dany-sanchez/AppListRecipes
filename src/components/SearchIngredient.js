import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Text
} from 'react-native';
import colors from '../definitions/colors';
import RadioButton from './common/RadioButton';

const radioButtons = { nom: 'Nom', rayon: 'Rayon' };

const SearchIngredient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [radio, setRadio] = useState(radioButtons.nom);

  const checkRadio = (value) => {
    setRadio(value);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchField}
          placeholder="Nom de l'ingrédient"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
      </View>
      <View style={styles.radioButtons}>
        <Text style={styles.sortBy}>Trier par : </Text>
        <RadioButton
          style={styles.radioButton}
          key={radioButtons.nom}
          label={radioButtons.nom}
          value={radioButtons.nom}
          onSelecting={checkRadio}
          selected={radio}
        />
        <RadioButton
          style={styles.radioButton}
          key={radioButtons.rayon}
          label={radioButtons.rayon}
          value={radioButtons.rayon}
          onSelecting={checkRadio}
          selected={radio}
        />
      </View>
    </View>
  );
};

export default SearchIngredient;

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
