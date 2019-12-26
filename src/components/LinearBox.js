import React, {Component} from 'react';
import {Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import stylesHome from "../features/home/styles/styles";

export default class LinearBox extends Component {
    render() {
        const {styles} = this.props;
        return (
            <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#0045A5', '#0085E1','#0097F2']} style={styles}>
                {this.props.children}
            </LinearGradient>
        );
    }
}