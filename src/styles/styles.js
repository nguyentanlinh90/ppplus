import {StyleSheet, Platform, Dimensions} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getSizeNav, getSizeTopNav} from '../api/helpers';

export default StyleSheet.create({
  body: {
    margin: 0,
    padding: 0,
    height: '100%',
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
  },
  tabNavigator: {
    backgroundColor:'#fff',
    alignItems:'center',
    ...Platform.select({
      ios: {
        height: 70,
      },
      android: {
        height: 60,
      },
    }),
  },
  mainContent: {
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: '35%',
    paddingTop: 5,
    paddingLeft: 10,
    backgroundColor: '#0eb1ee',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    ...Platform.select({
      ios: {
        zIndex: 999,
      },
    }),
  },
  menu: {
    width: 50,
  },
  headerBack: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e2e2',
    alignItems: 'center',
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        zIndex: 999,
      },
    }),
  },
  preview: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android: {
        height: 1,
      },
    }),
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0eb1ee',
  },
  defaultContainer: {
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        height: 130,
      },
      android: {
        height: 100,
      },
    }),
  },
  defaultTextContainer: {
    height: 90,
    marginLeft: 10,
    ...Platform.select({
      ios: {
        marginTop: 45,
      },
      android: {
        marginTop: 30,
      },
    }),
  },
  defaultContainerStep2: {
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        height: 190,
      },
      android: {
        height: 160,
      },
    }),
  },
  defaultTextContainerStep2: {
    height: 90,
    marginTop: 52,
    marginLeft: 20,
  },
  defaultContainerLogin: {
    paddingLeft: 10,
    paddingEnd:20,
    height: 120,
    paddingTop: 20,
  },
  defaultTextContainerLogin: {
    height: 100,
    marginTop: 30,
    marginLeft: 20,
    marginEnd:20
  },
  defaultContainerRedeem: {
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        height: 130,
      },
      android: {
        height: 100,
      },
    }),
  },
  defaultTextContainerRedeem: {
    height: 70,
    marginTop: 22,
    marginLeft: 20,
  },

  navMain: {
    backgroundColor: '#fff',
    width: '100%',
    margin: 0,
    bottom: 0,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        height: getSizeNav(),
        marginTop: getSizeTopNav(),
      },
      android: {
        height: getSizeNav(),
        // paddingTop: 10,
        // marginTop: 10,
      },
    }),
  },
  textNavMainActive: {
    fontSize: 16,
    color: '#0096FF',
    marginTop: 3,
    marginBottom: 10,
    fontWeight: '500',
  },
  textNavMain: {
    fontSize: 16,
    color: '#949698',
    fontWeight: '500',
    marginTop: 3,
    marginBottom: 10,
  },
  imgNav: {
    width: 25,
    height: 25,
    backgroundColor: 'transparent',
  },
  circleMenu: {
    width: 5,
    height: 5,
    borderRadius: 100 / 2,
    backgroundColor: '#F0532D',
    marginTop:5
  },
  cbbModalIos: {
    borderWidth: 0,
    marginTop: -7,
    height: 50,
  },
  stylesProps: {
    width: '100%',
    height: 40,
  },
  stylesInput: {
    width: '100%',
    marginLeft: 10,
    height: 50,
    fontSize: 12,
    color: '#949698',
    textAlign: 'left',
    justifyContent: 'center',
  },
  stylePickerAndroid: {
    top: -8,
  },
  iconArrowDown: {
    paddingRight: 14,
    color: '#fff',
    marginTop: -30,
    fontSize: 9,
    alignItems: 'flex-end',
  },
  boxBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtRowSupport: {
    fontSize: 18,
    color: '#0093EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  boxSupport: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  boxFooter: {
    ...Platform.select({
      ios: {
        marginTop: 40,
      },
    }),
  },
  btnClose: {
    marginLeft: 10,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
