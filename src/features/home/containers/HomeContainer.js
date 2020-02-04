import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Modal from 'react-native-modal';
import {Card} from 'react-native-shadow-cards';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '../../../features/home/styles/styles';
import SpinnerComponent from '../../../components/Spinner';
import JobHotItem from '../components/JobHotItem';
import JobNewItem from '../components/JobNewItem';
import JobDetail from '../components/JobDetail';
import {ScrollView} from 'react-native-gesture-handler';
import {SCREEN_CREATE_ACCOUNT, SCREEN_SEARCH} from '../../../api/screen';
import * as types from '../../../api/types';
const screenHeight = Math.round(Dimensions.get('window').height);
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {changeMsgCode, getJobs} from '../actions/index';
const dimensions = Dimensions.get('window');

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

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorHeaderJobDetail: '',
      isLoading: true,
      refreshing: false,
      isOpenFilter: false,
      inputSearch: '',
      item: {},
      jobs: [],
    };

    // console.disableYellowBox = true;
  }

  _randomColor = () => {
    var colorCode =
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')';

    this.setState({
      colorHeaderJobDetail: colorCode,
    });
  };
  _onClickItem(item) {
    this._randomColor();
    this.setState({item: item});
    this.jobHotDetail.open();
  }

  _closeRBSheet = () => {
    this.jobHotDetail.close();
  };
  _renderRBSheet() {
    return (
      <RBSheet
        height={screenHeight}
        ref={ref => {
          this.jobHotDetail = ref;
        }}
        closeOnDragDown={false}
        closeOnPressBack={true} // just android
        customStyles={{
          container: {},
          wrapper: {},
        }}>
        <View style={{paddingBottom: Platform.OS === 'ios' ? 110 : 100}}>
          <View
            style={{
              height: Platform.OS === 'ios' ? getStatusBarHeight() + 100 : 100,
              backgroundColor: this.state.colorHeaderJobDetail,
            }}>
            <TouchableOpacity
              style={styles.jobDetailBoxButtonBack}
              onPress={() => {
                this._closeRBSheet();
              }}>
              <Image source={require('../../../assets/images/ic-back.png')} />
            </TouchableOpacity>
          </View>
          <JobDetail
            item={this.state.item}
            data={this.state.jobs}
            submit={this._closeRBSheet}
          />
        </View>
      </RBSheet>
    );
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._fetchData();
  };
  _fetchData = () => {
    const {getJobs} = this.props;
    getJobs();
  };

  _openFilter = () => {
    return (
      <Modal
        // style={{position: 'absolute'}}
        backdropOpacity={0.4}
        backdropColor="#000"
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        isVisible={this.state.isOpenFilter}
        style={{margin: 15}}>
        <View style={{height: 300, backgroundColor: '#fff', borderRadius: 10}}>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'flex-end'}}
            onPress={() => this.setState({isOpenFilter: false})}>
            <Image
              source={require('../../../assets/images/ic-close-1.png')}
              style={{
                width: 25,
                height: 25,
                justifyContent: 'flex-end',
                marginEnd: 16,
                marginTop: 16,
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  _renderNoData = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 22, marginTop: 200}}>Không có dữ liệu</Text>
      </View>
    );
  };
  _renderContent = () => {
    return (
      <View>
        <View style={styles.groupContent}>
          <Text style={styles.txtTitleGroupContent}>Công việc hot nhất</Text>

          <FlatList
            contentContainerStyle={{
              paddingStart: 16,
              paddingBottom: 16,
              paddingTop: 16,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.jobs}
            renderItem={({item: rowData}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this._onClickItem(rowData)}>
                  <JobHotItem item={rowData} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View style={[styles.groupContent, {marginTop: 10}]}>
          <Text style={styles.txtTitleGroupContent}>Công việc mới nhất</Text>
          <FlatList
            style={{paddingStart: 16, marginTop: 10, marginEnd: 16}}
            data={this.state.jobs}
            renderItem={({item: rowData}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this._onClickItem(rowData)}>
                  <JobNewItem item={rowData} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View
          style={[styles.groupContent, {marginTop: 10}, {marginBottom: 10}]}>
          <Text style={styles.txtTitleGroupContent}>Thương hiệu hàng đầu</Text>
          <FlatList
            style={{backgroundColor: '#fff', paddingBottom: 16}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.jobs}
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
      </View>
    );
  };
  _openSearch = props => {
    props.navigation.navigate(SCREEN_SEARCH);
  };
  componentDidMount() {
    this._fetchData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'fetch_job_success') {
      this.setState({
        isLoading: false,
        refreshing: false,
        jobs: nextProps.jobs,
      });
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == 'fetch_job_error') {
      this.setState({
        isLoading: false,
        refreshing: false,
        jobs: [],
      });
      nextProps.changeMsgCode('');
    }
  }

  render() {
    const {props, inputSearch, jobs} = this.props;
    return (
      <View style={styles.container}>
        {this._openFilter()}
        {this._renderRBSheet()}
        <SpinnerComponent visible={this.state.isLoading} />
        <Image
          source={require('../../../assets/images/bg-home-header.png')}
          style={styles.boxImgHeader}
        />
        <View
          style={{paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 0}}>
          <View style={styles.viewUser}>
            <Text style={{fontSize: 16, color: '#fff'}}>Xin chào, </Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
              Linh
            </Text>
          </View>

          <View style={[styles.boxSearch]}>
            <Card
              style={{flex: 1}}
              cornerRadius={6}
              elevation={1.5}
              opacity={0.2}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.inputSearch}
                onPress={() => this._openSearch(props)}>
                <Text style={styles.txtSearch}>Tìm kiếm</Text>
                <View style={styles.imgBoxSearch}>
                  <Image
                    source={require('../../../assets/images/ic-search.png')}
                  />
                </View>
              </TouchableOpacity>
            </Card>
            <Card
              style={{width: 44, height: 44, marginStart: 10}}
              cornerRadius={6}
              elevation={1.5}
              opacity={0.2}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.imgBoxSearch}
                onPress={() => {
                  this.setState({isOpenFilter: true});
                }}>
                <Image
                  source={require('../../../assets/images/ic-filter.png')}
                />
              </TouchableOpacity>
            </Card>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              // tintColor={'#098'}
              // titleColor={'#000'}
              // title={'Cập nhật'}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          {!this.state.isLoading
            ? this.state.jobs.length > 0
              ? this._renderContent()
              : this._renderNoData()
            : null}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg_code: state.home.msg_code,
    jobs: state.home.jobs,
  };
}
export default connect(mapStateToProps, {
  changeMsgCode,
  getJobs,
})(HomeContainer);
