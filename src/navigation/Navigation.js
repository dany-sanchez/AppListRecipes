import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Search from '../components/Search';

const SearchNavigation = createStackNavigator({
  Search: Search,
},
{
  initialRouteName: 'Search',
});

export default createAppContainer(SearchNavigation);