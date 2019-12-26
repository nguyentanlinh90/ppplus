import { StyleSheet, Platform, Dimensions } from 'react-native';
import {getSizeCallSupport} from '../../../api/helpers';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContent:{
      height:'100%',
      padding:10
    },

    boxYear:{
        height: 40,
        width: 135,
        borderRadius: 20,
        backgroundColor: '#ECF8FF',
        padding: 8,
        marginTop: 12,
        flexDirection: 'row',
        alignItems:'center'
    },

    boxMonth: {
        marginTop: 20,
        width: '100%'
    },

    boxNewMonth: {
        height: 65,
        width: '45%',
        borderColor: '#848484',
        borderWidth: 1,
        borderRadius: 15
    },

    blockMoney: {
        backgroundColor: '#46BAFF',
        width: '30%',
        height: 25,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1,
        marginLeft:20
    },
    blockMoney1: {
        backgroundColor: '#46BAFF',
        width: '30%',
        height: 25,
        borderRadius: 15,
        position: 'absolute',
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 10,
        paddingTop: 2
    },

    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#0097F2',
        transform: [{rotate: '180deg'}],
        marginLeft: 10,
        marginTop: 2
    },

    txtTitle:{
        paddingTop: 20,
        marginBottom: -15,
        fontSize: 32,
        fontWeight:'bold',
        ...Platform.select({
            ios:{
                width:'60%'
            },
            android:{
                width:'63%'
            }
        })
    },

    txtYear:{
        fontSize: 18,
        lineHeight: 21,
        color: '#0097F2',
        textAlign: 'center',
        marginLeft: 8
    },

    txtMonth: {
        fontSize: 16,
        color: '#848484',
        textAlign: 'left',
        width: '30%'
    },

    txtMoney: {
        fontSize: 16,
        color: '#848484',
        textAlign: 'right',
        width: '20%'
    },

    txtTier: {
        fontSize: 16,
        color: '#848484',
        textAlign: 'right',
        width: '15%'
    },
    txtReward: {
        fontSize: 16,
        color: '#848484',
        width: '50%',
        marginLeft:20
    },

    txtBlockMoney: {
        color: 'white',
        fontSize: 14
    },

    boxTab:{
        height:40,
        width:'50%',
        alignItems:'center',
        justifyContent:'center'
    },

    boxTabActive:{
        height:40,
        paddingLeft:10,
        paddingRight:20,
        width:'100%',
        justifyContent:'center',
        borderBottomWidth:4,
        borderBottomColor:'#ECF8FF',
        borderStyle:'solid'
    },
    lbText:{
        fontSize:18,
        fontWeight:'bold'
    },
    boxTabParent:{
        flexDirection:'row',
        backgroundColor:'#fff',
        height:40,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    txtValueReward:{
        fontSize: 12,
        marginLeft:10,
        color: '#fff'
    },
    boxRewardLeft:{
        backgroundColor:'#FFC44C',
        width: '25%',
        marginRight:10,
        marginLeft:18,
        borderRadius:20,
        justifyContent:'center'
    },
    blockMoneyLeftLess: {
        backgroundColor: '#46BAFF',
        width: '25%',
        height: 25,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1,
        marginLeft:20
    },
    blockMoneyLeftLess1: {
        backgroundColor: '#46BAFF',
        width: '36%',
        height: 25,
        borderRadius: 15,
        position: 'absolute',
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 10,
        paddingTop: 2
    },
    blockMoneyLeftLess2: {
        backgroundColor: '#dfdfdf',
        width: '36%',
        height: 25,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1,
    },
    blockMoneyRightLess2: {
        backgroundColor: '#46BAFF',
        height: 25,
        borderRadius: 15,
        position: 'absolute',
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 10,
        paddingTop: 2
    },
    boxRewardLeftNoValue:{
        backgroundColor:'#dfdfdf',
        width: '25%',
        marginRight:10,
        marginLeft:18,
        borderRadius:20,
        justifyContent:'center'
    },
    boxTabIncome:{
        flexDirection:'row',
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:'#ececec'
    },
    txtTabIncome:{
        fontSize: 16,
        color: '#848484',
    },
    boxTargetNone:{
        backgroundColor: '#dfdfdf',
        width:'30%',
        marginLeft:20,
        justifyContent:'center',
        borderRadius:20
    },
    boxTarget:{
        backgroundColor: '#FFC44C',
        width:'30%',
        marginLeft:20,
        justifyContent:'center',
        borderRadius:20
    },
    txtTarget:{
        fontSize:12,
        color:'#fff',
        marginLeft:10
    },
    txtNoneRevenue:{
        position:'absolute',
        zIndex:20,
        marginLeft:10,
        marginTop:3
    }
});
