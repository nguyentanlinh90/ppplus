import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    marginStart: 16,
    marginEnd: 16,
    flex: 1,
  },
  title: {
    marginTop: 10,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  viewFill: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 25,
    marginBottom:25
  },
  titleContent: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 25,
  },
  flexRow: {flexDirection: 'row'},
  boxInput: {
    flex: 1,
    height: 46,
    borderRadius: 6,
    borderColor: '#2b2b2b',
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  txtInput: {
    paddingEnd: 5,
    paddingStart: 5,
    color: '#2b2b2b',
    fontSize: 16,
  },
  boxSelect: {
    width: '100%',
    height: 44,
    borderColor: '#d8d8d8',
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
    paddingEnd: 10,
  },
  txtSelect: {color: '#2b2b2b', fontSize:16, flex: 1},
  viewSelect:{
    borderWidth: 1,
    borderColor: '#F0532D',
    borderRadius: 6,
    height: 200,
  },
  txtViewSelect:{
    height: 44,
    color: '#000',
    fontSize: 16,
    textAlignVertical: 'center',
    paddingStart: 10,
    flex:1
  },
  lineSelect:{
    height: 0.5,
    backgroundColor: '#d8d8d8',
    marginStart: 10,
    marginEnd: 10,
  },
  buttonDone: {
    borderRadius: 5,
    borderColor: '#b4b8c7',
    borderStyle: 'solid',
    height: 50,
    marginTop: 30,
    paddingVertical: 15,
  },
  txtDone: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    lineHeight: 24,
  },
  containerCheckBox:{flex: 1, flexDirection: 'row', alignItems: 'center'},
  checkbox:{flex: 1, padding: 10}
});
