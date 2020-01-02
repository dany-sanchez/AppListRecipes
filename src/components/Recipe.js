import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getRecipeImagePath, getRecipeDetails } from '../api/spoonacular';
import { recipeDetailsFakeData } from '../helper/recipeDetailsFakeData';

const Recipe = ({ navigation }) => {
    const [isLoading, setLoadingState] = useState(true);
    const [recipeData, setRecipeData] = useState(null);

    useEffect(() => {
        _loadRecipe();
    }, [])

    _loadRecipe = async () => {
        try {
            // setRecipeData(await getRecipeDetails(navigation.getParam('recipeID')));
            setRecipeData(recipeDetailsFakeData);
            setLoadingState(false);
        } catch { }
    }

    const _displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingView}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    const _displayRecipe = () => {
        if (recipeData) {
            return (
                <ScrollView style={styles.scrollViewRecipe}>
                    <Image style={styles.recipeImage}
                        source={{ uri: getRecipeImagePath(recipeData.id) }}
                    />
                </ScrollView>
            )
        }
    }

    return (
        <View style={styles.mainView}>
            {_displayLoading()}
            {_displayRecipe()}
        </View>
    );
}

Recipe.navigationOptions = {
    title: 'Recette',
}

export default Recipe;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewRecipe: {
        flex: 1,
    },
    recipeImage: {
        height: 250,
    },
});