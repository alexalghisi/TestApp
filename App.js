import React from 'react';
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import {
    StyleSheet,
} from 'react-native';
import HomeScreen from './src/components/HomeScreen';
import DetailsScreen from './src/components/DetailsScreen';
const RootStack = createStackNavigator({
        Home: HomeScreen,
        Details: DetailsScreen,
    }, {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    },
);
const App = createAppContainer(RootStack);
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
