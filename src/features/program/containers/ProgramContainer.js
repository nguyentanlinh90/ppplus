import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScrollAbleTabView from 'react-native-scrollable-tab-view-forked';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';

import styles from '../styles/styles';
import TabApply from '../components/TabApply';
import TabTodo from '../components/TabTodo';
import TabFinish from '../components/TabFinish';
class ProgramContainer extends Component {
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
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/ic-back-black.png')}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>

            <Text style={styles.txtHeader}>Chương trình</Text>
          </View>
          <ScrollAbleTabView
            tabBarTextStyle={{fontWeight: 'normal', fontSize: 20}}
            tabBarInactiveTextColor={'#ABABAB'}
            tabBarActiveTextColor={'#060606'}
            activeTextColor={{}}
            tabBarUnderlineStyle={{
              height: 3,
              backgroundColor: '#FA6400',
              width: 33,
            }}
            tabsContainerStyle={{
              backgroundColor: '#098',
              height: 50,
              width: 100,
            }}
            initialPage={0}>
            <View key={'1'} tabLabel={'Ứng tuyển'} style={{flex: 1}}>
              <TabApply />
            </View>
            <View key={'2'} tabLabel={'Đang làm'} style={{flex: 1}}>
              <TabTodo />
            </View>
            <View key={'3'} tabLabel={'Hoàn thành'} style={{flex: 1}}>
              <TabFinish />
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

export default connect(mapStateToProps, {})(ProgramContainer);
