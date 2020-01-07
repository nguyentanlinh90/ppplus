import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import styles from '../../../styles/styles';
import stylesInfo from '../styles/styles';
const listCity = require('../../../assets/json/city.json');

export default class InfoContainer_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowYOB: false,
      isShowCity: false,
      isChecked_1: true,
      isChecked_2: false,
    };
  }

  _renderIconArrow = () => {
    return (
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/ic-picker.png')}
      />
    );
  };

  render() {
    const {
      onChangeText,
      lastName,
      firstName,
      genderMale,
      genderFeMale,
      handleGenderSelect,
      selectYearOfBirth,
      yearOfBirth,
      selectCity,
      city,
      openHomeScreen
    } = this.props;

    var listYear = [];
    var year = new Date().getFullYear();
    for (var i = 1900; i < year; i++) {
      listYear.push(i);
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={stylesInfo.title}>
          Hãy cho chúng tôi biết thêm về bạn, PP+ sẽ cung cấp công việc phù hợp
          với bạn!
        </Text>
        <View style={stylesInfo.viewFill}>
          <Text style={stylesInfo.titleContent}>1. Họ và tên</Text>
          <View style={stylesInfo.flexRow}>
            <View style={[stylesInfo.boxInput, {marginEnd: 10}]}>
              <TextInput
                numberOfLines={1}
                style={stylesInfo.txtInput}
                returnKeyType="go"
                value={lastName}
                name="lastName"
                placeholder="Nhập họ và tên đệm"
                onChangeText={text => onChangeText(text, 'lastName')}
              />
            </View>
            <View style={stylesInfo.boxInput}>
              <TextInput
                numberOfLines={1}
                style={stylesInfo.txtInput}
                returnKeyType="go"
                value={firstName}
                name="firstName"
                placeholder="Nhập tên"
                onChangeText={text => onChangeText(text, 'firstName')}
              />
            </View>
          </View>
          <Text style={stylesInfo.titleContent}>2. Giới tính</Text>
          <View style={stylesInfo.flexRow}>
            <View style={{flex: 1}}>
              <CircleCheckBox
                styleLabel={{fontSize: 16, color: '#1c1c1c', marginStart: 20}}
                checked={genderMale}
                onToggle={checked => handleGenderSelect(true, checked)}
                label="Nam"
                outerColor="#1c1c1c"
                innerColor="#F0532D"
                innerSize={10}
              />
            </View>
            <View style={{flex: 1}}>
              <CircleCheckBox
                styleLabel={{fontSize: 16, color: '#1c1c1c', marginStart: 20}}
                checked={genderFeMale}
                onToggle={checked => handleGenderSelect(false, checked)}
                label="Nữ"
                outerColor="#1c1c1c"
                innerColor="#F0532D"
                innerSize={10}
              />
            </View>
          </View>
          <Text style={stylesInfo.titleContent}>3. Năm sinh</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({isShowYOB: true})}>
            <View style={stylesInfo.boxSelect}>
              <Text style={stylesInfo.txtSelect}>{yearOfBirth}</Text>
              {this._renderIconArrow()}
            </View>
          </TouchableOpacity>
          {this.state.isShowYOB ? (
            <FlatList
              visibility={this.state.isShowYOB}
              style={stylesInfo.viewSelect}
              data={listYear}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      selectYearOfBirth(rowData);
                      this.setState({isShowYOB: false});
                    }}>
                    <Text style={stylesInfo.txtViewSelect}>{rowData}</Text>
                    <View style={stylesInfo.lineSelect} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          ) : null}
          <Text style={stylesInfo.titleContent}>4. Địa điểm làm việc</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({isShowCity: true})}>
            <View style={stylesInfo.boxSelect}>
              <Text style={stylesInfo.txtSelect}>{city}</Text>
              {this._renderIconArrow()}
            </View>
          </TouchableOpacity>
          {this.state.isShowCity ? (
            <FlatList
              visibility={this.state.isShowCity}
              style={stylesInfo.viewSelect}
              data={listCity}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      selectCity(rowData.city);
                      this.setState({isShowCity: false});
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={stylesInfo.txtViewSelect}>
                        {rowData.city}
                      </Text>
                    </View>
                    <View style={stylesInfo.lineSelect} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          ) : null}
          <Text style={stylesInfo.titleContent}>6. Thời lượng công việc</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked_1,
                  });
                }}
                isChecked={this.state.isChecked_1}
                rightText={'Dài hạn'}
                checkedCheckBoxColor="#F0532D"
              />
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked_2,
                  });
                }}
                isChecked={this.state.isChecked_2}
                rightText={'Ngắn hạn'}
                checkedCheckBoxColor="#F0532D"
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={() => openHomeScreen()}>
            <LinearGradient
              colors={['#F0532D', '#FEBE10']}
              useAngle={true}
              angle={-90}
              style={stylesInfo.buttonDone}>
              <Text style={stylesInfo.txtDone}>Hoàn Thành</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
