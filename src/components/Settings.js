import React from 'react';
import {
  View, StyleSheet, Text, Switch, Image, Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import colors from '../definitions/colors';
import assets from '../definitions/assets';
import { resetPersistor, store } from '../store/config';
import settingsTypes from '../store/definitions/types/settings';

const Settings = ({ settings }) => {
  const switchAddIngredientToShoppingList = () => {
    store.dispatch({
      type: settingsTypes.ADD_INGREDIENT_TO_SHOPPING_LIST,
      value: !settings.addIngredientToShoppingList
    });
  };

  const switchRemoveIngredientFromShoppingList = () => {
    store.dispatch({
      type: settingsTypes.REMOVE_INGREDIENT_FROM_SHOPPING_LIST,
      value: !settings.removeIngredientFromShoppingList
    });
  };

  const resetStore = () => {
    Alert.alert('Clear data', 'Are you sure ? You will loose every saved items.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => resetPersistor() },
      ]);
  };


  return (
    <View style={styles.mainView}>
      <Text style={styles.titleText}>Configuration</Text>
      <View style={styles.switchView}>
        <Switch
          style={styles.switch}
          onChange={switchAddIngredientToShoppingList}
          value={settings.addIngredientToShoppingList}
        />
        <Text>Add ingredients removed from the fridge to the shopping list</Text>
      </View>
      <View style={styles.switchView}>
        <Switch
          style={styles.switch}
          onChange={switchRemoveIngredientFromShoppingList}
          value={settings.removeIngredientFromShoppingList}
        />
        <Text>
          {/* eslint-disable-next-line */}
          When adding an ingredient to the fridge from the shopping list, remove it from the shopping list
        </Text>
      </View>
      <Text style={styles.titleText}>API</Text>
      <Text>
        Api credits remaining:
        {settings.apiData.credits || '.....'}
      </Text>
      <Text>
        Last update:
        {settings.apiData.lastUpdate}
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => resetStore()}>
        <View style={styles.buttonView}>
          <Image style={styles.buttonIcon} source={assets.deleteIcon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Clear data</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Settings.navigationOptions = {
  title: 'Paramètres',
};

const mapStateToProps = (state) => ({
  settings: state.settingsState
});

export default connect(mapStateToProps)(Settings);


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 20,
  },
  switchView: {
    flexDirection: 'row',
    marginBottom: 30
  },
  switch: {
    marginRight: 10
  },
  titleText: {
    color: colors.mainOrangeColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20
  },
  buttonContainer: {
    backgroundColor: colors.mainOrangeColor,
    margin: 40,
    borderRadius: 5,
  },
  buttonView: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  buttonIcon: {
    alignSelf: 'center',
    marginRight: 5,
    width: 25,
    height: 25,
    tintColor: colors.mainWhiteColor,
  },
  buttonText: {
    color: colors.mainWhiteColor,
    fontSize: 20,
    fontWeight: 'bold',
  }
});
