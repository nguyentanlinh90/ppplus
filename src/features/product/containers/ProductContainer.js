import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScrollAbleTabView from 'react-native-scrollable-tab-view-forked';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';

import styles from '../styles/styles';
import ScanCode from '../components/ScanCode';
import InputCode from '../components/InputCode';
import Category from '../components/Category';
class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.goBack()}
              style={styles.buttonBack}>
              <Image source={require('../../../assets/images/ic-back-1.png')} />
            </TouchableOpacity>

            <Text style={styles.txtHeader}>Nhập sản phẩm</Text>
          </View>
          <ScrollAbleTabView
            //   renderTabBar={() => (
            //     <ScrollableTabBar style={styles.scroll} tabStyle={styles.tab} />
            //   )}
            tabBarTextStyle={styles.tabBarText}
            tabBarInactiveTextColor={'#D2D2D2'}
            tabBarActiveTextColor={'#F0532D'}
            tabBarUnderlineStyle={styles.tabBarUnderline}
            initialPage={0}>
            <View key={'1'} tabLabel={'Quét mã'} style={{flex: 1}}>
              <ScanCode />
            </View>
            <View key={'2'} tabLabel={'Nhập mã'} style={{flex: 1}}>
              <InputCode/>
            </View>
            <View key={'3'} tabLabel={'Danh mục'} style={{flex: 1}}>
              <Category />
            </View>
          </ScrollAbleTabView>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(ProductContainer);
