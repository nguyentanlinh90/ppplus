import 'react-native-get-random-values';
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
// import DatePicker from "react-horizontal-datepicker";
import styles from '../styles/styles';
import {isEmptyObject} from '../../../utils/utils';
import ItemTask from '../components/ItemTask';
import {colors, sizes} from '../../../styles/styles';

export default class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const {firstName, dataSchedule, openWebView} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text style={styles.title}>Lịch làm việc của {firstName}</Text>
        <View
          style={styles.viewFilter}>
          <TouchableOpacity style={styles.viewButtonList}>
            <Image
              resizeMode="center"
              source={require('../../../assets/images/ic-list-black.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>
          <View
            style={styles.boxFilter}>
            <Text
              style={styles.textFilter}>
              LỌC
            </Text>
            <Image
              resizeMode="center"
              source={require('../../../assets/images/ic-filter-black.png')}
              style={styles.imageIcon}
            />
          </View>
        </View>
        <ScrollView>
          {!isEmptyObject(dataSchedule) && dataSchedule.task_list.length > 0 ? (
            <FlatList
              data={dataSchedule.task_list}
              renderItem={({item: rowData}) => {
                return (
                  <ItemTask
                    item={rowData}
                    priority_list={dataSchedule.priority_list}
                    openWebView={openWebView}
                  />
                );
              }}
              listKey={(item, index) => 'D' + index.toString()}
            />
          ) : (
            <Text style={{alignSelf: 'center', fontSize: sizes.s_20}}>
              Bạn không có lịch làm việc
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
