import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {changeMsgCode} from "../../home/actions";
import DropdownAlert from "react-native-dropdownalert";
import Back from "../../../components/Back";
import {convertNumber, getDenominationVCGotit, getDenominationVCCgv, getDenominationVCBigC, formatMoney, calculateMoney} from '../../../api/helpers';
import LinearBox from "../../../components/LinearBox";
import styleReward from "../../reward/styles/styles";
import Dash from 'react-native-dash';
import NetInfo from "@react-native-community/netinfo";
import {SCREEN_VOUCHER} from '../../../api/screen';
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "react-native-modal";
import {exchangeVoucher, checkExchange} from '../actions/index';
import {checkPrice} from '../../../api/helpers';

const warting = false;

class RedemptionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            type:'',
            branch:'',
            prices: [],
            title:'',
            description:'',
            isLoading: false,
            isConnection: false,
            visible: false,
            isExchange: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.handleExchange = this.handleExchange.bind(this);
        this.handleExchangeVoucher = this.handleExchangeVoucher.bind(this);
    }

    handleExchangeVoucher =(type)=>{
        const {exchangeVoucher, user} = this.props;
        if(type == 'agree'){
            this.setState({isLoading:true});
            exchangeVoucher(user, user.phone, this.state.branch, this.state.type, this.state.amount, user.token);
        }else if(type == 'cancel'){
            this.setState({visible: false});
        }
    }

    handleExchange =()=>{
        const {revenue} = this.props;

        if(this.state.amount != '' && this.state.type != '' && this.state.branch != ''){
            if(this.state.isConnecting){
                if(parseInt(revenue.reward) >= parseInt(this.state.amount)) {
                     const isCheck = checkPrice(this.state.branch, this.state.amount);
                     if(isCheck){
                         Keyboard.dismiss();
                         this.setState({visible: true});
                     }else{
                         this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng kiểm tra lại số tiền.');
                     }
                }else{
                    this.dropdown.alertWithType('error', 'Lỗi', 'Số tiền thưởng của bạn không đủ.');
                }
            }else{
                this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng kiểm kết nối mạng.');
            }
        }else{
            this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng nhập số tiền muốn chuyển đổi.');
        }
    }

    componentDidMount(){
        const type = this.props.navigation.state.params.type;
        const branch = this.props.navigation.state.params.branch;
        const title = this.props.navigation.state.params.title;

        let description ='';
        if(type == 'voucher'){
            if(branch == 'gotit'){
                description = 'Giá trị voucher được đổi phải mang bội số của 10.000 (vd:10.000, 20.000, 30.000, 40.000 …)';
            }else if(branch == 'cgv'){
                description = 'Giá trị voucher được đổi phải mang bội số của 100.000 (vd:100.000, 200.000, 300.000 …)';
            }else if(branch == 'bigc'){
                description = 'Giá trị voucher được đổi phải mang bội số của 50.000 (vd:50.000, 100.000, 150.000 …)';
            }
        }
        this.setState({
            title:title,
            type: type,
            branch: branch,
            description: description
        });

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );

        const {user, checkExchange} = this.props;
        this.setState({isLoading: true });
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

    onChangeText =(value)=>{
        if (this.warningInput) {
            clearTimeout(this.warningInput);
        }

        const strNumber = convertNumber(value);
        this.setState({amount: strNumber});

        if(this.state.type == 'voucher'){
            let data = [];
            if(this.state.branch == 'gotit'){
                data = getDenominationVCGotit();
                this.setState({prices: data});
            }else if(this.state.branch == 'cgv'){
                data = getDenominationVCCgv();
                this.setState({prices: data});
            } else if(this.state.branch == 'bigc'){
                data = getDenominationVCBigC();
                this.setState({prices: data});
            }

            this.warningInput = setTimeout(() => {
                const amount = calculateMoney(strNumber, data);
                this.setState({amount: amount});
            }, 2000);
        }
        if(value == ''){
            this.setState({prices: []});
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.warningInput) {
            clearTimeout(this.warningInput);
        }

        if(nextProps.msg_code == 'fetch_exchange_voucher_success'){
            this.setState({isLoading: false, visible: false});
            nextProps.changeMsgCode('');
            this.props.navigation.navigate(SCREEN_VOUCHER, {branch : this.state.branch});

        }else if(nextProps.msg_code == 'fetch_exchange_voucher_fail'){
            this.setState({isLoading: false});
            this.dropdown.alertWithType('error', 'Lỗi', 'Có lỗi xả ra. Vui lòng thử lại');

        }else if(nextProps.msg_code == 'check_exchange_success'){
            this.setState({isLoading: false, isExchange: true});
            nextProps.changeMsgCode('');

        }else if(nextProps.msg_code == 'check_exchange_fail'){
            this.setState({isLoading: false});
            nextProps.changeMsgCode('');
        }
    }

    render() {
        return (
            <View style={[styles.body,{backgroundColor:'#f9f9f9'}]}>
                <Spinner visible={this.state.isLoading}  textContent={'Loading...'} color={'white'} size={'large'} textStyle={{color:'#fff'}}/>
                <SafeAreaView>
                    <View style={styleUser.content}>
                        <Back navigation = {this.props.navigation} title={this.state.title} styleTitle={styleUser.styleTitle}/>
                        <View>
                            <Text style={styleUser.txtExchange}>Số tiền bạn muốn chuyển đổi(đ)</Text>
                            <TextInput
                                style={styleUser.txtValue}
                                placeholderStyle={{ paddingLeft:20}}
                                autoCapitalize="none"
                                autoCorrect={true}
                                keyboardType='numeric'
                                returnKeyType="next"
                                placeholder={"Nhập số tiền..."}
                                onChangeText={(text) => this.onChangeText(text)}
                                value={formatMoney(this.state.amount.toString())}
                            />
                        </View>
                        <View>
                            {(this.state.isExchange) ?
                                (
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleExchange()}>
                                        <LinearBox styles={styleUser.btnExchange}>
                                            <Text style={styleReward.txtBtnExchange}>Đổi Ngay</Text>
                                        </LinearBox>
                                    </TouchableOpacity>
                                ):
                                (
                                    <View style={styleReward.btnExchangeDisable}>
                                        <Text style={styleReward.txtBtnExchange}>Đổi Ngay</Text>
                                    </View>
                                )
                            }
                            <Dash
                                dashGap={6}
                                dashLength={8}
                                dashThickness={2}
                                dashColor={'#EAEAEA'}
                                style={{
                                marginTop:30,
                                marginBottom:20,
                                width:'100%',
                                height:0.5,
                                flexDirection:'row'
                            }}/>
                            <Text style={styleUser.txtDescription}>{this.state.description}</Text>
                        </View>


                        {/*<View style={{marginTop:'20%', flex:1}}>*/}
                        {/*    <FlatList*/}
                        {/*        showsHorizontalScrollIndicator={false}*/}
                        {/*        legacyImplementation={false}*/}
                        {/*        data={this.state.prices}*/}
                        {/*        extraData={this.state}*/}
                        {/*        horizontal={false}*/}
                        {/*        numColumns={3}*/}
                        {/*        keyExtractor={(item, index) => index.toString()}*/}
                        {/*        renderItem={({item}) =>*/}
                        {/*            <TouchableOpacity onPress = {() => this.changeValue(item)} style={(this.state.amount == item) ? [styleUser.boxPrice]: [styleUser.boxPrice,{backgroundColor:'#fff'}]}>*/}
                        {/*                <Text style={(this.state.amount == item) ? [styleUser.txtPrice]:[styleUser.txtPrice,{color:'#000000'}]}>{formatMoney(item)}</Text>*/}
                        {/*            </TouchableOpacity>*/}
                        {/*        }*/}
                        {/*    />*/}
                        {/*</View>*/}
                    </View>
                    <View>
                        <Modal
                            useNativeDriver={true}
                            animationIn={'slideInUp'}
                            animationInTiming={300}
                            animationOut={'slideOutDown'}
                            animationOutTiming={300}
                            isVisible={this.state.visible}
                            onBackdropPress={() => this.setState({ visible: false, barcode: '' })}
                            onSwipeComplete={() => this.setState({ visible: false , barcode: ''})}>
                            <View style={{flex:1}}>
                                <View style={styleReward.modalConfirm}>
                                    <View style={styleReward.modalConfirmContent}>
                                        <Text style={styleReward.txtTitlePopup}>XÁC NHẬN CHUYỂN ĐỔI VOUCHER</Text>
                                        <Text style={styleReward.txtValueTopUp}>{formatMoney(this.state.amount)} đ</Text>

                                        <View style={styleReward.boxBtnPopup}>
                                            <TouchableOpacity style={styleReward.btnPopupCancel} activeOpacity={0.8} onPress={() => this.handleExchangeVoucher('cancel')}>
                                                <Text style={styleReward.txtCancel}>Huỷ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styleReward.btnPopupExchange} activeOpacity={0.8} onPress={() => this.handleExchangeVoucher('agree')}>
                                                <Text style={styleReward.txtBtnExchange}>Đổi Ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
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
    exchangeVoucher,
    checkExchange
})(RedemptionContainer);
