import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import JobNewItem from '../../../features/home/components/JobNewItem';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {data, getJobDetail} = this.props;
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
          Có {data.job_data.length} kết quả
        </Text>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          data={data.job_data}
          renderItem={({item: rowData}) => {
            return (
              <TouchableOpacity
                onPress={() => {getJobDetail(rowData.id)}}>
                <JobNewItem item={rowData} province_list={data.province_list} />
              </TouchableOpacity>
            );
          }}
          listKey={(item, index) => 'D' + index.toString()}
        />
      </View>
    );
  }
}
