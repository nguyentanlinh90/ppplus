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
import {Rating} from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import styleHome from '../styles/styles';
import ArrowInBox from '../../../components/ArrowInBox';
import JobFollowLocationItem from '../components/JobFollowLocationItem';
import BookmarkChecked from '../../../components/BookmarkChecked';
import BookmarkUnChecked from '../../../components/BookmarkUnChecked';
import LocationPicker from '../components/LocationPicker';

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
export default class JobHotItem extends Component {
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
  _selectJobFollowLocationItem = () => {};

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
        <View style={styleHome.jobDetailIndicator} />
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
          <View style={[styleHome.jobDetailTop]}>
            <Image
              resizeMode="cover"
              source={{uri: item.logoUrl}}
              style={styleHome.jobDetailLogo}
            />
            <View style={styleHome.jobDetailTopInfo}>
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
              <Rating imageSize={18} readonly startingValue={item.rating} />
            </View>
          </View>
          <View style={{flexDirection: 'row', margin: 16}}>
            <Text style={{flex: 1, color: '#757575', fontSize: 16}}>
              Vị trí
            </Text>
            <Text style={{flex: 1, color: '#1c1c1c', fontSize: 16}}>
              Nhân viên
            </Text>
          </View>
          <View style={styleHome.jobDetailLine} />
          <View style={{flexDirection: 'row', margin: 16}}>
            <Text style={{flex: 1, color: '#757575', fontSize: 16}}>
              Số lượng
            </Text>
            <Text style={{flex: 1, color: '#1c1c1c', fontSize: 16}}>
              {item.amount}
            </Text>
          </View>
          <View style={styleHome.jobDetailLine} />
          <View style={{flexDirection: 'row', margin: 16}}>
            <Text style={{flex: 1, color: '#757575', fontSize: 16}}>
              Thời gian
            </Text>
            <Text style={{flex: 1, color: '#1c1c1c', fontSize: 16}}>
              {moment(item.timeStart).format('DD/MM/YYYY')} -{' '}
              {moment(item.timeEnd).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={{height: 5, backgroundColor: '#d8d8d8'}} />
          <Text style={styleHome.jobDetailTitle}>ĐỊA ĐIỂM LÀM VIỆC</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.setState({showLocationSelect: true});
            }}
            style={{marginStart: 16, marginEnd: 16, marginBottom: 16}}>
            <View style={styleHome.jobDetailIconBoxSelect}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-location.png')}
                style={{width: 24, height: 24}}
              />
              <Text style={styleHome.jobDetailBoxLocation}>
                {this.state.district + ', ' + this.state.city}
              </Text>
              <ArrowInBox />
            </View>
          </TouchableOpacity>
          <FlatList
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={item.jobDetails}
            renderItem={({item: rowData}) => {
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                  <JobFollowLocationItem item={rowData} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
          <View style={styleHome.jobDetailViewLine} />
          <Text style={styleHome.jobDetailTitle}>MÔ TẢ CÔNG VIỆC</Text>
          <Text style={styleHome.jobFollowLocationTxtDetail}>
            - Giới thiệu và quảng bá sản phẩm của công ty {'\n'}- Tư vấn và
            bánhàng ĐTDĐ OPPO {'\n'}- Ghi nhận thông tin bán hàng, cập nhật thị
            trường {'\n'}- Giải quyết thắc mắc của khách hàng về sản phẩm
          </Text>
          <View style={styleHome.jobDetailViewLine} />
          <Text style={styleHome.jobDetailTitle}>YÊU CẦU</Text>
          <View style={styleHome.jobDetailBoxRequest}>
            <Text style={styleHome.jobDetailTxtTitleRequest}>Độ tuổi</Text>
            <Text style={styleHome.jobDetailTxtContentRequest}>
              18 tuổi - 25 tuổi
            </Text>
          </View>
          <View style={styleHome.jobDetailLineRequest} />
          <View style={styleHome.jobDetailBoxRequest}>
            <Text style={styleHome.jobDetailTxtTitleRequest}>Giới tính</Text>
            <Text style={styleHome.jobDetailTxtContentRequest}>Nữ</Text>
          </View>
          <View style={styleHome.jobDetailLineRequest} />
          <View style={styleHome.jobDetailBoxRequest}>
            <Text style={styleHome.jobDetailTxtTitleRequest}>Ngoại hình</Text>
            <Text style={styleHome.jobDetailTxtContentRequest}>Ưa nhìn</Text>
          </View>
          <View style={styleHome.jobDetailLineRequest} />
          <View style={styleHome.jobDetailBoxRequest}>
            <Text style={styleHome.jobDetailTxtTitleRequest}>Chiều cao</Text>
            <Text style={styleHome.jobDetailTxtContentRequest}>>1m58</Text>
          </View>
          <View style={styleHome.jobDetailLineRequest} />
          <View style={styleHome.jobDetailBoxRequest}>
            <Text style={styleHome.jobDetailTxtTitleRequest}>Cân nặng</Text>
            <Text style={styleHome.jobDetailTxtContentRequest}>45 - 60</Text>
          </View>
          <View style={styleHome.jobDetailLineRequest} />
          <View style={styleHome.jobDetailBoxRequest}>
            <Text style={styleHome.jobDetailTxtTitleRequest}>Đồng phục</Text>
            <Text style={styleHome.jobDetailTxtContentRequest}>
              Công ty cấp
            </Text>
          </View>
          <View style={styleHome.jobDetailViewLine} />

          <TouchableOpacity activeOpacity={0.8} onPress={() => submit()}>
            <LinearGradient
              colors={['#F0532D', '#FEBE10']}
              useAngle={true}
              angle={-90}
              style={styleHome.jobDetailBoxSubmit}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Ứng Tuyển Ngay
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
