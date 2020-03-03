import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
import Stars from 'react-native-stars';
import styles from '../styles/styles';
import JobFollowLocationItem from '../components/JobFollowLocationItem';
import BookmarkChecked from '../../../components/BookmarkChecked';
import BookmarkUnChecked from '../../../components/BookmarkUnChecked';
import LocationPicker from '../components/LocationPicker';
import BgButton from '../../../components/BgButton';
import JobInfo from '../components/JobInfo';
import JobRequest from '../components/JobRequest';
import JobLocation from '../components/JobLocation';

var cityList = [
  'Hà Nội',
  'Hồ Chí Minh',
  'Huế',
  'Đà Nẵng',
  'Hải Phòng',
  'Nghệ An',
];

var district = [
  'Quận 1',
  'Quận 2',
  'Quận 3',
  'Quận Bình Thạnh',
  'Quận Gò Vấp',
  'Quận Bình Tân',
];
export default class JobHotDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLocation: [],
      showLocationSelect: false,
      itemId: -1,
      jobBookMark: false,
      cityList: cityList,
      districtList: district,
      city: 'Hồ Chí Minh',
      district: 'Quận 1',
    };
  }
  _closeSelectLocation = (citySelect, districtSelect) => {
    this.setState({
      showLocationSelect: false,
      city: citySelect,
      district: districtSelect,
    });
  };

  _getTime = (timeStart, timeEnd) => {
    return (
      moment(timeStart).format('DD/MM/YYYY') +
      '-' +
      moment(timeEnd).format('DD/MM/YYYY')
    );
  };

  render() {
    const {item, submit} = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{borderRadius: 20, marginTop: -30, backgroundColor: '#fff'}}>
        <View style={styles.jobDetailIndicator} />
        <View style={{position: 'absolute'}}>
          <LocationPicker
            handleClose={this._closeSelectLocation}
            visible={this.state.showLocationSelect}
            cityList={this.state.cityList}
            districtList={this.state.districtList}
            city={this.state.city}
            district={this.state.district}
          />
        </View>
        <View>
          <View style={[styles.jobDetailTop]}>
            <Image
              resizeMode="cover"
              source={{uri: item.logoUrl}}
              style={styles.jobDetailLogo}
            />
            <View style={styles.jobDetailTopInfo}>
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
                <CheckBox
                  onClick={() => {
                    this.setState({jobBookMark: !this.state.jobBookMark});
                  }}
                  isChecked={this.state.jobBookMark}
                  checkedImage={<BookmarkChecked />}
                  unCheckedImage={<BookmarkUnChecked />}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#6D7278', fontSize: 13, marginEnd: 5}}>
                  Độ khó
                </Text>
                <Stars
                  rating={3}
                  spacing={1}
                  starSize={16}
                  count={5}
                  fullStar={require('../../../assets/images/ic-thunder-red.png')}
                  emptyStar={require('../../../assets/images/ic-thunder-gray.png')}
                />
              </View>
            </View>
          </View>
          <JobInfo />
          <View style={styles.jobDetailViewLine} />
          <JobRequest
            time={this._getTime(item.timeStart, item.timeEnd)}
            position="Nhân viên"
            rankAge="18 - 25 tuổi"
            gender="Nam/Nữ"
            figure="Ưa nhìn"
            height="> 1m58"
            weight="45 - 60kg"
            uniform="Công ty cấp"
          />
          <View style={styles.jobDetailViewLine} />
          <JobLocation
            handlePress={{}}
            city={this.state.city}
            district={this.state.district}
          />
          <View style={styles.jobDetailViewLine} />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => submit()}
            style={styles.jobDetailBoxSubmit}>
            <BgButton />
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
              Ứng Tuyển Ngay
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
