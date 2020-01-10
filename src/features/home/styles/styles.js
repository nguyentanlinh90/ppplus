import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  getSizeBoxRegulation,
  getSizeLogo,
  getSizeImageHome,
} from '../../../api/helpers';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  homeHeader: {
    ...Platform.select({
      ios: {
        height: 300,
      },
      android: {
        height: 270,
      },
    }),
  },
  homeTop: {
    flexDirection: 'row',
    marginRight: 10,
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
      android: {
        marginTop: 20,
      },
    }),
  },
  txtTime: {
    color: '#fff',
    fontSize: 14,
  },
  boxRevenue: {
    marginTop: 5,
    height: 115,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  boxVenueLeft: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#A6D0F1',
  },
  boxVenueRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtVenue: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 25,
    opacity: 0.69,
  },
  txtValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  boxBtnCamera: {
    width: '100%',
    marginBottom: 40,
    backgroundColor: '#fff',
  },
  txtUpdateAvatar: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnUpdateAvatar: {
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxBtnUpdateAvatar: {
    marginLeft: '20%',
    marginRight: '20%',
  },
  boxImage: {
    width: '100%',
    height: '100%',
  },
  boxIconCamera: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  hasImage: {
    flex: 1,
    position: 'absolute',
    zIndex: 10,
    marginTop: hp('86%'),
  },
  boxImagePG: {
    alignItems: 'center',
  },
  boxRegulation: {
    backgroundColor: '#fff',
    height: getSizeBoxRegulation(),
  },
  boxRegulationChild: {
    marginTop: 20,
    marginLeft: 10,
  },
  txtRegulation: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0097F2',
    marginBottom: 5,
  },
  boxRow: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  txtRow: {
    marginLeft: 15,
    fontSize: 14,
    color: '#1C1C1C',
  },
  boxLogoHome: {
    width: 200,
    height: getSizeLogo(),
  },
  boxImageHome: {
    width: '100%',
    height: '100%',
  },
  txtCoChe: {
    marginTop: -3,
    marginLeft: 5,
    fontSize: 14,
    color: '#1C1C1C',
    lineHeight: 25,
    flexWrap: 'wrap',
    textAlign: 'left',
    marginRight: 10,
  },
  boxIconUser: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: -10,
  },
  boxTimeLeft: {
    marginLeft: 20,
    width: '86%',
  },
  styleMenu: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  boxChangePwd: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f8f8f8',
    paddingBottom: 15,
    flexDirection: 'row',
  },
  btnChangePwd: {
    marginLeft: 22,
    flexDirection: 'row',
  },
  txtBoxMenu: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
  },
  boxLogout: {
    marginTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  txtLogout: {
    fontSize: 18,
    marginTop: 2,
    marginLeft: 10,
  },
  boxTargetParent: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
    marginBottom: 3,
  },
  boxMonth: {
    marginLeft: 10,
    marginTop: 10,
  },
  txtMonth: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  boxTargetChild: {
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '72%',
    flexDirection: 'row',
  },
  txtTarget: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  boxDoanhThu: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  boxIncomeChild: {
    width: '44%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtIncomeChild: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0097F2',
  },
  txtIncome: {
    color: '#848484',
    fontSize: 15,
    marginTop: 6,
  },
  boxReward: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxRewardChild: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRewardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC200',
  },
  txtReward: {
    color: '#848484',
    fontSize: 15,
    marginTop: 6,
  },
  boxRewardParent: {
    marginTop: 15,
    height: 70,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  txtTotalReward: {
    marginTop: 10,
    marginLeft: 10,
    color: '#848484',
    fontSize: 14,
  },
  boxCoin: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  boxBtnUse: {
    backgroundColor: '#CDEBFF',
    height: 38,
    width: '90%',
    borderRadius: 60,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxUse: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxModal: {
    backgroundColor: '#fff',
    height: 170,
    borderRadius: 8,
  },
  boxModalClose: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  txtLabelModal: {
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  groupBtnModal: {
    flexDirection: 'row',
    width: '100%',
    top: 30,
  },
  btnModalAgree: {
    width: '43%',
    marginRight: 10,
    marginLeft: 15,
    backgroundColor: '#0097F2',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  btnModalCancel: {
    width: '43%',
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#5793a6',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  viewHeader: {
    position: 'absolute',
    marginStart: 16,
    marginEnd: 16,
  },
  txtHeaderTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  txtHeaderDes: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
    marginTop: 10,
  },
  boxHeaderRegister: {
    backgroundColor: '#fff',
    borderRadius: 22,
    width: 120,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  txtHeaderRegister: {
    fontSize: 16,
    color: '#F0532D',
    fontWeight: 'bold',
  },
  boxSearch: {
    flexDirection: 'row',
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10,
  },
  inputSearch: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
  },
  buttonFilter: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    marginStart: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icFilter: {
    width: 24,
    height: 24,
  },
  txtInputSearch: {
    flex: 1,
    marginStart: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  groupContent: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FEF5F3',
  },
  txtTitleGroupContent: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  txtInfoJob: {
    flex: 1,
    fontSize: 14,
    color: '#757575',
  },
  imgInfoJob: {
    width: 18,
    height: 18,
    marginEnd: 5,
  },
  jobHotItemContainer: {
    width: 200,
    borderRadius: 6,
    marginEnd: 10,
    margin: 1,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  jobFollowLocationContainer: {
    borderRadius: 6,
    borderColor: '#F0532D',
    borderWidth: 1,
    padding: 16,
    marginStart: 16,
    marginEnd: 16,
    marginBottom: 10,
  },
  jobFollowLocationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobFollowLocationTxtDetail: {color: '#1c1c1c', fontSize: 16, marginLeft: 10},
  jobDetailTop: {
    flexDirection: 'row',
    marginStart: 16,
    marginEnd: 16,
  },
  jobDetailLogo: {width: 84, height: 84, borderRadius: 6},
  jobDetailTopInfo: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginStart: 10,
    marginEnd: 10,
  },
  jobDetailLine: {
    height: 1,
    backgroundColor: '#d8d8d8',
    marginStart: 16,
    marginEnd: 16,
  },
  jobDetailTitle: {
    color: '#d8d8d8',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    marginBottom:16
  },
  jobDetailIconBoxSelect: {
    height: 50,
    borderColor: '#d8d8d8',
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingEnd: 10,
  },
  jobDetailBoxSubmit: {
    borderRadius: 22,
    borderStyle: 'solid',
    height: 50,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobDetailButtonSelectAddress: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingEnd: 25,
    paddingStart: 25,
  },
  viewUser: {
    flexDirection: 'row',
    marginStart: 16,
    height: 35,
    alignItems: 'center',
  },
  jobDetailViewLine:{
    height: 5,
    backgroundColor: '#d8d8d8',
    marginTop: 16,
    marginBottom: 16,
  },
  jobDetailBoxRequest:{
    flexDirection: 'row',
    height: 40,
    marginStart: 16,
    marginEnd: 16,
    alignItems:'center'
  },
  jobDetailTxtTitleRequest:{color: '#757575', fontSize: 16, flex: 1},
  jobDetailTxtContentRequest:{color: '#1c1c1c', fontSize: 16, flex: 1},
  jobDetailLineRequest:{backgroundColor: '#757575', height:0.2},

});
