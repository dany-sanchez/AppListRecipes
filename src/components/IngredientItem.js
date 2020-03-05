import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text, Image
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../definitions/colors';
import { getIngredientImagePath } from '../api/spoonacular';

const IngredientItem = ({
  ingredient, actions, fridgeIngredients, shoppingListIngredients
}) => {
  const displayName = () => ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);

  const isItSaved = (typeAddPassed) => (
    typeAddPassed === 'fridge'
      ? fridgeIngredients
      : shoppingListIngredients
  )
    .findIndex(
      (obj) => obj.id === ingredient.id
    ) !== -1;

  const displayActionsButtons = () => Object.keys(actions).map((action) => {
    let style = { icon: styles.actionButtonIcon, button: styles.actionButton };
    let isSaved = false;

    if (actions[action].typeList !== undefined) {
      isSaved = isItSaved(actions[action].typeList);
    }

    if (isSaved) {
      style = { icon: styles.actionButtonSavedIcon, button: styles.actionButtonSaved };
    }

    return (
      <TouchableOpacity
        key={`${action}-${ingredient.id.toString()}`}
        style={[style.button, { marginLeft: 10 }]}
        onPress={() => actions[action].action(ingredient)}
        disabled={isSaved}
      >
        <Image
          style={style.icon}
          source={actions[action].icon}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={styles.mainContainer}
    >
      <Image
        style={styles.ingredientImage}
        source={{ uri: getIngredientImagePath(ingredient.image) }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text
            style={styles.ingredientNameText}
            numberOfLines={3}
          >
            {displayName()}
          </Text>
        </View>
        <View style={styles.actionButtonContainer}>
          {displayActionsButtons()}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  fridgeIngredients: state.fridgeState.ingredients,
  shoppingListIngredients: state.shoppingListState.ingredients,
});

export default connect(mapStateToProps)(IngredientItem);

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainOrangeColor,
    flexDirection: 'row',
  },
  ingredientImage: {
    height: 100,
    width: 100,
    marginVertical: 20,
  },
  infoContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  ingredientNameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  actionButtonContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: colors.mainBlackColor,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
  },
  actionButtonIcon: {
    height: 25,
    width: 25,
    tintColor: colors.mainWhiteColor,
  },
  actionButtonSaved: {
    padding: 10,
    justifyContent: 'center',
  },
  actionButtonSavedIcon: {
    height: 25,
    width: 25,
    tintColor: colors.mainOrangeColor,
  },
  textContainer: {
    flex: 1,
  },
});
