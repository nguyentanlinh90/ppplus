import React, {Component, Fragment} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import styles from '../styles/styles';


export default class Back extends Component {
    constructor(props) {
        super(props);
        this.goBackPage = this.goBackPage.bind(this);
    }

    goBackPage = () => {
        const {navigation} = this.props;
        navigation.goBack();
    }

    render() {
        const {title, styleTitle} = this.props;

        return (
            <View style={styles.boxBack}>
                <View style={{width:'12%', marginLeft:-10}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.goBackPage()}>
                        <View>
                            <Icon name={'chevron-left'} color={'#000000'} size={40}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styleTitle}>{title}</Text>
                </View>
            </View>
        )
    }
}