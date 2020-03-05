import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import colors from '../../definitions/colors';

const RadioButton = ({
  label, value, selected, onSelecting
}) => {
  const select = (val) => {
    onSelecting(val);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => select(value)}
      >
        { selected === value && (<View style={styles.checkedCircle} />) }
      </TouchableOpacity>
      <Text>{label}</Text>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.mainBlackColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.mainBlackColor
  }
});
