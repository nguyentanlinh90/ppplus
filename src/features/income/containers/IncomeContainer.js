import React, {Component} from 'react'
import {View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList} from 'react-native';
import styles from '../../../styles/styles';
import styleIncome from '../styles/styles';
import Footer from "../../../components/footer/Footer";
import {connect} from "react-redux";
import {changeMsgCode} from "../../home/actions";
import MonthScreen from '../components/MonthScreen';

class IncomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab:1
        }
    }

    render() {
        const {revenue} = this.props;
        return (
            <View style={styles.body}>
                <SafeAreaView style={styles.container}>
                    <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:10}}>
                        <Text style={styleIncome.txtTitle}>Doanh Thu</Text>
                        <View style={styleIncome.boxYear}>
                            <Text style={styleIncome.txtYear}>
                                Năm 2019
                            </Text>
                            <View style={styleIncome.triangle}></View>
                        </View>
                    </View>
                    <View style={styleIncome.boxTabParent}>
                        <TouchableOpacity  activeOpacity={1} style={(this.state.tab == 1) ? [styleIncome.boxTabActive,{borderColor:'#dfdfdf'}]: [styleIncome.boxTab,{borderColor:'#dfdfdf'}]} onPress={() => this.setState({tab:1})}>
                            <Text style={styleIncome.lbText}>Tháng</Text>
                        </TouchableOpacity>
                        {/*<TouchableOpacity activeOpacity={1} style={(this.state.tab == 2) ? [styleIncome.boxTabActive]: [styleIncome.boxTab,{borderColor:'#dfdfdf'}]} onPress={() => this.setState({tab:2})}>*/}
                        {/*    <Text style={styleIncome.lbText}>Quý</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <View style={styleIncome.boxTabIncome}>
                        <View style={{width:'40%', marginLeft:10}}>
                            <Text style={styleIncome.txtTabIncome}>Doanh thu</Text>
                        </View>
                        <View style={{width:'30%',}}>
                            <Text style={styleIncome.txtTabIncome}>Chỉ tiêu</Text>
                        </View>
                        <View style={{width:'30%'}}>
                            <Text style={styleIncome.txtTabIncome}>Tiền thưởng</Text>
                        </View>
                    </View>
                    {(this.state.tab == 1) ?
                        (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                legacyImplementation={false}
                                data={revenue.revenue_month}
                                horizontal={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <View style={{paddingLeft:10, paddingRight:10}}>
                                        <MonthScreen revenue={item} tab={this.state.tab}/>
                                    </View>
                                }
                            />
                        ):
                        (
                            null
                        )
                    }
                </SafeAreaView>
                <Footer page={'income'} navigation={this.props.navigation}/>
            </View>
        );
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
    changeMsgCode
})(IncomeContainer);
