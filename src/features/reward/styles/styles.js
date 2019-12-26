import {StyleSheet, Platform, Dimensions} from 'react-native';
import {getSizeCallSupport} from '../../../api/helpers';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  txtTitle: {
    marginBottom: -15,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 35,
    ...Platform.select({
      android: {
        paddingTop: 10,
      },
    }),
  },
  boxReward: {
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCoin: {
    width: 20,
    height: 25,
  },
  txtCoin: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0097F2',
  },
  boxHeader: {
    width: '100%',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 20,
      },
    }),
  },
  groupReward: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 20,
    height: 60,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxGotit: {
    backgroundColor: '#fff',
    marginTop: 30,
    borderRadius: 6,
    ...Platform.select({
      ios: {
        height: 150,
      },
      android: {
        height: 170,
      },
    }),
  },
  txtGotit: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  boxTxtGotit: {
    width: '53%',
    marginLeft: 25,
  },
  boxIconGotit: {
    width: '10%',
    marginLeft: 10,
  },
  boxGotitCenter: {
    width: '25%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  btnGotit: {
    backgroundColor: '#CDEBFF',
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  txtBtnGotit: {
    color: '#0097F9',
    fontSize: 14,
  },
  dash: {
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    width: '95%',
    height: 0.5,
    flexDirection: 'row',
  },
  boxCgv: {
    height: 80,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 6,
  },
  txtDesCgv: {
    fontSize: 13,
    marginTop: 5,
  },
  boxTxtCgv: {
    width: '53%',
    marginLeft: 25,
  },
  txtCgv: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  imageBrand: {
    width: 80,
    height: 75,
  },
  boxImageBrand: {
    width: '21%',
    height: 62,
    borderRadius: 6,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
  },
  txtBtnExchange: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalConfirm: {
    backgroundColor: '#fff',
    marginTop: '60%',
    borderRadius: 6,
    alignItems: 'center',
  },
  modalConfirmContent: {
    marginTop: '10%',
    width: '100%',
    height: 120,
  },
  txtTitlePopup: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5F5F5F',
    textAlign: 'center',
    alignItems: 'center',
  },
  txtValueTopUp: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#0096FF',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  boxBtnPopup: {
    flexDirection: 'row',
    height: 50,
  },
  btnPopupExchange: {
    width: '50%',
    backgroundColor: '#0097F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 6,
  },
  btnPopupCancel: {
    width: '50%',
    backgroundColor: '#E7F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 6,
  },
  txtCancel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxCoinLeft: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  boxCoinRight: {
    width: '40%',
    alignItems: 'center',
  },
  boxMyVoucher: {
    backgroundColor: '#CDEBFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: '100%',
    marginRight: 20,
    borderRadius: 20,
  },
  btnExchangeDisable: {
    marginTop: 20,
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfdfdf',
  },
  lbBrand: {
    fontSize: 15,
    color: '#6D6D6D',
  },
  btnToggle: {
    marginTop: 4,
    backgroundColor: '#F3F8FF',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    ...Platform.select({
      ios: {
        height: 50,
        width: '15%',
      },
      android: {
        height: 55,
        width: '15%',
      },
    }),
  },
  txtToggle: {
    color: '#A5B5C8',
    fontSize: 14,
  },
  boxGotitToggle: {
    backgroundColor: '#fff',
    marginTop: 30,
    borderRadius: 6,
  },
  boxImageBrandToggle: {
    width: '22%',
    height: 70,
    borderRadius: 6,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#f9fafb',
  },
  txtCate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C4C4C4',
  },
});
