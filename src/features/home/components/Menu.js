import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{backgroundColor: 'blue',position:'absolute', zIndex:999,height:'100%', width:'100%', top:0}}>
            </View>
        );
    }
}

export default Menu;