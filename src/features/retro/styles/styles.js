import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  boxIgnore: {
    flexDirection: 'column',

    ...Platform.select({
      ios: {
        marginTop: 50,
      },
      android: {
        marginTop: 20,
      },
    }),
  },
  txtIgnore: {
    textAlign: 'right',
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },

  boxImage: {},
  txtTitleContent: {
    textAlign: 'center',
    margin: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },

  txtContent: {
    textAlign: 'center',
    fontSize: 18,
    paddingStart: 20,
    paddingBottom: 20,
    paddingEnd: 20,
  },
  slide1: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  boxContent: {height: '30%'},
});
