import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  buttonContinue: {
    borderRadius: 5,
    borderColor: '#b4b8c7',
    borderStyle: 'solid',
    height: 50,
    marginTop: 30,
    paddingVertical: 15,
  },

  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    lineHeight: 24,
  },

  txtCreateAccount: {
    paddingBottom: 20,
    fontSize: 24,
    color: '#1C1C1C',
    fontWeight: 'bold',
    lineHeight: 29,
  },
  txtNumberPhone: {
    paddingBottom: 5,
    fontSize: 16,
    color: '#757575',
    lineHeight: 19,
  },
  groupInput: {
    borderColor: '#E6E6E6',
    height: 50,
    borderRadius: 6,
    marginBottom: 20,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
  },

  boxLogin: {
    paddingLeft: 16,
    paddingRight: 16,
    height: '100%',
    justifyContent: 'center',
  },
  inputLogin: {
    height: 48,
    flex: 1,
    fontSize: 19,
    paddingStart: 10,
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        paddingTop: 16,
      },
    }),
  },
  boxShowPass: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputCreateAccount: {
    height: 48,
    width: '88%',
    fontSize: 19,
    paddingStart: 10,
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        paddingTop: 16,
      },
    }),
  },
  viewAgree: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  boxCheckBox: {
    height: 24,
    width: 24,
    marginEnd: 7,
    backgroundColor: '#F0532D',
  },
  textAgree: {
    textDecorationLine: 'underline',
    color: '#333333',
    fontSize: 16,
    marginStart: 5,
  },
  textForgetPass: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    color: '#F0532D',
    fontSize: 16,
    padding: 5,
  },
  textNotYetAccount: {
    marginTop: 17,
    color: '#F0532D',
    fontSize: 16,
    alignSelf: 'center',
    padding: 5,
  },
  textTitleCallSp: {
    textAlign: 'center',
    color: '#1C1C1C',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  txtDesCallSp: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
    color: '#757575',
  },
  textSendOTPAgain: {
    marginStart: 5,
    color: '#F0532D',
    fontSize: 16,
  },
  footerLogin: {
    ...Platform.select({
      ios: {
        height: '45%',
        paddingTop: '48%',
      },
      android: {
        paddingTop: hp('24%'),
        height: '5%',
      },
    }),
    marginBottom: 0,
  },
  userLb: {
    paddingTop: 10,
    width: '90%',
    fontSize: 18,
    color: '#AAAAAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userRow: {
    width: '90%',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  boxLbPhone: {
    width: '67%',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  lbPhone: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  boxHeader: {
    width: '100%',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
      android: {
        marginTop: 15,
      },
    }),
  },
  header: {
    ...Platform.select({
      ios: {
        height: 110,
      },
      android: {
        height: 70,
      },
    }),
  },
  placeHolder: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    height: 44,
    borderRadius: 6,
    width: '82%',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  groupInputPwd: {
    borderColor: '#F0F0F0',
    height: 50,
    borderRadius: 6,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 14,
  },
  groupIconPwd: {
    alignItems: 'center',
    width: '8%',
    paddingLeft: 7,
    paddingTop: -1,
  },
  txtBtnSave: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  btnSavePwd: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  boxSavePwd: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  boxLogo: {
    height: 77,
    width: 136,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  boxBarcode: {
    width: '100%',
    ...Platform.select({
      ios: {
        height: 130,
      },
      android: {
        height: 140,
      },
    }),
  },
  txtCode: {
    marginTop: -5,
  },
  groupCode: {
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupCodeModal: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '50%',
    marginBottom: '50%',
    borderRadius: 6,
  },
  boxVoucherLeft: {
    flexDirection: 'row',
    marginLeft: -20,
  },
  content: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    height: '100%',
  },
  txtExchange: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: 19,
    marginTop: 10,
    marginBottom: 10,
  },
  txtValue: {
    height: 45,
    borderWidth: 1,
    borderRadius: 11,
    borderColor: '#0097F2',
    borderStyle: 'solid',
    textAlign: 'center',
    fontSize: 18,
  },
  txtPrice: {
    fontSize: 16,
    color: '#fff',
    height: 19,
    fontWeight: 'bold',
    lineHeight: 19,
  },
  boxPrice: {
    marginTop: 20,
    width: '30%',
    height: 40,
    marginLeft: 4,
    marginRight: 10,
    backgroundColor: '#0093EE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnExchange: {
    marginTop: 20,
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDescription: {
    fontSize: 16,
    color: '#333333',
  },
  styleTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  groupStatus: {
    marginTop: '50%',
  },
  imgTopup: {
    width: 150,
    height: 150,
  },
  txtTopup: {
    marginTop: 30,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxBtnTopup: {
    marginTop: 10,
  },
  btnTopup: {
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnTopup: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  txtGoHome: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#0097F2',
  },
  txtExchangeSuccess: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
  },
  iconBranch: {
    marginLeft: 20,
  },
  mainContent: {
    height: '100%',
    padding: 5,
  },
  boxHistory: {
    height: 40,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
  },
  boxHistorySearch: {
    marginBottom: 30,
    backgroundColor: '#fff',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 6,
    ...Platform.select({
      ios: {
        height: 38,
      },
      android: {
        height: 50,
      },
    }),
  },
  txtNotFound: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  txtTelco: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  boxTelco: {
    height: 55,
    width: 55,
    borderRadius: 6,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  imgTelco: {
    width: '80%',
    height: '50%',
    marginLeft: 10,
    marginRight: 10,
  },
  imgCallSp: {
    alignContent: 'center',
    width: 156,
    height: 144,
    marginTop: 10,
    marginBottom: 10,
  },
  lbTelco: {
    fontSize: 10,
  },
  groupTelco: {
    width: '20%',
    alignItems: 'center',
  },
  boxTelcoActive: {
    height: 55,
    width: 55,
    borderRadius: 6,
    borderColor: '#0097F2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
