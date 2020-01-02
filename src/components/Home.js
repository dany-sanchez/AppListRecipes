import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const Home = ({ navigation }) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <View style={styles.buttonView}>
                        <Image style={styles.buttonIcon} source={assets.fridgeIcon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.homeButtonText}>Mon frigo</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <View style={styles.buttonView}>
                        <Image style={styles.buttonIcon} source={assets.shoppingCartIcon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.homeButtonText}>Ma liste</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <View style={styles.buttonView}>
                        <Image style={styles.buttonIcon} source={assets.bookmarkIcon} />
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
    buttonsContainer: {
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: colors.mainOrangeColor,
        margin: 20,
        borderRadius: 5,
    },
    buttonView: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    buttonIcon: {
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