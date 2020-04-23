import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import styles from '../../../features/home/styles/styles';
import JobHotItem from '../components/JobHotItem';
import JobNewItem from '../components/JobNewItem';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors, sizes} from '../../../styles/styles';

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderContent = () => {
    const {
      loadMoreJob,
      openJobDetail,
      jobs_hot,
      jobs_new,
      province_list,
      district_list,
      gender_list,
    } = this.props;
    return (
      <View>
        {jobs_hot.length == 0 && jobs_new.length == 0 ? (
          <Text
            style={{
              color: '#1d1d1d',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 50,
            }}>
            Không có công việc nào phù hợp với vị trí mong muốn của bạn
          </Text>
        ) : (
          <View>
            {jobs_hot.length > 0 ? (
              <View style={styles.groupContent}>
                <Text style={styles.txtTitleGroupContent}>
                  Công việc hot nhất
                </Text>
                <FlatList
                  contentContainerStyle={{
                    paddingStart: sizes.s_16,
                    paddingBottom: sizes.s_16,
                    paddingTop: sizes.s_16,
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={jobs_hot}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          openJobDetail(rowData);
                        }}>
                        <JobHotItem
                          province_list={province_list}
                          district_list={district_list}
                          gender_list={gender_list}
                          item={rowData}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  listKey={(item, index) => 'D' + index.toString()}
                  onEndReached={index => {
                    loadMoreJob(true);
                  }}
                />
              </View>
            ) : null}
            {jobs_new.length > 0 ? (
              <View style={[styles.groupContent, {marginTop: sizes.s_10}]}>
                <Text style={styles.txtTitleGroupContent}>
                  Việc mới cập nhật
                </Text>
                <FlatList
                  style={{
                    paddingStart: sizes.s_16,
                    marginTop: sizes.s_10,
                    marginEnd: sizes.s_16,
                  }}
                  data={jobs_new}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity onPress={() => openJobDetail(rowData)}>
                        <JobNewItem
                          province_list={province_list}
                          item={rowData}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  listKey={(item, index) => 'D' + index.toString()}
                />
              </View>
            ) : null}
            {jobs_hot.length > 0 ? (
              <View
                style={[
                  styles.groupContent,
                  {marginTop: 10},
                  {marginBottom: 10},
                ]}>
                <Text style={styles.txtTitleGroupContent}>
                  Thương hiệu hàng đầu
                </Text>
                <FlatList
                  style={{
                    backgroundColor: colors.white,
                    paddingBottom: sizes.s_16,
                    paddingStart: sizes.s_16,
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={jobs_hot}
                  renderItem={({item: rowData}) => {
                    return (
                      <Image
                        resizeMode="stretch"
                        source={{uri: rowData.job_company.icon}}
                        style={{
                          width: sizes.s_94,
                          height: sizes.s_59,
                          backgroundColor: colors.c_757575,
                          marginEnd: sizes.s_16,
                        }}
                      />
                    );
                  }}
                  listKey={(item, index) => 'D' + index.toString()}
                  onEndReached={() => {
                    loadMoreJob(false);
                  }}
                />
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  };

  componentDidMount = () => {
    this.props.getJobs(1);
  };

  render() {
    const {
      onRefreshHome,
      refreshing,
      openSearchContainer,
      showViewFilter,
    } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/bg-home-header.png')}
          style={styles.boxImgHeader}
        />
        <View
          style={{paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 0}}>
          <View style={styles.boxHeader}>
            <View style={styles.viewUser}>
              <Text style={styles.txtHello}>Xin chào, </Text>
              <Text style={[styles.txtHello, styles.txtUserName]}>
                {' ' + this.props.firstName}{' '}
              </Text>
            </View>
            <View style={styles.boxNotification} />
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
                onPress={() => openSearchContainer()}>
                <Text style={styles.txtSearch}>Tìm kiếm</Text>
                <View style={styles.imgBoxSearch}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/images/ic-search.png')}
                    style={{width: 20, height: 20}}
                  />
                </View>
              </TouchableOpacity>
            </Card>
            <Card
              style={{
                width: sizes.s_44,
                height: sizes.s_44,
                marginStart: sizes.s_10,
              }}
              cornerRadius={6}
              elevation={1.5}
              opacity={0.2}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.imgBoxSearch}
                onPress={() => {
                  showViewFilter(true);
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-filter.png')}
                  style={{width: sizes.s_20, height: sizes.s_20}}
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
              refreshing={refreshing}
              onRefresh={onRefreshHome.bind(this.props)}
            />
          }>
          {this._renderContent()}
        </ScrollView>
      </View>
    );
  }
}
