import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styleUser from '../styles/styles';
import styles from '../../../styles/styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {SCREEN_HOME} from "../../../api/screen";

export default class OTPContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            resendOtp: false,
            verifyOtp: false,
            code:'',
            password: '',
            timer: 30
        };
    }

    componentDidMount(){
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
                1000
        );
    }

    componentDidUpdate(){
        if(this.state.timer === 0){ 
            this.setState({resendOtp: true});
            clearInterval(this.interval);
            this.setState({timer: ''});
        }
      }
      
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    resetTimer =()=>{
        this.handleSendOtp();
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
        );
    }

    pinInput = React.createRef();
    
    _checkCode = (code) => {
        if (code != '') {
            this.setState({isActive: true});
        }   
    }
    
    gotoHome = () => {
        this.props.navigation.navigate(SCREEN_HOME);
    }

    render() {
        const { code, password } = this.state;
        return (
            <View style={[styles.body,{backgroundColor:'#ffffff'}]}>
                <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}}>
                    <View style={{height:'100%'}}>
                        <View style={[{height:'55%'}]}>
                            <View style={styleUser.boxLogin}>
                                <View style={{paddingTop: '35%', paddingLeft:10, paddingRight:10}}>
                                    <Text style={styleUser.txtLogin}>Mã OTP</Text>
                                    <Text style={[ styleUser.txtOTP, {marginBottom: 20, marginTop: -10}]}>
                                        Mã OTP sẽ được gửi về số điện thoại
                                    </Text>
                                    <SmoothPinCodeInput
                                        cellStyle={{
                                            borderBottomWidth: 2,
                                            borderColor: 'gray',
                                        }}
                                        cellStyleFocused={{
                                            borderColor: 'black',
                                        }}
                                        value={code}
                                        onTextChange={code => this.setState({ code })}
                                        onFulfill={this._checkCode}
                                    />
                                    
                                        {(this.state.resendOtp) ?
                                        (
                                            <View style={{ flexDirection: 'row', marginTop: 10,
                                                marginBottom: 20
                                            }}>
                                                <Text style={[styleUser.txtOTP, {color: '#0097F2'}]}>
                                                    Gửi lại mã {''}
                                                </Text>
                                                <Text style={styleUser.txtOTP}>
                                                    sau {''}
                                                </Text>
                                                <Text style={styleUser.txtOTP}>
                                                    0s
                                                </Text>
                                            </View>
                                        )
                                        :
                                        (
                                            <View style={{ flexDirection: 'row', marginTop: 10,
                                                marginBottom: 20
                                            }}>
                                                <Text style={styleUser.txtOTP}>
                                                    Gửi lại mã sau {''}
                                                </Text>
                                                <Text style={[styleUser.txtOTP, {color: '#0097F2'}]}>
                                                    {this.state.timer}s
                                                </Text>
                                            </View>
                                        )
                                    }
                                        
                                    
                            
                                    {(this.state.isActive) ?
                                        (
                                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.gotoHome()}>
                                                <LinearGradient colors={['#0045A5', '#0085E1' ,'#0097F2']} useAngle={true} angle={-90} style={styleUser.buttonContainer}>
                                                    <Text style={styleUser.buttonText}>Đăng nhập</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        )
                                        :
                                        (
                                            <View style={styleUser.buttonDeactiveContainer} >
                                                <Text style={styleUser.buttonText}>Đăng nhập</Text>
                                            </View>
                                        )
                                    }
                                    
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
