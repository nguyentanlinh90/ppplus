import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {
    createAppContainer,
} from 'react-navigation';
import {
    createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import Description from './MonthScreen';

class MonthScreen extends Component {
    render() {
        const {revenue} = this.props;

        return (
            <Description/>
        );
    }
}

class SeasonScreen extends Component {
    render() {
        return (
            <Description/>
        );
    }
}

const TabNavigator = createMaterialTopTabNavigator({
    Tháng: { screen: MonthScreen },
    Quý: {screen: SeasonScreen},
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, vertical, tintColor }) => {
                const { routeName } = navigation.state;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: '#848484',
            labelStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            },
            style: {
                backgroundColor: 'white',
            },
            tabStyle: {
                height: 50,
            },
        },
    });

export default createAppContainer(TabNavigator);