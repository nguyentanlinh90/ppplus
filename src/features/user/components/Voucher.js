import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    Keyboard
} from 'react-native';
import styleUser from '../styles/styles';
import {formatMoney} from '../../../api/helpers';
import moment from 'moment';
import Barcode from 'react-native-barcode-builder';

export default class Voucher extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        Keyboard.dismiss();
    }

    render() {
        const {voucher, branch} = this.props;
        return (
            <View>
                <ImageBackground source={require('../../../assets/images/voucher.png')} style={styleUser.boxBarcode} >
                    <View style={styleUser.boxVoucher}>
                        <View style={styleUser.boxLeft}>
                                {(branch == 'gotit') ?
                                    (
                                        <Image resizeMode="contain" source={require('../../../assets/images/gotit-small.png')} style={styleUser.iconBranch} />
                                    ):null
                                }
                                {(branch == 'cgv') ?
                                    (
                                        <Image resizeMode="contain" source={require('../../../assets/images/cgv-small.png')} style={styleUser.iconBranch} />

                                    ):null
                                }
                                {(branch == 'bigc') ?
                                    (
                                        <Image resizeMode="contain" source={require('../../../assets/images/bigc-small.png')} style={styleUser.iconBranch} />

                                    ):null
                                }
                                {(branch == 'grab') ?
                                    (
                                        <Image resizeMode="contain" source={require('../../../assets/images/grab-small.png')} style={styleUser.iconBranch} />

                                    ):null
                                }
                            <View style={{alignItems: 'center'}}>
                                <Barcode value={voucher.code} format="CODE128" height={40} width={0.8}/>
                                <Text style={(branch == 'gotit') ? [styleUser.txtCode,{fontSize:14}]: [styleUser.txtCode,{fontSize:9}]}>{(branch == 'gotit') ? voucher.voucher_code : voucher.voucher_code_exchange}</Text>
                            </View>
                        </View>
                        <View style={styleUser.boxRight}>
                            <Text style={styleUser.txtTitleRight}>{formatMoney(voucher.amount)} đ</Text>
                            <View style={styleUser.boxVoucherLeft}>
                                <Text style={styleUser.txtExpire}>Ngày hết hạn </Text>
                                <Text style={styleUser.txtDate}>{moment(voucher.expired_date).format('DD-MM-YYYY')}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
