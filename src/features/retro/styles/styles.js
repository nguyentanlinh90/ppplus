import {StyleSheet} from 'react-native';

export const dotStyle = function(isPageSelect) {
  return {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: isPageSelect ? '#F0532D' : '#F6C8A1',
    marginEnd: 10,
  };
};
export default StyleSheet.create({
  txtIgnore: {
    fontSize: 16,
    color: '#2b2b2b',
    fontWeight: 'bold',
  },

  txtTitleContent: {
    textAlign: 'center',
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },

  txtContent: {
    textAlign: 'center',
    fontSize: 16,
    paddingStart: 20,
    paddingBottom: 20,
    paddingEnd: 20,
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonLogin: {
    height: 40,
    marginStart: 20,
    marginEnd: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLogin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  txtCreateAccount: {
    color: '#F0532D',
  },
  imagePage: {
    width: '100%',
    height: '100%',
  },
});
