import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import JobNewItem from '../../../features/home/components/JobNewItem';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDetail: {},
    };
  }

  render() {
    const {job_data, province_list, getJobDetail} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#fff', marginTop: 6}}>
        <Text
          style={{
            color: '#1c1c1c',
            fontSize: 16,
            fontWeight: 'bold',
            marginStart: 10,
            marginTop: 10,
          }}>
          Có {job_data.length} kết quả
        </Text>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          data={job_data}
          renderItem={({item: rowData}) => {
            return (
              <TouchableOpacity
                onPress={() => {getJobDetail(rowData.id)}}>
                <JobNewItem item={rowData} province_list={province_list} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
