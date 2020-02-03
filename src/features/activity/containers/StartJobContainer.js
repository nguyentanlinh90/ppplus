import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import styles from '../styles/styles';
import BgButton from '../../../components/BgButton';
import CheckBox from 'react-native-check-box';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
import {SCREEN_RETRO, SCREEN_MAIN} from '../../../api/screen';
import {dispatchScreen} from '../../../utils/utils';

class StartJobContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason_1: false,
      reason_2: false,
      reason_3: false,
      isCheckIn: false,
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.goBack()}
              style={styles.buttonBack}>
              <Image source={require('../../../assets/images/ic-back-1.png')} />
            </TouchableOpacity>

            <Text style={{color: '#1c1c1c', fontSize: 18, fontWeight: 'bold'}}>
              {JSON.stringify(navigation.getParam('jobTitle', 'No Title'))}
            </Text>
          </View>
          <View style={styles.indicator} />
          <ScrollView>
            <View style={{flexDirection: 'row', margin: 16}}>
              <Text style={styles.txtHeader}>Ca làm việc</Text>
              <Text style={styles.txtTime}>
                {JSON.stringify(navigation.getParam('timeStart', '-'))} -
                {JSON.stringify(navigation.getParam('timeEnd', '-'))}
              </Text>
            </View>
            <View style={{marginEnd: 16, marginStart: 16, marginBottom: 16}}>
              <Text style={styles.txtHeader}>
                Hãy cho chúng tôi biết lý do bạn vào ca trễ nhé!
              </Text>
              <View style={styles.viewReason}>
                <CheckBox
                  isChecked={this.state.reason_1}
                  onClick={() =>
                    this.setState({reason_1: !this.state.reason_1})
                  }
                  checkedImage={<CBChecked />}
                  unCheckedImage={<CBUnChecked />}
                />
                <Text style={styles.txtReasonLate}>
                  Hella narwhal Cosby sweater McSweeney's
                </Text>
              </View>
              <View style={styles.viewReason}>
                <CheckBox
                  isChecked={this.state.reason_2}
                  onClick={() =>
                    this.setState({reason_2: !this.state.reason_2})
                  }
                  checkedImage={<CBChecked />}
                  unCheckedImage={<CBUnChecked />}
                />
                <Text style={styles.txtReasonLate}>
                  Retro occupy organic, stump.
                </Text>
              </View>
              <View style={styles.viewReason}>
                <CheckBox
                  isChecked={this.state.reason_3}
                  onClick={() =>
                    this.setState({reason_3: !this.state.reason_3})
                  }
                  checkedImage={<CBChecked />}
                  unCheckedImage={<CBUnChecked />}
                />
                <Text style={styles.txtReasonLate}>
                  In hac habitasse platea dictumst. Viva.
                </Text>
              </View>
              <TextInput
                style={styles.txtReasonDif}
                multiline
                placeholder="Nhập lý do khác"
                maxLength={200}
              />
            </View>

            <View style={styles.indicator} />
            <View style={styles.boxCheckIn}>
              <Text style={styles.txtHeader}>Check in</Text>
              {this.state.isCheckIn ? (
                <TouchableOpacity style={styles.buttonEdit}>
                  <Text style={[styles.txtHeader, {color: '#F0532D'}]}>
                    Chỉnh sửa
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.bgCheckIn}>
              <Image source={require('../../../assets/images/no-image.png')} />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.setState({isCheckIn: !this.state.isCheckIn});
                }}
                style={styles.buttonTakePicture}>
                <BgButton />
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../../assets/images/ic-camera-white.png')}
                  />
                  <Text style={styles.txtTakePicture}>Chụp ảnh</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.txtDetailCheckIn}>
              * Aenean tincidunt velit vitae orci varius, vitae intat {'\n'}*
              Facilisis nisi vulputate. Sed pulvinar, lorem ac ione {'\n'}* Quam
              mauris lacinia ex.
            </Text>
          </ScrollView>
        </View>
        {this.state.isCheckIn ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={styles.buttonContinue}>
            <BgButton />
            <Text style={styles.txtContinue}>Tiếp Tục</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContinueDisable}>
            <Text style={styles.txtContinueDisable}>Tiếp Tục</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(StartJobContainer);
