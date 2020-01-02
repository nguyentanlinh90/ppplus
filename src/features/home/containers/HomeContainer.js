import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-native-elements';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '../../../styles/styles';
import stylesHome from '../../../features/home/styles/styles';
import JobHotItem from '../components/JobHotItem';
import JobNewItem from '../components/JobNewItem';
import JobDetail from '../components/JobDetail';
import {ScrollView} from 'react-native-gesture-handler';
import {SCREEN_CREATE_ACCOUNT} from '../../../api/screen';
import * as types from '../../../api/types';
const screenHeight = Math.round(Dimensions.get('window').height);

import {changeMsgCode, getJobs} from '../actions/index';
const data = [
  {
    id: 9,
    logoUrl: 'http://via.placeholder.com/44x44',
    merchantName: 'OPPO',
    rating: 4,
    trending: '1',
    jobTitle: 'PB/PG ra mắt thương hiệu Oppo',
    ageMin: '18',
    ageMax: '25',
    sex: 'Nam/Nữ',
    location: 'Quận 1, TP. Hồ Chí Minh',
    timeStart: '2.9.2019',
    timeEnd: '10.10.2019',
    position: 'Nhân viên',
    amount: 50,
    listJob: [
      {
        nameStore: 'CH1 - Vincom',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Bitexco',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Landmark 81',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
    ],
  },
  {
    id: 2,
    logoUrl: 'http://via.placeholder.com/44x44',
    merchantName: 'OPPO',
    rating: 4,
    trending: '2',
    jobTitle: 'PB/PG ra mắt thương hiệu Oppo',
    ageMin: '18',
    ageMax: '25',
    sex: 'Nam/Nữ',
    location: 'Bình Thạnh, TP. Hồ Chí Minh',
    timeStart: '2.9.2019',
    timeEnd: '10.10.2019',
    position: 'Nhân viên',
    amount: 50,
    listJob: [
      {
        nameStore: 'CH1 - Vincom',
        address: '111 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Bitexco',
        address: '222 Phan Văn Trị',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Landmark 81',
        address: '333 Bùi Đình Tuý',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
    ],
  },
  {
    id: 11,
    logoUrl: 'http://via.placeholder.com/44x44',
    merchantName: 'OPPO',
    rating: 4,
    trending: '1',
    jobTitle: 'PB/PG ra mắt thương hiệu Oppo',
    ageMin: '18',
    ageMax: '25',
    sex: 'Nam/Nữ',
    location: 'Bình Tân',
    timeStart: '2.9.2019',
    timeEnd: '10.10.2019',
    position: 'Nhân viên',
    amount: 50,
  },
  {
    id: 4,
    logoUrl: 'http://via.placeholder.com/44x44',
    merchantName: 'OPPO',
    rating: 4,
    trending: '1',
    jobTitle: 'PB/PG ra mắt thương hiệu Oppo',
    ageMin: '18',
    ageMax: '25',
    sex: 'Nam/Nữ',
    location: 'Tân Bình',
    timeStart: '2.9.2019',
    timeEnd: '10.10.2019',
    position: 'Nhân viên',
    amount: 50,
    listJob: [
      {
        nameStore: 'CH1 - Vincom',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Bitexco',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Landmark 81',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
    ],
  },
  {
    id: 19,
    logoUrl: 'http://via.placeholder.com/44x44',
    merchantName: 'OPPO',
    rating: 4,
    trending: '2',
    jobTitle: 'PB/PG ra mắt thương hiệu Oppo',
    ageMin: '18',
    ageMax: '25',
    sex: 'Nam/Nữ',
    location: 'Gò Vấp',
    timeStart: '2.9.2019',
    timeEnd: '10.10.2019',
    position: 'Nhân viên',
    amount: 50,
    listJob: [
      {
        nameStore: 'CH1 - Vincom',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Bitexco',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Landmark 81',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
    ],
  },
  {
    id: 6,
    logoUrl: 'http://via.placeholder.com/44x44',
    merchantName: 'OPPO',
    rating: 4,
    trending: '2',
    jobTitle: 'PB/PG ra mắt thương hiệu Oppo',
    ageMin: '18',
    ageMax: '25',
    sex: 'Nam/Nữ',
    location: 'Bình Chánh',
    timeStart: '2.9.2019',
    timeEnd: '10.10.2019',
    position: 'Nhân viên',
    amount: 50,
    listJob: [
      {
        nameStore: 'CH1 - Vincom',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Bitexco',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
      {
        nameStore: 'CH1 - Landmark 81',
        address: '123 Nơ Trang Long',
        weekDay: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
        hourDay: ['7:00 - 11:00', '15:00 - 17:00'],
      },
    ],
  },
];
const data1 = [];

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      inputSearch: '',
      data: data1,
      item: {},
      jobs: [],
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText = (text, type) => {
    if (type == 'inputSearch') {
      this.setState({inputSearch: text});
    }
  };

  _onPress(item) {
    this.setState({item: item});
    this.jobHotDetail.open();
  }
  _renderRBSheet() {
    return (
      <RBSheet
        height={screenHeight - 80}
        ref={ref => {
          this.jobHotDetail = ref;
        }}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <JobDetail item={this.state.item} data={this.state.data} />
      </RBSheet>
    );
  }
  fetchData = () => {
    const {getJobs} = this.props;
    getJobs();
  };
  componentDidMount() {
    this.fetchData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'fetch_job_success') {
      console.log('linhnt componentWillReceiveProps FETCH_JOB_SUCCESS');
      this.setState({isLoading:false});
    }
  }

  render() {
    // console.log('linhnt render',this.state.isLoading)
    const {props, inputSearch} = this.props;
    return (
      <View style={[styles.body, {backgroundColor: '#d8d8d8'}]}>
        {this._renderRBSheet()}
        <Spinner
          visible={this.state.isLoading}
          // textContent={'Loading...'}
          color={'white'}
          size={'large'}
          textStyle={{color: '#fff'}}
        />
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{justifyContent: 'center'}}>
              <Image
                resizeMode="stretch"
                source={require('../../../assets/images/bg-home-header.png')}
                style={{width: '100%', height: 221}}
              />
              <View style={stylesHome.viewHeader}>
                <Text style={stylesHome.txtHeaderTitle}>
                  Chào mừng đến với PP+
                </Text>
                <Text style={stylesHome.txtHeaderDes}>
                  Banjo tote bag bicycle rights, High Life sartorial cray craft
                  beer.
                </Text>
                <TouchableOpacity
                  style={stylesHome.boxHeaderRegister}
                  activeOpacity={0.8}
                  onPress={() => {
                    props.navigation.navigate(SCREEN_CREATE_ACCOUNT);
                  }}>
                  <Text style={stylesHome.txtHeaderRegister}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={stylesHome.boxSearch}>
              <View style={stylesHome.inputSearch}>
                <TextInput
                  style={stylesHome.txtInputSearch}
                  value={inputSearch}
                  placeholder="Tìm kiếm"
                  onChangeText={text => this.onChangeText(text, 'inputSearch')}
                  underlineColorAndroid="transparent"
                />
                <View style={stylesHome.buttonFilter}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/images/ic-search.png')}
                  />
                </View>
              </View>
              <View style={stylesHome.buttonFilter}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-filter.png')}
                />
              </View>
            </View>
            {/* hot job */}
            <View style={stylesHome.groupContent}>
              <Text style={stylesHome.txtTitleGroupContent}>
                Công việc hot nhất
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.state.data}
                renderItem={({item: rowData}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this._onPress(rowData)}>
                      <JobHotItem item={rowData} />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
            {/* new job */}
            <View style={[stylesHome.groupContent, {marginTop: 10}]}>
              <Text style={stylesHome.txtTitleGroupContent}>
                Công việc mới nhất
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                data={this.state.data}
                renderItem={({item: rowData}) => {
                  return <JobNewItem item={rowData} />;
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
            <View
              style={[
                stylesHome.groupContent,
                {marginTop: 10},
                {marginBottom: 10},
              ]}>
              <Text style={stylesHome.txtTitleGroupContent}>
                Thương hiệu hàng đầu
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.state.data}
                renderItem={({item: rowData}) => {
                  return (
                    <Image
                      resizeMode="contain"
                      source={{uri: rowData.logoUrl}}
                      style={{width: 94, height: 59}}
                    />
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('linhnt mapStateToProps', state);
  return {
    msg_code: state.home.msg_code,
    jobs: state.home.jobs,
  };
}
export default connect(mapStateToProps, {
  changeMsgCode,
  getJobs,
})(HomeContainer);
