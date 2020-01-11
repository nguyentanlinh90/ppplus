import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import styles from '../../../styles/styles';
import stylesProfile from '../styles/styles';
import {SCREEN_FILL_PROFILE} from '../../../api/screen';
import DropdownAlert from 'react-native-dropdownalert';
class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 70,
      name: 'Nguyễn Ngọc Tiên',
    };
  }

  refresh = data => {
    this.setState({name: data});
  };

  _showAlert = () => {
    this.dropdown.alertWithType('error', 'Lỗi', 'Chức năng chưa hoàn thiện');
  };

  render() {
    const {props, percentage, name} = this.props;
    return (
      <View>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          defaultContainer={styles.defaultContainerLogin}
          defaultTextContainer={styles.defaultTextContainerLogin}
        />
        <ScrollView style={stylesProfile.container}>
          <TouchableOpacity
            style={stylesProfile.viewEdit}
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.navigate(SCREEN_FILL_PROFILE, {
                onGoBack: data => this.refresh(data),
              });
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-edit.png')}
              style={{margin: 16}}
            />
          </TouchableOpacity>
          <View style={stylesProfile.viewCircleAvatar}>
            <ProgressCircle
              percent={this.state.percentage}
              radius={58}
              borderWidth={3}
              color="#F0532D"
              shadowColor="#d8d8d8"
              bgColor="#fff"
            />
            <Image
              resizeMode="contain"
              source={{uri: 'http://via.placeholder.com/100x100'}}
              style={stylesProfile.circleAvatar}
            />
          </View>
          <Text style={stylesProfile.name}>{this.state.name}</Text>
          <View style={stylesProfile.viewReward}>
            <View style={stylesProfile.boxReward}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-star.png')}
                style={stylesProfile.boxRewardStar}
              />
              <Text style={stylesProfile.boxRewardTextReward}>
                Điểm thưởng{' '}
              </Text>
              <Text style={stylesProfile.boxRewardTextPoint}>3,480</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#d8d8d8', height: 5}} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-program.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>Chương trình</Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-history.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>Lịch sử</Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-gift.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>Ưu đãi</Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-add-friend.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>Mời bạn bè</Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-process.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>
              Quy trình làm việc và chế độ phúc lợi
            </Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-tutorial.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>Hướng dẫn</Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-sp.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>Hỗ trợ</Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-star-gray.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>Đánh giá ứng dụng</Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <TouchableOpacity
            style={stylesProfile.boxItem}
            onPress={() => this._showAlert()}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-logout.png')}
            />
            <Text style={stylesProfile.boxItemTitle}>Đăng xuất</Text>
          </TouchableOpacity>
          <View style={stylesProfile.boxItemIndicator} />
          <View style={{height: 45}}></View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(ProfileContainer);
