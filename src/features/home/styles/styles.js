import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  getSizeLogo,
  getSizeImageHome,
} from '../../../api/helpers';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
export default StyleSheet.create({

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
  txtSearch: {
    flex: 1,
    color: '#d8d8d8',
    fontSize: 16,
    alignSelf: 'center',
    marginStart: 16,
  },
  groupContent: {
    width: '100%',
    backgroundColor: '#FEF5F3',
  },
  txtTitleGroupContent: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
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
    marginEnd: 16,
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
    marginBottom: 16,
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
    height: 44,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
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
  jobDetailViewLine: {
    height: 5,
    backgroundColor: '#d8d8d8',
    marginTop: 16,
    marginBottom: 16,
  },
  jobDetailBoxRequest: {
    flexDirection: 'row',
    height: 40,
    marginStart: 16,
    marginEnd: 16,
    alignItems: 'center',
  },
  jobDetailTxtTitleRequest: {color: '#757575', fontSize: 16, flex: 1},
  jobDetailTxtContentRequest: {color: '#1c1c1c', fontSize: 16, flex: 1},
  jobDetailLineRequest: {backgroundColor: '#757575', height: 0.2},
  jobDetailBoxButtonBack: {
    width: 60,
    height: 70,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobDetailBoxLocation: {
    fontSize: 16,
    color: '#757575',
    marginLeft: 5,
    flex: 1,
  },
  jobDetailIndicator: {
    width: 100,
    height: 5,
    backgroundColor: '#d8d8d8',
    marginBottom: 10,
    marginTop: 15,
    borderRadius: 30,
    alignSelf: 'center',
  },
  boxImgHeader: {
    height: Platform.OS === 'ios' ? getStatusBarHeight() + 57 : 57,
    width: '100%',
    position: 'absolute',
  },
});
