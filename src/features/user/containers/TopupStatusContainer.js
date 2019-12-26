import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {changeMsgCode} from "../../home/actions";
import LinearBox from "../../../components/LinearBox";
import {SCREEN_HOME, SCREEN_TOPUP} from "../../../api/screen";


class TopupStatusContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: true
        }
    }

    render() {
        const status = this.props.navigation.state.params.status;
        let lbButton = '';
        let message = '';
        if (status) {
            message = 'Nạp tiền thành công'
            lbButton = 'Tiếp Tục Nạp Tiền';
        } else {
            message = 'Nạp Tiền Thất Bại';
            lbButton = 'Thử lại';
        }
        return (
            <View style={styles.body}>
                <SafeAreaView>
                    <View style={styles.container}>
                        <View style={styleUser.groupStatus}>
                            <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                {(status) ?
                                    (
                                        <Image source={require('../../../assets/images/topup-success.png')}
                                               style={styleUser.imgTopup}/>
                                    ) :
                                    (
                                        <Image source={require('../../../assets/images/topup-fail.png')}
                                               style={styleUser.imgTopup}/>
                                    )
                                }
                                <Text style={styleUser.txtTopup}>{message}</Text>
                            </View>

                            <View style={{padding: 20}}>
                                <TouchableOpacity activeOpacity={0.8} style={styleUser.boxBtnTopup} onPress={() => this.props.navigation.navigate(SCREEN_TOPUP)}>
                                    <LinearBox styles={styleUser.btnTopup}>
                                        <Text style={styleUser.txtBtnTopup}>{lbButton}</Text>
                                    </LinearBox>
                                </TouchableOpacity>
                                <Text style={styleUser.txtGoHome} onPress={() => this.props.navigation.navigate(SCREEN_HOME)}>Trở về trang chủ</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        msg_code: state.home.msg_code,
        user: state.user.user,
    }
}

export default connect(mapStateToProps, {
    changeMsgCode,
})(TopupStatusContainer);
