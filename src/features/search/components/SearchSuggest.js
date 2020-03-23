import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

export default class SearchSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {suggestList, searchMoreList, onSearch} = this.props;
    return (
      <View style={{backgroundColor: '#fff', margin: 6}}>
        {suggestList.length > 0 ? (
          <View>
            <Text style={{margin: 12, fontSize: 14, color: '#757575'}}>
              Tìm kiếm gần đây
            </Text>
            <FlatList
              contentContainerStyle={{
                paddingStart: 38,
                paddingBottom: 10,
              }}
              data={suggestList}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    style={{height: 40, justifyContent: 'center'}}
                    onPress={() => {
                      onSearch(rowData);
                    }}>
                    <Text style={{color: '#1c1c1c', fontSize: 16}}>
                      {rowData}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              listKey={(item, index) => 'D' + index.toString()}
            />
            <View style={{backgroundColor: '#d8d8d8', height: 6}} />
          </View>
        ) : null}
        {searchMoreList.length > 0 ? (
          <View>
            <Text style={{margin: 12, fontSize: 14, color: '#757575'}}>
              Được tìm kiếm nhiều
            </Text>
            <FlatList
              contentContainerStyle={{
                paddingStart: 38,
                paddingBottom: 10,
              }}
              data={searchMoreList}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    style={{height: 40, justifyContent: 'center'}}
                    onPress={() => {}}>
                    <Text style={{color: '#1c1c1c', fontSize: 16}}>
                      {' '}
                      {rowData}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              listKey={(item, index) => 'D' + index.toString()}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
