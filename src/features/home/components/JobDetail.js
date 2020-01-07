import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {Rating} from 'react-native-elements';
import {Dialog} from 'react-native-simple-dialogs';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import styleHome from '../styles/styles';
import ArrowInBox from '../../../components/ArrowInBox';
import JobFollowLocationItem from '../components/JobFollowLocationItem';
import {c_757575, c_1c1c1c, c_d8d8d8} from '../../../utils/constants';

export class JobHotItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLocation: [],
      showLocationSelect: false,
      itemId: -1,
    };
  }
  _renderLocationPicker() {
    let locationValueTmp = this.state.locationTitle;
    return (
      <Dialog
        visible={this.state.showLocationSelect}
        onTouchOutside={() => this.setState({showLocationSelect: false})}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>Chọn địa điểm</Text>
            <RadioForm
              style={{marginBottom: 20, marginTop: 20}}
              radio_props={this.state.listLocation}
              //   initial={locationValueTmp}
              formHorizontal={false}
              buttonColor={'#F0532D'}
              selectedButtonColor={'#F0532D'}
              labelStyle={{fontSize: 18, marginBottom: 20}}
              onPress={value => {
                locationValueTmp = value;
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{backgroundColor: '#F0532D', borderRadius: 30}}
              onPress={() =>
                this.setState({
                  showLocationSelect: false,
                  itemId: locationValueTmp,
                })
              }>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 18,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingEnd: 25,
                  paddingStart: 25,
                }}>
                Đồng ý
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Dialog>
    );
  }
  render() {
    const {item, data} = this.props;
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
      <ScrollView>
        <View style={{marginTop: 16, marginBottom: 16}}>
          {this._renderLocationPicker()}
          <View
            style={{
              flexDirection: 'row',
              marginStart: 16,
              marginEnd: 16,
            }}>
            <Image
              resizeMode="cover"
              source={{uri: item.logoUrl}}
              style={{width: 84, height: 84, borderRadius: 6}}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginStart: 10,
                marginEnd: 10,
              }}>
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold'}}>
                  {item.jobTitle}
                </Text>
                <Image
                  resizeMode="stretch"
                  source={require('../../../assets/images/ic-dob.png')}
                  style={styleHome.imgInfoJob}
                />
              </View>
              <Rating imageSize={18} readonly startingValue={item.rating} />
            </View>
          </View>
          <View style={{flexDirection: 'row', margin: 16}}>
            <Text style={{flex: 1, color: c_757575, fontSize: 16}}>Vị trí</Text>
            <Text style={{flex: 1, color: c_1c1c1c, fontSize: 16}}>
              {item.position}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: c_d8d8d8,
              marginStart: 16,
              marginEnd: 16,
            }}
          />
          <View style={{flexDirection: 'row', margin: 16}}>
            <Text style={{flex: 1, color: c_757575, fontSize: 16}}>
              Số lượng
            </Text>
            <Text style={{flex: 1, color: c_1c1c1c, fontSize: 16}}>
              {item.amount}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: c_d8d8d8,
              marginStart: 16,
              marginEnd: 16,
            }}
          />
          <View style={{flexDirection: 'row', margin: 16}}>
            <Text style={{flex: 1, color: c_757575, fontSize: 16}}>
              Thời gian
            </Text>
            <Text style={{flex: 1, color: c_1c1c1c, fontSize: 16}}>
              {moment(item.timeStart).format('DD/MM/YYYY')} -{' '}
              {moment(item.timeEnd).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={{height: 5, backgroundColor: c_d8d8d8}} />
          <Text
            style={{
              color: c_d8d8d8,
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 16,
              marginTop: 16,
            }}>
            ĐỊA ĐIỂM LÀM VIỆC
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              //if select location
              // this.setState({showLocationSelect: true});
            }}
            style={{margin: 16}}>
            <View
              style={{
                height: 44,
                borderColor: c_d8d8d8,
                borderWidth: 1,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingEnd: 10,
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-location.png')}
                style={{width: 24, height: 24}}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#757575',
                  marginLeft: 5,
                  flex: 1,
                }}>
                {item.location}
                {/* {titleLocation ? titleLocation : 'Tất cả'} if select location*/}
              </Text>
              <ArrowInBox />
            </View>
          </TouchableOpacity>
          <FlatList
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
          <View style={{height: 5, backgroundColor: '#d8d8d8', marginTop: 6}} />
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <LinearGradient
              colors={['#F0532D', '#FEBE10']}
              useAngle={true}
              angle={-90}
              style={{
                borderRadius: 22,
                borderStyle: 'solid',
                height: 50,
                margin: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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
export default JobHotItem;
