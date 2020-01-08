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
import styles from '../../../styles/styles';
import stylesInfo from '../styles/styles';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
import RadioChecked from '../../../components/RadioChecked';
import RadioUnChecked from '../../../components/RadioUnChecked';
import ArrowInBox from '../../../components/ArrowInBox';
import {jewelStyle} from '../../../utils/constants';
const listCity = require('../../../assets/json/city.json');

export default class InfoContainer_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowYOB: false,
      isShowCity: true,
    };
  }

  varIndustryGroup = [];
  _boxSelectStyle = function(color) {
    return {
      width: '100%',
      height: 44,
      borderColor: color,
      borderWidth: 1,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      paddingStart: 10,
      paddingEnd: 10,
    };
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
      setJobDuration,
      jobLongTerm,
      jobShortTerm,
      openHomeScreen,
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
            <View style={stylesInfo.containerCheckBox}>
              <CheckBox
                style={stylesInfo.checkbox}
                onClick={() => handleGenderSelect(true, !genderMale)}
                isChecked={genderMale}
                rightText={'Nam'}
                checkedImage={<RadioChecked />}
                unCheckedImage={<RadioUnChecked />}
              />
            </View>
            <View style={stylesInfo.containerCheckBox}>
              <CheckBox
                style={stylesInfo.checkbox}
                onClick={() => handleGenderSelect(false, !genderFeMale)}
                isChecked={genderFeMale}
                rightText={'Nữ'}
                checkedImage={<RadioChecked />}
                unCheckedImage={<RadioUnChecked />}
              />
            </View>
          </View>
          <Text style={stylesInfo.titleContent}>3. Năm sinh</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({isShowYOB: !this.state.isShowYOB})}>
            <View
              style={this._boxSelectStyle(
                this.state.isShowYOB ? '#F0532D' : '#d8d8d8',
              )}>
              <Text style={stylesInfo.txtSelect}>{yearOfBirth}</Text>
              {<ArrowInBox />}
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
            onPress={() => this.setState({isShowCity: !this.state.isShowCity})}>
            <View
              style={this._boxSelectStyle(
                this.state.isShowCity ? '#F0532D' : '#d8d8d8',
              )}>
              <Text style={stylesInfo.txtSelect}>{city}</Text>
              {<ArrowInBox />}
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
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingEnd: 10,
                      }}>
                      <Text style={stylesInfo.txtViewSelect}>
                        {rowData.city}
                      </Text>
                      <CheckBox
                        onClick={() => {}}
                        isChecked={true}
                        checkedImage={<CBChecked />}
                        unCheckedImage={<CBUnChecked />}
                      />
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
            <View style={stylesInfo.containerCheckBox}>
              <CheckBox
                style={stylesInfo.checkbox}
                onClick={() => setJobDuration(true)}
                isChecked={jobLongTerm}
                rightText={'Dài hạn'}
                checkedImage={<CBChecked />}
                unCheckedImage={<CBUnChecked />}
              />
            </View>
            <View style={stylesInfo.containerCheckBox}>
              <CheckBox
                style={stylesInfo.checkbox}
                onClick={() => setJobDuration(false)}
                isChecked={jobShortTerm}
                rightText={'Ngắn hạn'}
                checkedImage={<CBChecked />}
                unCheckedImage={<CBUnChecked />}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openHomeScreen()}>
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
