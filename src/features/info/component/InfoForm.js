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
import styles from '../styles/styles';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
import RadioChecked from '../../../components/RadioChecked';
import RadioUnChecked from '../../../components/RadioUnChecked';
import ArrowInBox from '../../../components/ArrowInBox';
import {jewelStyle} from '../../../utils/constants';
const listCity = require('../../../assets/json/city.json');

const listIndustry = [
  {
    id: '1',
    name: 'Bia, rượu, thuốc lá',
  },
  {
    id: '2',
    name: 'Sữa',
  },
  {
    id: '3',
    name: 'Chăm sóc cá nhân',
  },
  {
    id: '4',
    name: 'Điện tử tiêu dùng',
  },
  {
    id: '5',
    name: 'Thức uống giải khát',
  },
  {
    id: '6',
    name: 'Thực phẩm đóng gói',
  },
];

export default class InfoContainer_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowYOB: false,
      isShowCity: false,
      isShowIndustry: false,
    };
  }

  varIndustryGroup = [];
  _boxSelectStyle = function(color) {
    return {
      width: '100%',
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
      selectIndustry,
      industry,
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
        <Text style={styles.title}>
          Hãy cho chúng tôi biết thêm về bạn, PP+ sẽ cung cấp công việc phù hợp
          với bạn!
        </Text>
        <View style={styles.viewFill}>
          <Text style={styles.titleContent}>1. Họ và tên</Text>
          <View style={styles.flexRow}>
            <View style={[styles.boxInput, {marginEnd: 10}]}>
              <TextInput
                numberOfLines={1}
                style={styles.txtInput}
                returnKeyType="go"
                value={lastName}
                name="lastName"
                placeholder="Nhập họ và tên đệm"
                onChangeText={text => onChangeText(text, 'lastName')}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                numberOfLines={1}
                style={styles.txtInput}
                returnKeyType="go"
                value={firstName}
                name="firstName"
                placeholder="Nhập tên"
                onChangeText={text => onChangeText(text, 'firstName')}
              />
            </View>
          </View>
          <Text style={styles.titleContent}>2. Giới tính</Text>
          <View style={styles.flexRow}>
            <View style={styles.containerCheckBox}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => handleGenderSelect(true, !genderMale)}
                isChecked={genderMale}
                rightText={'Nam'}
                checkedImage={<RadioChecked />}
                unCheckedImage={<RadioUnChecked />}
              />
            </View>
            <View style={styles.containerCheckBox}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => handleGenderSelect(false, !genderFeMale)}
                isChecked={genderFeMale}
                rightText={'Nữ'}
                checkedImage={<RadioChecked />}
                unCheckedImage={<RadioUnChecked />}
              />
            </View>
          </View>
          <Text style={styles.titleContent}>3. Năm sinh</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({isShowYOB: !this.state.isShowYOB})}>
            <View
              style={this._boxSelectStyle(
                this.state.isShowYOB ? '#F0532D' : '#d8d8d8',
              )}>
              <Text style={styles.txtSelect}>{yearOfBirth}</Text>
              {<ArrowInBox />}
            </View>
          </TouchableOpacity>
          {this.state.isShowYOB ? (
            <FlatList
              visibility={this.state.isShowYOB}
              style={styles.viewSelect}
              data={listYear}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      selectYearOfBirth(rowData);
                      this.setState({isShowYOB: false});
                    }}>
                    <Text style={styles.txtViewSelect}>{rowData}</Text>

                    <View style={styles.lineSelect} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          ) : null}
          <Text style={styles.titleContent}>4. Địa điểm làm việc</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({isShowCity: !this.state.isShowCity})}>
            <View
              style={this._boxSelectStyle(
                this.state.isShowCity ? '#F0532D' : '#d8d8d8',
              )}>
              <Text style={styles.txtSelect}>{city}</Text>
              {<ArrowInBox />}
            </View>
          </TouchableOpacity>
          {this.state.isShowCity ? (
            <FlatList
              visibility={this.state.isShowCity}
              style={styles.viewSelect}
              data={listCity}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity activeOpacity={0.8}>
                    <View style={styles.infoBoxSelect}>
                      <Text style={styles.txtViewSelect}>
                        {rowData.city}
                      </Text>
                      <CheckBox
                        onClick={() => {
                          selectCity(rowData.city);
                        }}
                        isChecked={city.includes(rowData.city) ? true : false}
                        checkedImage={<CBChecked />}
                        unCheckedImage={<CBUnChecked />}
                      />
                    </View>
                    <View style={styles.lineSelect} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          ) : null}

          <Text style={styles.titleContent}>5. Nhóm ngành</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              this.setState({isShowIndustry: !this.state.isShowIndustry})
            }>
            <View
              style={this._boxSelectStyle(
                this.state.isShowIndustry ? '#F0532D' : '#d8d8d8',
              )}>
              <Text style={styles.txtSelect}>{industry}</Text>
              {<ArrowInBox />}
            </View>
          </TouchableOpacity>
          {this.state.isShowIndustry ? (
            <FlatList
              visibility={this.state.isShowIndustry}
              style={styles.viewSelect}
              data={listIndustry}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity activeOpacity={0.8}>
                    <View style={styles.infoBoxSelect}>
                      <Text style={styles.txtViewSelect}>
                        {rowData.name}
                      </Text>
                      <CheckBox
                        onClick={() => {
                          selectIndustry(rowData.name);
                        }}
                        isChecked={
                          industry.includes(rowData.name) ? true : false
                        }
                        checkedImage={<CBChecked />}
                        unCheckedImage={<CBUnChecked />}
                      />
                    </View>
                    <View style={styles.lineSelect} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          ) : null}

          <Text style={styles.titleContent}>6. Thời lượng công việc</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerCheckBox}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => setJobDuration(true)}
                isChecked={jobLongTerm}
                rightText={'Dài hạn'}
                checkedImage={<CBChecked />}
                unCheckedImage={<CBUnChecked />}
              />
            </View>
            <View style={styles.containerCheckBox}>
              <CheckBox
                style={styles.checkbox}
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
              style={styles.buttonDone}>
              <Text style={styles.txtDone}>Hoàn Thành</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
