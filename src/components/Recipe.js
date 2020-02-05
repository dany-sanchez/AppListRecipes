import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, Text } from 'react-native';
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
                        source={{ uri: getRecipeImagePath(recipeData.id, recipeData.imageType) }}
                    />
                    <View style={styles.descriptionContainer}>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.nameText}>
                                {recipeData.title}
                            </Text>
                            <View style={styles.cuisineDietContainer}>
                                <Text style={styles.cuisineText}>
                                    {recipeData.cuisines.join()} cuisine(s)
                                </Text>
                                <Text style={styles.dietText}>
                                    {recipeData.diets.join()} diet(s)
                                </Text>
                            </View>
                            <Text style={styles.prepTimeText}>
                                Prêt en {recipeData.readyInMinutes}min, jusqu'à {recipeData.servings} personnes
                            </Text>
                        </View>
                        <View style={styles.ingredientsContainer}></View>
                        <View style={styles.instructionsContainer}></View>
                        <View style={styles.wineContainer}></View>
                    </View>
                </ScrollView>
            )
        }
        return null;
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
    descriptionContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    detailsContainer: {
        marginBottom: 10,
    },
    nameText: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    cuisineDietContainer: {
        marginVertical: 10,
    }
});