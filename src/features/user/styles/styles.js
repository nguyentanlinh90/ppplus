import {StyleSheet, Platform, Dimensions} from 'react-native';

export default StyleSheet.create({
  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonDisableText: {
    color: '#2B2B2B',
  },

  buttonContinue: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonDisableContinue: {
    borderRadius: 6,
    backgroundColor: '#D8D8D8',
  },

  txtCreateAccount: {
    paddingBottom: 20,
    fontSize: 24,
    color: '#1C1C1C',
    fontWeight: 'bold',
    lineHeight: 29,
  },
  txtTitleField: {
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
    justifyContent:'center'
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
  buttonContinue: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
