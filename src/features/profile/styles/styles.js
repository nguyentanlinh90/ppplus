import {StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
export default StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: getStatusBarHeight(),
        marginBottom: 50,
      },
    }),
  },
  viewEdit: {
    alignSelf: 'flex-end',
  },
  viewCircleAvatar: {
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'center',
  },
  circleAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    position: 'absolute',
  },
  circleAvatarFill: {
    width: 95,
    height: 95,
    borderRadius: 95 / 2,
    position: 'absolute',
    backgroundColor: '#d8d8d8',
  },
  viewCamera: {
    width: 95,
    height: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
  },
  boxCamera: {
    width: 30,
    height: 30,
    marginTop: 78,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  name: {
    textAlign: 'center',
    color: '#1c1c1c',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewReward: {flexDirection: 'row', justifyContent: 'center'},
  boxReward: {
    backgroundColor: '#F0532D',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingStart: 20,
    paddingBottom: 10,
    paddingEnd: 20,
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  boxRewardStar: {width: 20, height: 20, marginEnd: 10},
  boxRewardTextReward: {color: '#fff', fontSize: 14},
  boxRewardTextPoint: {color: '#fff', fontSize: 14, fontWeight: 'bold'},
  boxItem: {
    height: 45,
    flexDirection: 'row',
    paddingStart: 14,
    alignItems: 'center',
  },
  boxItemTitle: {color: '#1c1c1c', fontSize: 16, marginStart: 10},
  boxItemIndicator: {backgroundColor: '#d8d8d8', height: 1, marginStart: 14},
  txtSave: {
    color: '#F0532D',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
  boxAddImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAddImage: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-evenly',
  },
  boxShowImage: {width: 80, height: 80},
  imageLoad: {width: '100%', height: '100%', borderRadius: 6},
  boxClose: {
    width: 25,
    height: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxButtonAdd: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBasicInfo: {
    flex: 1,
    color: '#d8d8d8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxTitleFill: {
    flexDirection: 'row',
    marginLeft: 16,
    marginEnd: 16,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  boxArrow: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxIndicatorFill: {
    backgroundColor: '#d8d8d8',
    height: 10,
  },
  groupContainer: {flexDirection: 'row', marginBottom: 20},
  boxBasicInfo: {flex: 1, marginEnd: 10},
  txtTitleBasicInfo: {
    color: '#757575',
    marginBottom: 5,
    marginTop: 10,
    fontSize: 16,
  },

  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    borderColor: '#d8d8d8',
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
    paddingEnd: 10,
  },
  txtInputContainer: {
    flex: 1,
    height: 44,
    borderColor: '#d8d8d8',
    borderWidth: 1,
    borderRadius: 6,
    paddingStart: 10,
    paddingEnd: 10,
    color: '#2b2b2b',
    fontSize: 16,
  },

  txtInputBasicInfo: {
    flex: 1,
    color: '#2b2b2b',
    fontSize: 16,
  },
  txtInBox: {
    flex: 1,
    fontSize: 16,
    color: '#757575',
  },
  btSelectGender: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingEnd: 25,
    paddingStart: 25,
  },
  popupLogoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  popupLogoutContent: {fontSize: 16, alignSelf: 'center', marginBottom: 30},
  popupLogoutButtonNo: {
    flex: 1,
    backgroundColor: '#F0932D',
    marginEnd: 20,
    borderRadius: 6,
  },
  popupLogoutButtonYes: {
    flex: 1,
    backgroundColor: '#F0932D',
    borderRadius: 6,
  },
  popupLogoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    padding: 10,
  },
  buttonSelectID: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FA6400',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSelectID: {
    color: '#FBFBFB',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 10,
  },
  boxSelect: {
    borderWidth: 1,
    borderColor: '#F0532D',
    borderRadius: 6,
    height: 300,
  },
  txtSelectStyle: {
    flex: 1,
    fontSize: 16,
    color: '#2B2B2B',
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoBoxSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 10,
  },
  txtViewSelect: {
    height: 44,
    color: '#000',
    fontSize: 16,
    paddingStart: 10,
    flex: 1,
    paddingTop: 14,
  },
  lineSelect: {
    height: 0.5,
    backgroundColor: '#d8d8d8',
    marginStart: 10,
    marginEnd: 10,
  },
  txtSelect: {
    color: '#2b2b2b',
    fontSize: 16,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 25,
  },
  boxID: {
    flexDirection: 'row',
    height: 108,
    marginTop: 10,
  },
  boxIDItem: {
    flex: 1,
  },
  boxIDItemImage: {
    height: '100%',
    width: '100%',
  },
  boxIDItemClose: {
    position: 'absolute',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  viewButtonSelectID: {
    flexDirection: 'row',
    height: 44,
    marginTop: 10,
    marginBottom: 10,
  },
  viewSelect: {
    borderWidth: 1,
    borderColor: '#F0532D',
    borderRadius: 6,
    height: 200,
  },
  viewSelectGender: {
    borderWidth: 1,
    borderColor: '#F0532D',
    borderRadius: 6,
  },
});
