import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const Home = ({ navigation }) => {
    return (
        <View style={styles.mainView}>
            <View>
                <TouchableOpacity style={styles.homeButton}>
                    <View style={styles.homeButtonView}>
                        <Image style={styles.homeButtonIcon} source={assets.fridgeIcon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.homeButtonText}>Mon frigo</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeButton}>
                    <View style={styles.homeButtonView}>
                        <Image style={styles.homeButtonIcon} source={assets.shoppingCartIcon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.homeButtonText}>Ma liste</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeButton}>
                    <View style={styles.homeButtonView}>
                        <Image style={styles.homeButtonIcon} source={assets.bookmarkIcon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.homeButtonText}>Mes recettes</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

Home.navigationOptions = {
    title: 'Moi',
};

export default Home;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    homeButton: {
        backgroundColor: colors.mainOrangeColor,
        margin: 20,
        borderRadius: 5,
    },
    homeButtonView: {
        flexDirection: 'row',
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    homeButtonIcon: {
        alignSelf: 'center',
        marginRight: 5,
        width: 25,
        height: 25,
        tintColor: colors.mainWhiteColor,
    },
    textContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    homeButtonText: {
        color: colors.mainWhiteColor,
        fontSize: 20,
        fontWeight: 'bold',
    }
});