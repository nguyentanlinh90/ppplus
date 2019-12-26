import React, {Component} from 'react'
import {View, Text, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import styleReward from '../styles/styles';

export default class StoreName extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', marginBottom: 15}}>
                        <View style={styleReward.boxName}>
                            <Image source={require('../../../assets/images/SumoBBQ.png')}
                                style={{height: 40, width: 40}}/>
                            <Text style={styleReward.txtName}>Sumo BBQ</Text>
                        </View>
                        <View style={styleReward.boxName}>
                            <Image source={require('../../../assets/images/SumoBBQ.png')}
                                style={{height: 40, width: 40}}/>
                            <Text style={styleReward.txtName}>Sumo BBQ</Text>
                        </View>
                        <View style={styleReward.boxName}>
                            <Image source={require('../../../assets/images/SumoBBQ.png')}
                                style={{height: 40, width: 40}}/>
                            <Text style={styleReward.txtName}>Sumo BBQ</Text>
                        </View>
                        <View style={styleReward.boxName}>
                            <Image source={require('../../../assets/images/SumoBBQ.png')}
                                style={{height: 40, width: 40}}/>
                            <Text style={styleReward.txtName}>Sumo BBQ</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
