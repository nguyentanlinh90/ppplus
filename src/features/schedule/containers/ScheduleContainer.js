import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/styles';
import {sizes} from '../../../styles/styles';
import {isEmptyObject} from '../../../utils/utils';
import ItemTask from '../components/ItemTask';

export default class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  componentDidMount = () => {
    this.props.getTasks();
  };

  render() {
    const {firstName, dataSchedule} = this.props;
    return (
      <SafeAreaView>
        <Text style={styles.title}>Lịch làm việc của {firstName}</Text>
        <ScrollView>
          {!isEmptyObject(dataSchedule) && dataSchedule.task_list.length > 0 ? (
            <FlatList
              data={dataSchedule.task_list}
              renderItem={({item: rowData}) => {
                return <ItemTask item={rowData.job_name} />;
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
