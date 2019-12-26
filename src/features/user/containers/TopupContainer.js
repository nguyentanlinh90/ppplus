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
import DropdownAlert from "react-native-dropdownalert";
import Back from "../../../components/Back";
import {convertPhone, formatMoney, getDenominationTopupGotit} from '../../../api/helpers';
import LinearBox from "../../../components/LinearBox";
import styleReward from "../../reward/styles/styles";
import NetInfo from "@react-native-community/netinfo";
import Spinner from "react-native-loading-spinner-overlay";
import {SCREEN_VOUCHER, SCREEN_TOPUP_STATUS} from "../../../api/screen";
import {checkExchange, exchangeVoucher} from "../actions/index";

const warting = false;

class TopupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            phone:'',
            isLoading:false,
            isConnection: false,
            prices: [],
            isExchange: false,
            telco:'mobi'
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.handleExchange = this.handleExchange.bind(this);
        this.handleChangeTelco = this.handleChangeTelco.bind(this);
    }

    handleChangeTelco =(telco)=>{
        this.setState({telco: telco});
    }

    handleExchange =()=>{
        const {user, exchangeVoucher, revenue} = this.props;
        if(this.state.amount != '' && this.state.phone != ''){
            if(this.state.isConnecting){
                if(revenue.reward >= this.state.amount){
                    this.setState({isLoading: true});
                    exchangeVoucher(
                        user,
                        this.state.phone,
                        'topup',
                        'topup',
                        this.state.amount,
                        user.token
                    );
                }else{
                    this.dropdown.alertWithType('error', 'Lỗi', 'Số tiền thưởng của bạn không đủ.');
                }
            }else{
                this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng kiểm kết nối mạng.');
            }
        }else{
            if(this.state.amount == ''){
                this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng chọn số tiền muốn nạp.');
            }else if(this.state.phone == ''){
                this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng nhập số điện thoại cần nạp .');
            }
        }
    }

    componentDidMount(){
        const prices = getDenominationTopupGotit();
        this.setState({prices: prices});

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );

        const {user, checkExchange} = this.props;
        this.setState({isLoading: true});
        checkExchange(user);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );
    }

    _handleConnectivityChange = () => {
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected == true) {
                this.setState({isConnecting: true});
            } else {
                this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng kiểm tra kết nối mạng ');
                this.setState({isConnecting: false});
            }
        });
    };


    changeValue =(money)=>{
        this.setState({amount: money});
    }

    onChangeText =(text)=>{
        if (this.warningInput) {
            clearTimeout(this.warningInput);
        }

        const strPhone = convertPhone(text);
        this.setState({phone: strPhone});

        this.warningInput = setTimeout(() => {
            var regEx = /^(03|09|08|07|05)[0-9]{8}$/;
            if (!regEx.test(this.state.phone)) {
                this.dropdown.alertWithType('error', 'Lỗi', 'Số điện thoại không đúng định dạng.');
            }
        }, 2000);
    }

    componentWillReceiveProps(nextProps){
       if(nextProps.msg_code == 'check_exchange_success'){
            this.setState({isLoading: false, isExchange: true});
            nextProps.changeMsgCode('');

        }else if(nextProps.msg_code == 'check_exchange_fail'){
           this.setState({isLoading: false});
           nextProps.changeMsgCode('');

        }else if(nextProps.msg_code == 'topup_success'){
           this.setState({amount: '', phone:'', isLoading:false, isExchange: true});
           nextProps.changeMsgCode('');
           this.props.navigation.navigate(SCREEN_TOPUP_STATUS,{status: true});

       }else if(nextProps.msg_code == 'topup_fail'){
           this.setState({amount: '', phone:'', isLoading:false, isExchange: true});
           nextProps.changeMsgCode('');
           this.props.navigation.navigate(SCREEN_TOPUP_STATUS, {status: false});
       }
    }

    render() {
        return (
            <View style={[styles.body,{backgroundColor:'#f9f9f9'}]}>
                <Spinner visible={this.state.isLoading}  textContent={'Loading...'} color={'white'} size={'large'} textStyle={{color:'#fff'}}/>
                <SafeAreaView>
                    <View style={styleUser.content}>
                        <Back navigation = {this.props.navigation} title={'Top Up'} styleTitle={styleUser.styleTitle}/>
                        <View>
                            <Text style={styleUser.txtExchange}>Số điện thoại</Text>
                            <TextInput
                                style={styleUser.txtValue}
                                placeholderStyle={{ paddingLeft:20}}
                                autoCapitalize="none"
                                autoCorrect={true}
                                keyboardType='numeric'
                                returnKeyType="next"
                                maxLength={10}
                                placeholder={"Nhập số điện thoại"}
                                onChangeText={(text) => this.onChangeText(text)}
                                value={this.state.phone}
                            />
                        </View>

                        <View>
                            <Text style={styleUser.txtTelco}>Nhà mạng</Text>
                            <View style={{width:'100%', flexDirection:'row'}}>
                                <TouchableOpacity activeOpacity={0.9} style={styleUser.groupTelco} onPress={() => this.handleChangeTelco('mobi')}>
                                    <View style={(this.state.telco == 'mobi') ? styleUser.boxTelcoActive : styleUser.boxTelco}>
                                        <Image resizeMode="stretch" source={require('../../../assets/images/Mobile.png')} style={styleUser.imgTelco}/>
                                    </View>
                                    <Text style={styleUser.lbTelco}>Mobifone</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.9} style={styleUser.groupTelco} onPress={() => this.handleChangeTelco('vietttel')}>
                                    <View style={(this.state.telco == 'vietttel') ? styleUser.boxTelcoActive : styleUser.boxTelco}>
                                        <Image resizeMode="stretch" source={require('../../../assets/images/Viettel.png')} style={styleUser.imgTelco}/>
                                    </View>
                                    <Text style={styleUser.lbTelco}>Viettel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.9} style={styleUser.groupTelco} onPress={() => this.handleChangeTelco('gmobile')}>
                                    <View style={(this.state.telco == 'gmobile') ? styleUser.boxTelcoActive : styleUser.boxTelco}>
                                        <Image resizeMode="stretch" source={require('../../../assets/images/GMobile.png')} style={styleUser.imgTelco}/>
                                    </View>
                                    <Text style={styleUser.lbTelco}>GMobile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.9} style={styleUser.groupTelco} onPress={() => this.handleChangeTelco('vnmobile')}>
                                    <View style={(this.state.telco == 'vnmobile') ? styleUser.boxTelcoActive : styleUser.boxTelco}>
                                        <Image resizeMode="stretch" source={require('../../../assets/images/Vn.png')} style={styleUser.imgTelco}/>
                                    </View>
                                    <Text style={styleUser.lbTelco}>Vietnamobile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.9} style={styleUser.groupTelco} onPress={() => this.handleChangeTelco('vina')}>
                                    <View style={(this.state.telco == 'vina') ? styleUser.boxTelcoActive : styleUser.boxTelco}>
                                        <Image resizeMode="stretch" source={require('../../../assets/images/Vina.png')} style={styleUser.imgTelco}/>
                                    </View>
                                    <Text style={styleUser.lbTelco}>Vinaphone</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={this.state.prices}
                                extraData={this.state}
                                horizontal={false}
                                numColumns={3}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) =>
                                    <TouchableOpacity onPress = {() => this.changeValue(item)} style={(this.state.amount == item) ? [styleUser.boxPrice]: [styleUser.boxPrice,{backgroundColor:'#fff'}]}>
                                        <Text style={(this.state.amount == item) ? [styleUser.txtPrice]:[styleUser.txtPrice,{color:'#9D9D9D'}]}>{formatMoney(item)}</Text>
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                        <View>
                            {(this.state.isExchange)?
                                (
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleExchange()}>
                                        <LinearBox styles={styleUser.btnExchange}>
                                            <Text style={styleReward.txtBtnExchange}>Nạp Ngay</Text>
                                        </LinearBox>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <View style={styleReward.btnExchangeDisable}>
                                        <Text style={styleReward.txtBtnExchange}>Đổi Ngay</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    <View>
                    </View>
                    <DropdownAlert ref={ref => this.dropdown = ref} defaultContainer={styles.defaultContainer} defaultTextContainer={styles.defaultTextContainer}/>
                </SafeAreaView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        msg_code: state.home.msg_code,
        user: state.user.user,
        revenue: state.home.revenue
    }
}

export default connect(mapStateToProps, {
    changeMsgCode,
    checkExchange,
    exchangeVoucher
})(TopupContainer);
