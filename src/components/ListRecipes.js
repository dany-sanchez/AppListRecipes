import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecipeItem from './RecipeItem';

const ListRecipes = ({ recipes, onClickNavigation }) => {
    const _isItSaved = (recipeID) => {
        return true;
    }

    return (
        <FlatList
            style={styles.listRecipes}
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RecipeItem
                recipe={item}
                onClickOnMe={onClickNavigation}
                isSaved={_isItSaved(item.id)}
            />}
        />
    );
}

export default ListRecipes;

const styles = StyleSheet.create({
    listRecipes: {
        flex: 1,
    },
});