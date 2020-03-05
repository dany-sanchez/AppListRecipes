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
        <View style={styles.textContainer}>
          <Text>
            Ajouter les ingrédients supprimés du frigo à la liste de courses
          </Text>
        </View>
      </View>
      <View style={styles.switchView}>
        <Switch
          style={styles.switch}
          onChange={switchRemoveIngredientFromShoppingList}
          value={settings.removeIngredientFromShoppingList}
        />
        <View style={styles.textContainer}>
          <Text>
            Lors de l&apos;ajout d&apos;un ingrédient au frigo depuis la liste de courses,
            supprimer l&apos;ingrédient de la liste d&apos;achats
          </Text>
        </View>
      </View>
      <Text style={styles.titleText}>API</Text>
      <View style={styles.inlineText}>
        <Text>
          Crédits API restants :
          {' '}
        </Text>
        <Text style={styles.dataText}>
          {settings.apiData.credits || '.....'}
        </Text>
      </View>
      <View style={styles.inlineText}>
        <Text>
          Dernière mise à jour :
          {' '}
        </Text>
        <Text style={styles.dataText}>
          {settings.apiData.lastUpdate}
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => resetStore()}>
        <View style={styles.buttonView}>
          <Image style={styles.buttonIcon} source={assets.deleteIcon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Effacer les données</Text>
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
    alignSelf: 'center',
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
  textContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonText: {
    color: colors.mainWhiteColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inlineText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dataText: {
    fontWeight: 'bold',
  }
});
