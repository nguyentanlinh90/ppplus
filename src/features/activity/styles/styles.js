import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttonContinueDisable: {
    height: 44,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#D8D8D8',
  },
  txtContinueDisable: {
    color: '#2b2b2b',
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.4,
  },

  buttonContinue: {
    height: 44,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtContinue: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  indicator: {backgroundColor: '#f1f1f1', height: 5, width: '100%'},
  buttonBack: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    paddingStart: 16,
  },
  txtTime: {
    color: '#F0532D',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 5,
  },
  bgCheckIn: {
    height: 219,
    borderRadius: 6,
    backgroundColor: '#f1f1f1',
    marginEnd: 16,
    marginStart: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTakePicture: {
    height: 35,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  txtTakePicture: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 10,
  },
  txtDetailCheckIn: {
    color: '#757575',
    fontSize: 14,
    marginStart: 16,
    marginEnd: 16,
  },
  txtHeader: {
    color: '#1c1c1c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewReason: {flexDirection: 'row', marginTop: 10},
  txtReasonLate: {color: '#1c1c1c', fontSize: 16, marginStart: 10},
  txtReasonDif: {
    borderRadius: 6,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    color: '#1c1c1c',
    fontSize: 16,
    minHeight: 60,
  },
  boxCheckIn: {
    flexDirection: 'row',
    margin: 16,
  },
  buttonEdit: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
