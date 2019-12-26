import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text
} from 'react-native';
import styles from '../../../styles/styles';
import styleUser from '../styles/styles';
import {changeMsgCode} from "../../home/actions";
import Spinner from "react-native-loading-spinner-overlay";
import Back from "../../../components/Back";
import {fetchVoucher} from '../actions/index';
import Voucher from "../components/Voucher";
import SelectBox from "../../../components/SelectBox";

class HistoryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            vouchers: [],
            branch_id: '',
            branch_name: '',
            dataSelect:[
                {key: '', value: 'Tất cả voucher'},
                {key: 'gotit', value: 'Voucher Got It'},
                {key: 'cgv', value: 'Voucher CGV'},
                {key: 'bigc', value: 'Voucher BigC'}
            ]
        };

        this.fetchData = this.fetchData.bind(this);
        this.onChangeBox = this.onChangeBox.bind(this);
    }

    onChangeBox =(key, label)=>{
        this.setState({branch_id:key, branch_name:label});
        if(key == ''){
            this.setState({vouchers: this.props.vouchers})
        }else{
            const data = [];
            for (let i = 0 ; i < this.props.vouchers.length; i++){
                if(this.props.vouchers[i].branch == key){
                    data.push(this.props.vouchers[i]);
                }
            }
            this.setState({vouchers: data});
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData =()=>{
        const {user, fetchVoucher} = this.props;
        fetchVoucher(user);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.msg_code == 'fetch_voucher_success'){
            this.setState({vouchers: nextProps.vouchers, isLoading: false});
            nextProps.changeMsgCode('');
        }else if(nextProps.msg_code == 'fetch_voucher_fail'){
            this.setState({isLoading: false});
            nextProps.changeMsgCode('');
        }
    }

    render() {
        const rows =[];

        if(this.state.vouchers.length != 0) {
            for (let i = 0; i < this.state.vouchers.length; i++) {
                rows.push(
                    <Voucher voucher = {this.state.vouchers[i]} key ={i} branch={this.state.vouchers[i].branch}/>
                );
            }
        }
        return (
            <View style={styles.body}>
                <Spinner visible={this.state.isLoading}  textContent={'Loading...'} color={'white'} size={'large'} textStyle={{color:'#fff'}}/>
                <SafeAreaView style={{flex:1}}>
                    <View style={styleUser.mainContent}>
                        <View style={styleUser.boxHistory}>
                            <Back navigation = {this.props.navigation} title={'Voucher Của Bạn'} styleTitle={styleUser.styleTitle}/>
                        </View>
                        <View style={styleUser.boxHistorySearch}>
                            <SelectBox
                                data={this.state.dataSelect}
                                onChangeBox={this.onChangeBox}
                                index={this.state.branch_id}
                                value={this.state.branch_name}
                                placeholder={'Tất cả voucher'}
                                stylesProps={styles.stylesProps}
                                stylesInput={styles.stylesInput}
                                styleIconArrowDown={styles.iconArrowDown}
                            />
                        </View>
                        <ScrollView style={{width:'100%', marginBottom:5}}>
                            {(this.state.vouchers.length != 0)?
                                (
                                    rows
                                )
                                :
                                (
                                    <Text style={styleUser.txtNotFound
                                    }>Không tìm thấy dữ liệu</Text>
                                )
                            }
                        </ScrollView>
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
    fetchVoucher
})(HistoryContainer);
