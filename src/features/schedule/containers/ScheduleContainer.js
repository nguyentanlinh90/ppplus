import 'react-native-get-random-values';
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Modal from 'react-native-modal';
import styles from '../styles/styles';
import {sizes, colors} from '../../../styles/styles';
import {isEmptyObject} from '../../../utils/utils';
import ItemTask from '../components/ItemTask';
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
