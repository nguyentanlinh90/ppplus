import React, {Component, Fragment} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles';
import {SCREEN_MECHANISM} from '../api/screen';

export default class Hotline extends Component {
    constructor(props) {
        super(props);

        this.callSupport = this.callSupport.bind(this);
    }

    callSupport =()=>{
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${1800599937}';
        }
        else {
            phoneNumber = 'telprompt:${1800599937}';
        }
        Linking.openURL(phoneNumber);
    }

    render() {
        const {title, styleTitle} = this.props;

        return (
            <View style={{height:40, bottom:0}}>
                <View style={styles.boxSupport}>
                    <TouchableOpacity style={{width:'65%'}} activeOpacity={0.8} onPress={()=> this.callSupport()}>
                        <Text style={styles.txtRowSupport}>Hỗ trợ 1800 599 937</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMechanism} activeOpacity={0.8} onPress={()=> this.props.navigation.navigate(SCREEN_MECHANISM)} >
                        <Fragment>
                            <Icon name={'information-outline'} color={'#0097F2'} size={30} />
                            <Text style={{color:'#0097F2', marginLeft:5, fontSize:16}}>Cơ chế</Text>
                        </Fragment>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}