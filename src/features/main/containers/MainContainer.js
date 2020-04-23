import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, BackHandler, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import TabNavigator from 'react-native-tab-navigator';
import {EventRegister} from 'react-native-event-listeners';
import Home from '../../home/containers/HomeContainer';
import Notification from '../../notification/containers/NotificationContainer';
import Schedule from '../../schedule/containers/ScheduleContainer';
import Profile from '../../profile/containers/ProfileContainer';
import SpinnerComponent from '../../../components/Spinner';
import styles from '../styles/styles';
import * as types from '../../../api/types';
import {getJobs, getTasks, doLogout} from '../actions/index';
import {changeMsgCode} from '../../../api/helpers';
import {
  dispatchScreen,
  showAlert,
  showAlertWithPress,
  setStoreData,
} from '../../../utils/utils';
import {ACCESS_TOKEN, EVENT_BACK_UPDATE_USER} from '../../../utils/constants';
import {
  SCREEN_START_JOB,
  SCREEN_RETRO,
  SCREEN_JOB_DETAIL,
  SCREEN_SEARCH,
  SCREEN_WEBVIEW_SHOW,
  SCREEN_FILL_PROFILE,
} from '../../../api/screen';

let province_list = [];
let district_list = [];
let gender_list = [];
let jobs_hot_page = 1;
let jobs_new_page = 1;

