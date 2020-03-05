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
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {Card} from 'react-native-shadow-cards';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '../../../features/home/styles/styles';
import SpinnerComponent from '../../../components/Spinner';
import JobHotItem from '../components/JobHotItem';
import JobNewItem from '../components/JobNewItem';
import JobDetailContainer from './JobDetailContainer';
import {SCREEN_CREATE_ACCOUNT, SCREEN_SEARCH} from '../../../api/screen';
import * as types from '../../../api/types';
const screenHeight = Math.round(Dimensions.get('window').height);
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getJobs} from '../actions/index';
import {changeMsgCode} from '../../../api/helpers';
import {isEmptyObject} from '../../../utils/utils';

const dimensions = Dimensions.get('window');
var token = '';
var province_list = [];
var district_list = [];
var gender_list = [];

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      refreshing: false,
      isOpenFilter: false,
      inputSearch: '',
      jobDetail: {},
      jobs_hot: [],
      jobs_new: [],
    };
    token = this.props.token.token;
  }

  _closeRBSheet = () => {
    this.jobDetail.close();
  };
  _renderRBSheet() {
    const {jobDetail} = this.state;
    return (
      <RBSheet
        height={screenHeight}
        ref={ref => {
          this.jobDetail = ref;
        }}
        closeOnDragDown={false}
        closeOnPressBack={true}
        customStyles={{
          container: {},
          wrapper: {},
        }}>
        <View style={{paddingBottom: Platform.OS === 'ios' ? 110 : 100}}>
          <View
            style={{
              height: Platform.OS === 'ios' ? getStatusBarHeight() + 100 : 100,
              backgroundColor: '#098',
            }}>
            <Image
              resizeMode="stretch"
              source={{
                uri: isEmptyObject(jobDetail)
                  ? ''
                  : jobDetail.job_company.banner,
              }}
              style={{position: 'absolute', width: '100%', height: '100%'}}
            />
            <TouchableOpacity
              style={styles.jobDetailBoxButtonBack}
              onPress={() => {
                this._closeRBSheet();
              }}>
              <Image
                source={require('../../../assets/images/ic-back-white.png')}
              />
            </TouchableOpacity>
          </View>
          <JobDetailContainer
            item={this.state.jobDetail}
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
    getJobs('', token, false);
  };

  _getJobDetail = id => {
    const {getJobs} = this.props;
    getJobs('/' + id, token, true);
  };

  _openFilter = () => {
    return (
      <Modal
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
            data={this.state.jobs_hot}
            renderItem={({item: rowData}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this._getJobDetail(rowData.id)}>
                  <JobHotItem
                    province_list={province_list}
                    district_list={district_list}
                    gender_list={gender_list}
                    item={rowData}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View style={[styles.groupContent, {marginTop: 10}]}>
          <Text style={styles.txtTitleGroupContent}>Việc mới cập nhật</Text>
          <FlatList
            style={{paddingStart: 16, marginTop: 10, marginEnd: 16}}
            data={this.state.jobs_new}
            renderItem={({item: rowData}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this._getJobDetail(rowData.id)}>
                  <JobNewItem province_list={province_list} item={rowData} />
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
            style={{
              backgroundColor: '#fff',
              paddingBottom: 16,
              paddingStart: 16,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.jobs_new}
            renderItem={({item: rowData}) => {
              return (
                <Image
                  resizeMode="contain"
                  source={{uri: rowData.job_company.icon}}
                  style={{
                    width: 94,
                    height: 59,
                    backgroundColor: '#757575',
                    marginEnd: 16,
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  };
  _openSearch = () => {
    this.props.props.navigation.navigate(SCREEN_SEARCH);
  };

  componentDidMount() {
    this._fetchData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.GET_JOBS_SUCCESS) {
      this.setState({
        isLoading: false,
        refreshing: false,
        jobs_hot: nextProps.data.job_hot_list.data,
        jobs_new: nextProps.data.job_new_list.data,
      });
      if (province_list.length == 0) {
        province_list = nextProps.data.province_list;
      }
      if (district_list.length == 0) {
        district_list = nextProps.data.district_list;
      }
      if (gender_list.length == 0) {
        gender_list = nextProps.data.gender_list;
      }
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.GET_JOBS_FAIL) {
      this.setState({
        isLoading: false,
        refreshing: false,
        jobs_hot: [],
        jobs_new: [],
      });
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.GET_JOBS_DETAIL_SUCCESS) {
      this.setState({
        isLoading: false,
        refreshing: false,
        jobDetail: nextProps.data,
      });
      this.jobDetail.open();
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.GET_JOBS_DETAIL_FAIL) {
      this.setState({
        isLoading: false,
        refreshing: false,
        jobDetail: {},
      });
      nextProps.changeMsgCode('');
    }
  }

  render() {
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
          <View style={styles.boxHeader}>
            <View style={styles.viewUser}>
              <Text style={styles.txtHello}>Xin chào, </Text>
              <Text style={[styles.txtHello, styles.txtUserName]}>Linh</Text>
            </View>
            <View style={styles.boxNotification}></View>
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
                onPress={() => this._openSearch()}>
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
            ? this.state.jobs_new.length != 0 && this.state.jobs_hot.length != 0
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
    message: state.home.message,
    data: state.home.data,
  };
}
export default connect(mapStateToProps, {
  changeMsgCode,
  getJobs,
})(HomeContainer);
