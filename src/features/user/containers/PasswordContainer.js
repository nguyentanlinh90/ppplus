import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownAlert from "react-native-dropdownalert";
import {changePassword} from '../actions/index';
import {changeMsgCode} from '../../home/actions/index';
import stylesHome from "../../home/styles/styles";
import LinearBox from "../../../components/LinearBox";

export class PasswordContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            showCurrentPassword: true,
            showNewPassword: true,
            showConfirmPassword: true,
        };

        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangePassword =()=> {
        let flag = true;

        if(this.state.currentPassword.trim() == ''){
            flag = false;
            this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng nhập mật khẩu cũ.');
        }
        if(this.state.newPassword.trim() == ''){
            flag = false;
            this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng nhập mật khẩu mới.');
        }
        if(this.state.confirmPassword.trim() == ''){
            flag = false;
            this.dropdown.alertWithType('error', 'Lỗi', 'Vui lòng nhập xác nhận mật khẩu.');
        }

        if(this.state.newPassword.trim() !== this.state.confirmPassword.trim()){
            flag = false;
            this.dropdown.alertWithType('error', 'Lỗi', 'Mật khẩu xác nhận không đúng.');
        }

        if(flag){
            const {changePassword, user} = this.props;
            // call api change password
            changePassword(this.state.currentPassword, this.state.newPassword, user);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.msg_code == 'change_pass_success'){
            this.dropdown.alertWithType('success', 'Thành công', 'Cập nhật mật khẩu thành công.');
            this.setState({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            nextProps.changeMsgCode('');
        }else if(nextProps.msg_code == 'change_pass_error'){
            this.dropdown.alertWithType('error', 'Lỗi', 'Có lỗi xảy ra. Vui lòng kiểm tra lại.');
            nextProps.changeMsgCode('');
        }else if(nextProps.msg_code == 1001){
            this.dropdown.alertWithType('error', 'Lỗi', 'Có lỗi xảy ra. Vui lòng kiểm tra lại.');
            nextProps.changeMsgCode('');
        }else if(nextProps.msg_code == 1002){
            this.dropdown.alertWithType('error', 'Lỗi', 'Mật khẩu hiện tại không đúng. Vui lòng kiểm tra lại.');
            nextProps.changeMsgCode('');
        }
    }

    render() {

        return (
            <View style={[styles.body, {backgroundColor: '#fff'}]}>
                <StatusBar backgroundColor="#0085E1" barStyle="light-content"/>
                <LinearGradient colors={['#0085E1','#0097F2']} style={styleUser.header}>
                    <View style={styleUser.boxHeader}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.btnClose} onPress={() => this.props.navigation.goBack()}>
                            <Icon name={'chevron-left'} color={'#fff'} size={35}/>
                        </TouchableOpacity>
                        <View style={styleUser.boxLbPhone}>
                            <Text style={styleUser.lbPhone}>Đổi mật khẩu</Text>
                        </View>
                    </View>
                </LinearGradient>
                <DropdownAlert ref={ref => this.dropdown = ref} defaultContainer={styles.defaultContainerLogin} defaultTextContainer={styles.defaultTextContainerLogin}/>
                <SafeAreaView>
                    <View style={{padding: 20}}>
                        <View style={{paddingTop: '30%'}}>
                            <View style={styleUser.groupInputPwd}>
                                <Icon name={'lock'} size={24} color={'#dfdfdf'} style={styleUser.groupIconPwd}/>
                                <TextInput
                                    style={styleUser.placeHolder}
                                    onChangeText={(text) => this.setState({currentPassword: text})}
                                    value={this.state.currentPassword}
                                    clearButtonMode={'always'}
                                    placeholder={'Nhập mật khẩu cũ'}
                                    name="current_password"
                                    secureTextEntry = {this.state.showCurrentPassword}
                                />
                                <Icon style={styles.icon}
                                      name={'eye-outline'}
                                      size={28}
                                      color={'#d2bac7'}
                                      onPress={() => this.setState({showCurrentPassword: !this.state.showCurrentPassword})}
                                />
                            </View>
                            <View style={styleUser.groupInputPwd}>
                                <Icon name={'lock'} size={24} color={'#dfdfdf'} style={styleUser.groupIconPwd}/>
                                <TextInput
                                    style={styleUser.placeHolder}
                                    onChangeText={(text) => this.setState({newPassword: text})}
                                    value={this.state.newPassword}
                                    clearButtonMode={'always'}
                                    placeholder={'Nhập mật khẩu mới'}
                                    name="new_password"
                                    secureTextEntry = {this.state.showNewPassword}
                                />
                                <Icon style={styles.icon}
                                      name={'eye-outline'}
                                      size={28}
                                      color={'#d2bac7'}
                                      onPress={() => this.setState({showNewPassword: !this.state.showNewPassword})}
                                />
                            </View>
                            <View style={styleUser.groupInputPwd}>
                                <Icon name={'lock'} size={24} color={'#dfdfdf'} style={styleUser.groupIconPwd}/>
                                <TextInput
                                    style={styleUser.placeHolder}
                                    onChangeText={(text) => this.setState({confirmPassword: text})}
                                    value={this.state.confirmPassword}
                                    clearButtonMode={'always'}
                                    placeholder={'Xác nhận mật khẩu mới'}
                                    name="confirm_password"
                                    returnKeyType="go"
                                    secureTextEntry = {this.state.showConfirmPassword}
                                />
                                <Icon style={styles.icon}
                                      name={'eye-outline'}
                                      size={28}
                                      color={'#d2bac7'}
                                      onPress={() => this.setState({showConfirmPassword: !this.state.showConfirmPassword})}
                                />
                            </View>
                        </View>
                        <View style={styleUser.boxSavePwd}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onChangePassword()} style={styleUser.btnSavePwd}>
                                <LinearBox styles={stylesHome.btnUpdateAvatar}>
                                    <Text style={styleUser.txtBtnSave}>{'Lưu'}</Text>
                                </LinearBox>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: state,
        user: state.user.user,
        msg_code: state.home.msg_code
    }
}

export default connect(mapStateToProps, {
    changePassword,
    changeMsgCode
})(PasswordContainer);
