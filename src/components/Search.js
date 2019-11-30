import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = () => {

    return (
        <View style={styles.mainView}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchField}
                    placeholder='Nom de la recette'
                />
                <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    iconRight
                    title="Button with right icon"
                />
            </View>
            <FontAwesomeIcon icon={faSearch} />
        </View>
    );
}

export default Search;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    searchView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
    },
    searchField: {
        padding: 5
    },
});