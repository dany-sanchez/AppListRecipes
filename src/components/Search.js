import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { colors } from '../definitions/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { assets } from '../definitions/assets';

const Search = ({ navigation }) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchField}
                    placeholder='Nom de la recette'
                />
                <TouchableOpacity
                    style={styles.searchButton}
                >
                    <Image style={styles.searchButtonIcon}
                        source={assets.searchIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

Search.navigationOptions = {
    title: 'Recherche',
};

export default Search;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    searchView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 10,
        flexDirection: 'row',
    },
    searchButton: {
        borderRadius: 5,
        backgroundColor: colors.mainOrangeColor,
        padding: 10,
    },
    searchButtonIcon: {
        height: 20,
        width: 20,
        tintColor: 'white',
    },
    searchField: {
        marginRight: 10,
        padding: 5,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.mainOrangeColor,
    },
});