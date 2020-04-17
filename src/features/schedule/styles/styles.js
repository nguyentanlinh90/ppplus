import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../../styles/styles';

export default StyleSheet.create({
  itemTaskContainer: {
    paddingStart: sizes.s_22,
    paddingEnd: sizes.s_15,
    marginTop: sizes.s_15,
  },
  title: {
    fontSize: 24,
    color: '#1c1c1c',
    fontWeight: 'bold',
    padding: 16,
  },
  textProgress: {
    color: colors.c_727373,
    marginStart: sizes.s_3,
    fontSize: sizes.s_14,
    marginBottom: sizes.s_18,
  },
  viewProgress: {
    width: sizes.s_50,
    height: sizes.s_50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTextProgress: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'flex-end',
  },
  viewInfo: {
    flex: 1,
    backgroundColor: colors.c_ffeeea,
    borderRadius: sizes.s_6,
  },
  imageLogo: {
    width: sizes.s_40,
    height: sizes.s_40,
    borderRadius: sizes.s_6,
    backgroundColor: colors.c_d8d8d8,
  },
  textTaskName: {
    color: colors.c_060606,
    fontSize: sizes.s_12,
    fontWeight: 'bold',
    marginStart: sizes.s_12,
  },
  textAddress: {
    fontSize: sizes.s_12,
    color: colors.c_757575,
    margin: sizes.s_8,
    flex: 1,
    textAlignVertical: 'bottom',
  },
  textButton: {
    // flex: 1,
    color: colors.white,
    fontSize: sizes.s_16,
    fontWeight: 'bold',
  },
  dash: {
    marginStart: sizes.s_40,
  },
  button: {
    height: sizes.s_40,
    marginBottom: sizes.s_15,
    marginStart: sizes.s_80,
    marginTop: sizes.s_10,
    alignItems:'center',
    justifyContent:'center'
  },
});
