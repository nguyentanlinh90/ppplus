import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/styles';
import ArrowUpDown from '../../../components/ArrowUpDown';

export default class JobLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {handlePress, city, district} = this.props;
    return (
      <View style={{padding: 16, backgroundColor:'#fff'}}>
        <Text style={styles.txtJobDetailTitle}>ĐỊA ĐIỂM LÀM VIỆC</Text>
        <TouchableOpacity
          onPress={() => {}}
          style={{marginStart: 16, marginEnd: 16, marginBottom: 16}}>
          <View style={styles.jobDetailIconBoxSelect}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-location.png')}
              style={{width: 24, height: 24}}
            />
            <Text style={styles.jobDetailBoxLocation}>
              {district + ', ' + city}
            </Text>
            <ArrowUpDown />
          </View>
        </TouchableOpacity>
        {/* <FlatList
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          data={item.jobDetails}
          renderItem={({item: rowData}) => {
            return <JobFollowLocationItem item={rowData} />;
          }}
          keyExtractor={(item, index) => index}
        /> */}
      </View>
    );
  }
}
