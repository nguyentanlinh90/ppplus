import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    Image,
    RefreshControl,
    Linking, TouchableOpacity
} from 'react-native';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import Voucher from '../components/Voucher';
import {SCREEN_HOME} from "../../../api/screen";
import {changeMsgCode} from "../../home/actions";
import {fetchVoucher} from '../actions/index';
import BoxCgv from "../components/BoxCgv";
import BoxBigC from "../components/BoxBigC";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class VoucherContainer extends Component {
    constructor(props) {
        super(props);

        this.handleOpenUrl = this.handleOpenUrl.bind(this);
    }

    handleOpenUrl=()=>{
        Linking.openURL('https://www.gotit.vn/note');
    }

    render() {
        const {vouchers} = this.props;

        const branch = this.props.navigation.state.params.branch;
        const rows =[];
        if(vouchers.length != 0) {
            for (let i = 0; i < vouchers.length; i++) {
                rows.push(
                    <Voucher voucher = {vouchers[i]} key ={i} branch={branch}/>
                );
            }
        }
        return (
            <View style={[styles.body,{backgroundColor:'#fafafa'}]}>
                <SafeAreaView>
                    <View style={styles.boxBack}>
                        <View style={{width:'12%'}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate(SCREEN_HOME)}>
                                <View>
                                    <Icon name={'chevron-left'} color={'#000000'} size={40}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styleUser.styleTitle}>{'Về trang chủ'}</Text>
                        </View>
                    </View>
                    <View style={styleUser.body}>
                        <Text style={styleUser.txtExchangeSuccess}>Đổi Thành Công</Text>
                        <ScrollView style={{marginLeft:-8,height:'69%'}}>
                            {rows}
                            {(branch == 'bigc')?
                                (
                                    <BoxBigC />
                                ):null
                            }
                            {(branch == 'cgv')?
                                (
                                    <BoxCgv />
                                ):null
                            }
                        </ScrollView>
                        <View style={{marginTop:20, bottom:0}}>
                            {(branch == 'gotit') ?
                                (
                                    <View style={{flexDirection:'row', marginLeft:20, marginRight:20}}>
                                        <Text>Điều kiện sử dụng VC Got It xem </Text>
                                        <Text style={{color:'#0097F2', flexWrap:'wrap'}} onPress={() => this.handleOpenUrl()}>tại đây</Text>
                                    </View>
                                ):null
                            }

                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={styleUser.txtBack} onPress={()=> this.props.navigation.navigate(SCREEN_HOME)}>Trở về trang chủ</Text>
                                <Text style={styleUser.txtDesc}>Danh sách voucher của bạn đã được lưu vào ví</Text>
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
        vouchers: state.user.vouchers
    }
}

export default connect(mapStateToProps, {
    changeMsgCode,
})(VoucherContainer);
