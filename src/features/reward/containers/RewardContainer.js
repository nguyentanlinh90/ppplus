import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from 'react-native';
import styles from '../../../styles/styles';
import styleReward from '../styles/styles';
import LinearBox from '../../../components/LinearBox';
import Footer from '../../../components/footer/Footer';
import {connect} from 'react-redux';
import {changeMsgCode} from '../../home/actions';
import {getBrands} from '../actions/index';
import Dash from 'react-native-dash';
import {
  SCREEN_REDEMPTION,
  SCREEN_TOPUP,
  SCREEN_HISTORY,
} from '../../../api/screen';
import Spinner from 'react-native-loading-spinner-overlay';
import {formatMoney} from '../../../api/helpers';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

class RewardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brands: [],
      refreshing: false,
      isLoading: true,
      toggle: false,
    };
    this.handleExchange = this.handleExchange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  handleExchange = (branch, type, title) => {
    if (type == 'voucher') {
      this.props.navigation.navigate(SCREEN_REDEMPTION, {
        branch: branch,
        type: type,
        title: title,
      });
    } else if (type == 'topup') {
      this.props.navigation.navigate(SCREEN_TOPUP);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {user, getBrands} = this.props;
    getBrands(user);
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == 'fetch_brand_success') {
      this.setState({isLoading: false, refreshing: false});
      this.setState({brands: nextProps.brands});
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == 'fetch_brand_error') {
      this.setState({isLoading: false, refreshing: false});
    }
  }

  render() {
    const {revenue, brands, user} = this.props;
    let revenueMonth = 0;
    let targetMonth = 0;
    let totalReward = 0;
    let rewardMonth = 0;

    if (typeof revenue.length != 0) {
      const month = parseInt(moment(new Date()).format('MM'));
      if (typeof revenue.revenue_month != 'undefined') {
        for (let i = 0; i < revenue.revenue_month.length; i++) {
          if (revenue.revenue_month[i].month == month) {
            targetMonth = revenue.revenue_month[i].target;
            revenueMonth = revenue.revenue_month[i].revenues;
            if (revenueMonth >= targetMonth && targetMonth > 0) {
              rewardMonth =
                (revenueMonth *
                  revenue.revenue_month[i].reward_scheme.reward_percentage) /
                100;
            }
          }
        }
      }
      totalReward = parseInt(revenue.reward);
    }
    const rows = [];
    let rowsChild = [];
    let totalCate = 0;
    if (this.state.brands.length != 0) {
      for (let i = 0; i < this.state.brands.length; i++) {
        if (this.state.brands[i].brands) {
          for (let j = 0; j < this.state.brands[i].brands.length; j++) {
            if (this.state.brands[i].brands[j]) {
              if (
                this.state.brands[i].brands[j].brandId != 48 &&
                this.state.brands[i].brands[j].brandId != 46 &&
                this.state.brands[i].brands[j].brandId != 96
              ) {
                totalCate++;
                rowsChild.push(
                  <View
                    style={styleReward.boxImageBrand}
                    key={this.state.brands[i].brands[j].brandId}>
                    <Image
                      resizeMode="contain"
                      style={styleReward.imageBrand}
                      source={{uri: this.state.brands[i].brands[j].brandImg}}
                    />
                  </View>,
                );

                if (totalCate % 4 === 0) {
                  rows.push(
                    <View style={{flexDirection: 'row'}} key={totalCate}>
                      {rowsChild}
                    </View>,
                  );
                  rowsChild = [];
                }
              }
            }
          }
        }
      }
    }
    if (rowsChild.length != 0) {
      rows.push(rowsChild);
    }

    return (
      <View style={styles.body}>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          color={'white'}
          size={'large'}
          textStyle={{color: '#fff'}}
        />
        <SafeAreaView style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }>
            <View style={styleReward.content}>
              <View style={styleReward.boxHeader}>
                <Text style={styleReward.txtTitle}>Tiền Thưởng</Text>
              </View>
              <View style={styleReward.groupReward}>
                <View style={styleReward.boxCoinLeft}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/images/coin.png')}
                    style={styleReward.iconCoin}
                  />
                  <Text style={styleReward.txtCoin}>
                    {formatMoney(totalReward)} đ
                  </Text>
                </View>
                <View style={styleReward.boxCoinRight}>
                  {user.type != 1 ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styleReward.boxMyVoucher}
                      onPress={() =>
                        this.props.navigation.navigate(SCREEN_HISTORY)
                      }>
                      <Text style={{fontSize: 14, color: '#0097F9'}}>
                        Voucher Của Bạn
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              {user.type != 1 ? (
                <ScrollView style={{height: '100%'}}>
                  <View
                    style={
                      !this.state.toggle
                        ? [styleReward.boxGotit]
                        : [styleReward.boxGotitToggle]
                    }>
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                      <View style={[styleReward.boxIconGotit, {width: '12%'}]}>
                        <Image
                          resizeMode="contain"
                          source={require('../../../assets/images/Gotit.png')}
                          style={{width: 50, height: 50}}
                        />
                      </View>
                      <View
                        style={[
                          styleReward.boxTxtGotit,
                          {width: '51%', marginTop: -8},
                        ]}>
                        <Text style={styleReward.txtGotit}>
                          Voucher ăn uống,
                        </Text>
                        <Text style={[styleReward.txtGotit, {marginTop: -2}]}>
                          mua sắm, giải trí
                        </Text>
                        {totalCate != 0 ? (
                          <Text style={styleReward.lbBrand}>
                            {totalCate} thương hiệu
                          </Text>
                        ) : null}
                      </View>
                      <View style={styleReward.boxGotitCenter}>
                        <TouchableOpacity
                          style={styleReward.btnGotit}
                          onPress={() =>
                            this.handleExchange(
                              'gotit',
                              'voucher',
                              'Got It Code',
                            )
                          }
                          activeOpacity={0.8}>
                          <Text style={styleReward.txtBtnGotit}>Đổi Ngay</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Dash
                      dashGap={6}
                      dashLength={6}
                      dashThickness={1}
                      dashColor={'#EAEAEA'}
                      style={styleReward.dash}
                    />
                    <View>
                      <View style={{flexDirection: 'row', height: 70}}>
                        <Swiper
                          horizontal={true}
                          loop={true}
                          autoplay={true}
                          showsButtons={false}
                          showsPagination={false}
                          loadMinimal={true}
                          loadMinimalSize={4}
                          automaticallyAdjustContentInsets={true}>
                          {rows}
                        </Swiper>
                        <TouchableOpacity
                          style={styleReward.btnToggle}
                          activeOpacity={0.8}
                          onPress={() =>
                            this.setState({toggle: !this.state.toggle})
                          }>
                          {this.state.toggle ? (
                            <View style={{marginTop: 8}}>
                              <Icon
                                name={'apple-keyboard-control'}
                                color={'#dfdfdf'}
                                size={30}
                              />
                            </View>
                          ) : (
                            <Text style={styleReward.txtToggle}>
                              {totalCate}+
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                      {this.state.toggle ? (
                        <View style={{marginLeft: 5}}>
                          <ScrollView>
                            <FlatList
                              showsHorizontalScrollIndicator={false}
                              legacyImplementation={false}
                              data={brands}
                              horizontal={false}
                              extraData={this.state}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({item, index}) => (
                                <View style={{marginTop: 10, marginBottom: 10}}>
                                  <Text style={styleReward.txtCate}>
                                    {item.categoryName}
                                  </Text>
                                  <View>
                                    <FlatList
                                      showsHorizontalScrollIndicator={false}
                                      legacyImplementation={false}
                                      data={item.brands}
                                      numColumns={4}
                                      horizontal={false}
                                      keyExtractor={(item, index) =>
                                        index.toString()
                                      }
                                      renderItem={({item, index}) =>
                                        item.brandId != 48 &&
                                        item.brandId != 46 &&
                                        item.brandId != 96 &&
                                        index > 3 ? (
                                          <View
                                            style={
                                              styleReward.boxImageBrandToggle
                                            }>
                                            <Image
                                              resizeMode="contain"
                                              style={styleReward.imageBrand}
                                              source={{uri: item.brandImg}}
                                            />
                                          </View>
                                        ) : null
                                      }
                                    />
                                  </View>
                                </View>
                              )}
                            />
                          </ScrollView>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  <View>
                    <View style={styleReward.boxCgv}>
                      <View style={{flexDirection: 'row', marginTop: 20}}>
                        <View style={styleReward.boxIconGotit}>
                          <Image
                            source={require('../../../assets/images/cgv.png')}
                            style={{width: 50, height: 50}}
                          />
                        </View>
                        <View style={styleReward.boxTxtCgv}>
                          <Text style={styleReward.txtCgv}>Vé Xem Phim</Text>
                          <Text style={styleReward.txtDesCgv}>
                            Cụm rạp CGV trên toàn quốc
                          </Text>
                        </View>
                        <View style={styleReward.boxGotitCenter}>
                          <TouchableOpacity
                            style={styleReward.btnGotit}
                            onPress={() =>
                              this.handleExchange(
                                'cgv',
                                'voucher',
                                'Vé Xem Phim',
                              )
                            }
                            activeOpacity={0.8}>
                            <Text style={styleReward.txtBtnGotit}>
                              Đổi Ngay
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styleReward.boxCgv}>
                      <View style={{flexDirection: 'row', marginTop: 20}}>
                        <View style={styleReward.boxIconGotit}>
                          <Image
                            source={require('../../../assets/images/bigc.png')}
                            style={{width: 50, height: 50}}
                          />
                        </View>
                        <View style={styleReward.boxTxtCgv}>
                          <Text style={styleReward.txtCgv}>
                            Voucher Siêu Thị
                          </Text>
                          <Text style={styleReward.txtDesCgv}>
                            Các siêu thị Big C toàn quốc
                          </Text>
                        </View>
                        <View style={styleReward.boxGotitCenter}>
                          <TouchableOpacity
                            style={styleReward.btnGotit}
                            onPress={() =>
                              this.handleExchange(
                                'bigc',
                                'voucher',
                                'Voucher Siêu Thị',
                              )
                            }
                            activeOpacity={0.8}>
                            <Text style={styleReward.txtBtnGotit}>
                              Đổi Ngay
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    {/*<View style={styleReward.boxCgv}>*/}
                    {/*    <View style={{flexDirection:'row', marginTop:20}}>*/}
                    {/*        <View style={styleReward.boxIconGotit}>*/}
                    {/*            <Image source={require('../../../assets/images/grap.png')} style={{width:50, height:50}} />*/}
                    {/*        </View>*/}
                    {/*        <View style={styleReward.boxTxtCgv}>*/}
                    {/*            <Text style={styleReward.txtCgv}>Điểm Thưởng</Text>*/}
                    {/*            <Text style={styleReward.txtDesCgv}>Thêm tiền thưởng</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={styleReward.boxGotitCenter}>*/}
                    {/*            <TouchableOpacity style={styleReward.btnGotit} onPress={() => this.handleExchange('grab', 'voucher', 'Điểm Thưởng')} activeOpacity={0.8}>*/}
                    {/*                <Text style={styleReward.txtBtnGotit}>Đổi Ngay</Text>*/}
                    {/*            </TouchableOpacity>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <View style={styleReward.boxCgv}>
                      <View style={{flexDirection: 'row', marginTop: 20}}>
                        <View style={styleReward.boxIconGotit}>
                          <Image
                            source={require('../../../assets/images/topup.png')}
                            style={{width: 50, height: 50}}
                          />
                        </View>
                        <View style={styleReward.boxTxtCgv}>
                          <Text style={styleReward.txtCgv}>Top Up</Text>
                          <Text style={styleReward.txtDesCgv}>
                            Nạp tiền điện thoại
                          </Text>
                        </View>
                        <View style={styleReward.boxGotitCenter}>
                          <TouchableOpacity
                            style={styleReward.btnGotit}
                            onPress={() =>
                              this.handleExchange('topup', 'topup', 'Top Up')
                            }
                            activeOpacity={0.8}>
                            <Text style={styleReward.txtBtnGotit}>
                              Đổi Ngay
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              ) : null}
            </View>
          </ScrollView>
        </SafeAreaView>
        <Footer page={'reward'} navigation={this.props.navigation} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg_code: state.home.msg_code,
    brands: state.reward.brands,
    user: state.user.user,
    revenue: state.home.revenue,
  };
}

export default connect(mapStateToProps, {
  changeMsgCode,
  getBrands,
})(RewardContainer);
