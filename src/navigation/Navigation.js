import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Image } from 'react-native';

import Search from '../components/Search';
import Home from '../components/Home';
import Settings from '../components/Settings';
import Recipe from '../components/Recipe';
import assets from '../definitions/assets';
import colors from '../definitions/colors';

const SearchNavigation = createStackNavigator({
  Search,
  Recipe,
},
{
  initialRouteName: 'Search',
});

const HomeNavigation = createStackNavigator({
  Home,
},
{
  initialRouteName: 'Home',
});

const SettingsNavigation = createStackNavigator({
  Settings,
},
{
  initialRouteName: 'Settings',
});

const TabNavigation = createBottomTabNavigator({
  Search: {
    screen: SearchNavigation,
    navigationOptions: {
      title: 'Recherche',
      tabBarIcon:
        ({ tintColor }) => (
          <Image
            style={[{ tintColor }, styles.tabIcon]}
            source={assets.searchIcon}
          />
        ),
    },
  },
  Home: {
    screen: HomeNavigation,
    navigationOptions: {
      title: 'Home',
      tabBarIcon:
        ({ tintColor }) => (
          <Image
            style={[{ tintColor }, styles.tabIcon]}
            source={assets.homeIcon}
          />
        ),
    },
  },
  Settings: {
    screen: SettingsNavigation,
    navigationOptions: {
      title: 'Settings',
      tabBarIcon:
        ({ tintColor }) => (
          <Image
            style={[{ tintColor }, styles.tabIcon]}
            source={assets.settingsIcon}
          />
        ),
    },
  },
},
{
  tabBarOptions: {
    activeBackgroundColor: colors.mainWhiteColor,
    activeTintColor: colors.mainOrangeColor,
    showLabel: false,
  },
  initialRouteName: 'Home',
});

export default createAppContainer(TabNavigation);

const styles = StyleSheet.create({
  tabIcon: {
    width: 25,
    height: 25,
  }
});
