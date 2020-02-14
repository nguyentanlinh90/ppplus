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
    const {item, data, submit} = this.props;
    if (this.state.listLocation.length == 0) {
      for (let i = 0; i < data.length; i++) {
        const itemLocation = data[i].location;
        const itemValue = data[i].id;
        const obj = {label: itemLocation, value: itemValue};
        this.state.listLocation.push(obj);
      }
    }
    let titleLocation = '';
    if (this.state.itemId != -1) {
      for (let i = 0; i < data.length; i++) {
        if (this.state.itemId == data[i].id) {
          titleLocation = data[i].location;
          break;
        }
      }
    }
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
                  {item.jobTitle}
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
              <Rating
                readonly={true}
                type="custom"
                ratingColor="#FEBE10"
                ratingBackgroundColor="#d8d8d8"
                ratingCount={5}
                imageSize={18}
                startingValue={item.rating}
                tintColor="#fff"
              />
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
