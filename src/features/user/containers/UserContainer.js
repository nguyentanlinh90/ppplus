import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import LinearGradient from "react-native-linear-gradient";
import styleStore from "../../store/styles/styles";
import styleCheckout from "../../checkout/styles/styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class UserContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {store, user} = this.props;
        return (
            <View style={[styles.body, {backgroundColor: '#f6f8fa'}]}>
                <StatusBar backgroundColor="#AAC037" barStyle="light-content"/>
                <LinearGradient colors={['#AAC037', '#92A723']} style={styleStore.header}>
                    <View style={styleStore.boxHeader}>
                        <TouchableOpacity activeOpacity={0.7} style={styleCheckout.btnClose} onPress={() => this.props.navigation.goBack()}>
                            <Icon name={'chevron-left'} color={'#fff'} size={35}/>
                        </TouchableOpacity>
                        <View style={styleCheckout.boxLbPhone}>
                            <Text style={styleCheckout.lbPhone}>Thông tin tài khoản</Text>
                        </View>
                    </View>
                </LinearGradient>
                <SafeAreaView>
                    <View style={{padding: 20}}>
                        <View style={styleUser.boxRowItem}>
                            <Text style={styleUser.userLb}>Tên chủ cửa hàng</Text>
                            <Text style={styleUser.userRow}>{user.fullname}</Text>
                        </View>
                        <View style={styleUser.boxRowItem}>
                            <Text style={styleUser.userLb}>Tên cửa hàng</Text>
                            <Text style={styleUser.userRow}>{store.name}</Text>
                        </View>
                        <View style={styleUser.boxRowItem}>
                            <Text style={styleUser.userLb}>Địa chỉ</Text>
                            <Text style={styleUser.userRow}>{store.address}</Text>
                        </View>
                        <View style={styleUser.boxRowItem}>
                            <Text style={styleUser.userLb}>Điện thoại</Text>
                            <Text style={styleUser.userRow}>{user.phone}</Text>
                        </View>
                        <View style={styleUser.boxRowItem}>
                            <Text style={styleUser.userLb}>Tên đăng nhập</Text>
                            <Text style={styleUser.userRow}>{user.phone}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        store: state.home.store,
        user: state.user.user
    }
}

export default connect(mapStateToProps, {})(UserContainer);