let isFromEditProfile = false;

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      token: this.props.navigation.state.params.token,
      user: this.props.navigation.state.params.user,
      isConnecting: false,
      isShowViewFilter: false,
      selectedTab: 'home',
      isLoading: false,
      messages: [],
      jobs_hot: [],
      jobs_new: [],
      jobDetail: {},
      dataSchedule: {},
      dateTaskSelect: '',
    };

    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    if (!isFromEditProfile) {
      if (this.state.selectedTab == 'home') {
        return false;
      } else {
        this._openTab('home');
      }
      return true;
    }
    isFromEditProfile = false;
  }

  _hideLoading = () => {
    this.setState({isLoading: false});
    if (this.state.refreshing) {
      this.setState({refreshing: false});
    }
  };
  _showLoading = () => {
    this.setState({isLoading: true});
  };

  _loadData = tab => {
    this._showLoading();
    setTimeout(() => {
      this._hideLoading();
      if (tab == 'message') {
        this.setState({messages: []});
      }
    }, 1000);
  };

  _openTab = tabName => {
    if (this.state.selectedTab != tabName)
      this.setState({selectedTab: tabName});
  };

  componentDidMount() {
    this.listener = EventRegister.addEventListener(
      EVENT_BACK_UPDATE_USER,
      data => {
        isFromEditProfile = data.isFromEditProfile;
        this.setState({user: data.user});
        this._onRefreshHome();
      },
    );

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    EventRegister.removeEventListener(this.listener);
  }

  _handleConnectivityChange = () => {
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({isConnecting: isConnected});
    });
  };

  _openStartJob = () => {
    this._closeAlertJob();
    this.props.navigation.navigate(SCREEN_START_JOB, {
      jobTitle: 'Ra Mắt OPPO F7',
      timeStart: '13:00',
      timeEnd: '17:00',
    });
  };

  //==========================================
  //screen home
  _renderViewFilter = () => {
    return (
      <Modal
        backdropOpacity={0.4}
        backdropColor="#000"
        useNativeDriver={true}
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        isVisible={this.state.isShowViewFilter}
        style={{margin: 15}}>
        <View style={{height: 300, backgroundColor: '#fff', borderRadius: 10}}>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'flex-end'}}
            onPress={() => this._showViewFilter(false)}>
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

  _showViewFilter = isShow => {
    this.setState({isShowViewFilter: isShow});
  };

  _openSearchContainer = () => {
    this.props.navigation.navigate(SCREEN_SEARCH);
  };

  _setLoading = isLoading => {
    this.setState({isLoading: isLoading});
  };

  _getJobs = params => {
    this._showLoading();
    const {getJobs} = this.props;
    getJobs(this.state.token, params);
  };

  _loadMoreJob = isJobHot => {
    var params = '';
    if (isJobHot) {
      jobs_hot_page = jobs_hot_page + 1;
      params = jobs_hot_page + '&type=job_hot';
    } else {
      jobs_new_page = jobs_new_page + 1;
      params = jobs_new_page + '&type=job_new';
    }
    this._getJobs(params);
  };

  _openJobDetail = data => {
    this.props.navigation.navigate(SCREEN_JOB_DETAIL, {
      data: data,
      token: this.state.token,
      gender_list: gender_list,
      province_list: province_list,
      district_list: district_list,
    });
  };

  _onRefreshHome = () => {
    this.setState({refreshing: true, jobs_hot: [], jobs_new: []}, function() {
      jobs_new_page = 1;
      jobs_hot_page = 1;
      this._getJobs(1);
    });
  };
  //screen home end
  //==========================================

  //screen schedule
  _getTasks = (page, dateSelect) => {
    this.setState({dateTaskSelect: dateSelect}, function() {
      this._showLoading();
      const {getTasks} = this.props;
      let params = page + '&date=' + this.state.dateTaskSelect;
      getTasks(this.state.token, params);
    });
  };
  _openWebView = uri => {
    let header = {
      Authorization: this.state.token,
    };
    this.props.navigation.navigate(SCREEN_WEBVIEW_SHOW, {
      uri: uri,
      header: header,
      onGoBack: () => this._getTasks(1, this.state.dateTaskSelect),
    });
  };
  //screen schedule end

  //==========================================
  //screen profile
  _updateUser = () => {
    {
      this.props.navigation.navigate(SCREEN_FILL_PROFILE, {
        user: this.state.user,
        token: this.state.token,
        // onGoBack: user => this.setState({user: user}),
      });
    }
  };

  _handleLogout = () => {
    this._showLoading();
    const {doLogout} = this.props;
    doLogout(this.state.token);
  };

  _gotoRetroScreen = () => {
    dispatchScreen(this.props, SCREEN_RETRO, {});
  };
  //screen profile end

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.GET_JOBS_SUCCESS) {
      //jobs hot
      var arr = this.state.jobs_hot;
      var jobsHot = nextProps.data.job_hot_list;
      if (jobsHot.length > 0) {
        for (var i = 0; i < jobsHot.length; i++) {
          arr.push(jobsHot[i]);
        }
        this.setState({
          jobs_hot: arr != 0 ? arr : [],
        });
      } else {
        this.setState({
          jobs_hot: arr,
        });
      }

      //jobs new
      var arr = this.state.jobs_new;
      var jobsNew = nextProps.data.job_new_list;
      if (jobsNew.length > 0) {
        for (var i = 0; i < jobsNew.length; i++) {
          arr.push(jobsNew[i]);
        }
        this.setState({
          jobs_new: arr != 0 ? arr : [],
        });
      } else {
        this.setState({
          jobs_new: arr,
        });
      }

      if (province_list.length == 0) {
        province_list = nextProps.data.province_list;
      }
      if (district_list.length == 0) {
        district_list = nextProps.data.district_list;
      }
      if (gender_list.length == 0) {
        gender_list = nextProps.data.gender_list;
      }
      this._hideLoading();
      nextProps.changeMsgCode('');
    }
    if (nextProps.msg_code == types.GET_JOBS_FAIL) {
      showAlertWithPress(nextProps.message, this._hideLoading);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.GET_TASKS_SUCCESS) {
      this.setState({dataSchedule: nextProps.data});
      this._hideLoading();
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.GET_TASKS_FAIL) {
      this.setState({dataSchedule: {}});
      showAlertWithPress(nextProps.message, this._hideLoading);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.LOGOUT_SUCCESS) {
      setStoreData(ACCESS_TOKEN, '');
      this._gotoRetroScreen();
      this._hideLoading();
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.LOGOUT_FAIL) {
      showAlertWithPress(nextProps.message, this._hideLoading);
      nextProps.changeMsgCode('');
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SpinnerComponent visible={this.state.isLoading} />
        {this._renderViewFilter()}
        <TabNavigator
          style={styles.container}
          tabBarStyle={styles.tabBarStyle}
          sceneStyle={styles.sceneStyle}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            renderIcon={() => (
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-home-unselect.png')}
                style={styles.imgNav}
              />
            )}
            renderSelectedIcon={() => (
              <View style={styles.viewSelect}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-home-select.png')}
                  style={styles.imgNav}
                />
                <View style={styles.circleMenu} />
              </View>
            )}
            onPress={() => {
              this._openTab('home');
            }}>
            <Home
              onRefreshHome={this._onRefreshHome}
              refreshing={this.state.refreshing}
              openSearchContainer={this._openSearchContainer}
              showViewFilter={this._showViewFilter}
              firstName={this.state.user.first_name}
              getJobs={this._getJobs}
              loadMoreJob={this._loadMoreJob}
              openJobDetail={this._openJobDetail}
              jobs_hot={this.state.jobs_hot}
              jobs_new={this.state.jobs_hot}
              province_list={province_list}
              district_list={district_list}
              gender_list={gender_list}
            />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'notification'}
            renderIcon={() => (
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-noti-unselect.png')}
                style={styles.imgNav}
              />
            )}
            renderSelectedIcon={() => (
              <View style={styles.viewSelect}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-noti-select.png')}
                  style={styles.imgNav}
                />
                <View style={styles.circleMenu} />
              </View>
            )}
            onPress={() => {
              this._openTab('notification');
              return;
              this._loadData();
            }}>
            <Notification props={this.props} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'schedule'}
            renderIcon={() => (
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-schedule-unselect.png')}
                style={styles.imgNav}
              />
            )}
            renderSelectedIcon={() => (
              <View style={styles.viewSelect}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-schedule-select.png')}
                  style={styles.imgNav}
                />
                <View style={styles.circleMenu} />
              </View>
            )}
            onPress={() => {
              this._openTab('schedule');
            }}>
            <Schedule
              firstName={this.state.user.first_name}
              getTasks={this._getTasks}
              dataSchedule={this.state.dataSchedule}
              token={this.state.token}
              openWebView={this._openWebView}
            />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            renderIcon={() => (
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-profile-unselect.png')}
                style={styles.imgNav}
              />
            )}
            renderSelectedIcon={() => (
              <View style={styles.viewSelect}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-profile-select.png')}
                  style={styles.imgNav}
                />
                <View style={styles.circleMenu} />
              </View>
            )}
            onPress={() => this._openTab('profile')}>
            <Profile
              props={this.props}
              user={this.state.user}
              updateUser={this._updateUser}
              handleLogout={this._handleLogout}
            />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg_code: state.main.msg_code,
    message: state.main.message,
    data: state.main.data,
  };
}
export default connect(
  mapStateToProps,
  {
    getJobs,
    getTasks,
    doLogout,
    changeMsgCode,
  },
)(MainContainer);
