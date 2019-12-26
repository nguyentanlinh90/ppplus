import React, {Component, Fragment} from 'react'
import {View, Text, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import styleIncome from '../styles/styles';
import {formatRevenue} from '../../../api/helpers';
export default class Description extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {revenue} = this.props;
        let percent = 0;
        let totalReward = 0;
        if(revenue.revenues < revenue.target){
            if(revenue.revenues > 0){
                const value  = revenue.revenues/revenue.target;
                percent = Math.round(value.toFixed(3) * 36);
            }
        }
        if(revenue.revenues >= revenue.target && revenue.target > 0){
            totalReward = (revenue.revenues * revenue.reward_scheme.reward_percentage)/100;
        }
        return (
            <View style={{paddingRight: 10}}>
                <View style={styleIncome.boxMonth}>
                    <View style={{width: '100%'}}>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <Text style={styleIncome.txtMonth}>Tháng {revenue.month}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            {(revenue.target == 0)?
                                (
                                    <Fragment>
                                        <View style={styleIncome.blockMoneyLeftLess}></View>
                                        <View style={[styleIncome.boxTargetNone,{marginLeft:40}]}>
                                            <Text style={styleIncome.txtTarget}>0</Text>
                                        </View>
                                        <View style={styleIncome.blockMoneyLeftLess1}>
                                            <Text style={styleIncome.txtBlockMoney}>{formatRevenue(revenue.revenues)}</Text>
                                        </View>
                                    </Fragment>
                                ):null
                            }
                            {(revenue.revenues > revenue.target && revenue.target > 0)  ?
                                (
                                    <Fragment>
                                        <View style={styleIncome.blockMoney}></View>
                                        <View style={styleIncome.boxTarget}>
                                            <Text style={styleIncome.txtTarget}>{formatRevenue(revenue.target)}</Text>
                                        </View>
                                        <View style={styleIncome.blockMoney1}>
                                            <Text style={styleIncome.txtBlockMoney}>{formatRevenue(revenue.revenues)}</Text>
                                        </View>
                                    </Fragment>
                                ):null
                            }

                            {(revenue.revenues == revenue.target && revenue.target > 0)  ?
                                (
                                    <Fragment>
                                        <View style={styleIncome.blockMoneyLeftLess}></View>
                                        <View style={[styleIncome.boxTarget,{marginLeft:40}]}>
                                            <Text style={styleIncome.txtTarget}>{formatRevenue(revenue.target)}</Text>
                                        </View>
                                        <View style={styleIncome.blockMoneyLeftLess1}>
                                            <Text style={styleIncome.txtBlockMoney}>{formatRevenue(revenue.revenues)}</Text>
                                        </View>
                                    </Fragment>
                                ):null
                            }
                            {(revenue.revenues < revenue.target && revenue.target > 0)  ?
                                (
                                    <Fragment>
                                        <View style={styleIncome.blockMoneyLeftLess2}></View>
                                        <View style={styleIncome.boxTarget}>
                                            <Text style={styleIncome.txtTarget}>{formatRevenue(revenue.target)}</Text>
                                        </View>
                                        {(revenue.revenues == 0)?
                                            (
                                                <Text style={[styleIncome.txtBlockMoney,styleIncome.txtNoneRevenue]}>0</Text>
                                            ):
                                            (
                                                <Fragment>
                                                    <View style={[styleIncome.blockMoneyRightLess2,{width: percent+'%'}]}></View>
                                                    <Text style={[styleIncome.txtBlockMoney,styleIncome.txtNoneRevenue]}>{formatRevenue(revenue.revenues)}</Text>
                                                </Fragment>
                                            )
                                        }
                                    </Fragment>
                                ):null
                            }
                            {(totalReward > 0) ?
                                (
                                    <View style={styleIncome.boxRewardLeft}>
                                        <Text style={styleIncome.txtValueReward}>{formatRevenue(totalReward)}</Text>
                                    </View>
                                ):
                                (
                                    <View style={styleIncome.boxRewardLeftNoValue}>
                                        <Text style={styleIncome.txtValueReward}>0</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
