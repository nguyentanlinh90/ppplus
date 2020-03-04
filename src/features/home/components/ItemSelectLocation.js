import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import CBChecked from '../../../components/CBChecked';
import CBUnChecked from '../../../components/CBUnChecked';
import styles from '../styles/styles';
import ArrowUpDown from '../../../components/ArrowUpDown';
import {
  getNameFromId,
  getNamesFromIds,
  getNameDistrictFromId,
  boxSelectStyle,
  getDistrictsFromIds,
  checkIdInIds,
  arrayToString,
  handleCheck,
} from '../../../utils/utils';
export default class ItemSelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDistrict: false,
      isShowTime: false,
      working_districts: [],
      working_times: [],
    };
  }

  _setTextTime = working_times => {
    if (working_times.length == 0) {
      return 'Chọn thời gian làm việc';
    } else {
      return arrayToString(working_times);
    }
  };

  _handleSelectDistrict = districtSelect => {
    const {working_districts} = this.state;

    if (handleCheck(districtSelect, working_districts)) {
      var array = [...working_districts];
      var index = array.indexOf(districtSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({working_districts: array});
      }
    } else {
      working_districts.push(districtSelect);
      this.setState({working_districts: working_districts});
    }
  };

  _handleSelectTime = timeSelect => {
    const {working_times} = this.state;

    if (handleCheck(timeSelect, working_times)) {
      var array = [...working_times];
      var index = array.indexOf(timeSelect);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({working_times: array});
      }
    } else {
      working_times.push(timeSelect);
      this.setState({working_times: working_times});
    }
  };

  render() {
    const {working_districts, working_times} = this.state;
    const {
      index,
      province_id,
      working_district_list,
      working_time_list,
      province_list,
      district_list,
    } = this.props;

    return (
      <View style={{marginBottom: 20}}>
        <Text style={styles.selectLocationTextChoice}>
          Lựa chọn {index + 1}: {getNameFromId(province_id, province_list)}
        </Text>
        <View style={{marginBottom: 15}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({isShowDistrict: !this.state.isShowDistrict});
            }}
            style={boxSelectStyle(
              this.state.isShowDistrict || working_districts.length > 0,
            )}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic-location.png')}
              style={{width: 24, height: 24, marginEnd: 5}}
            />
            <Text style={styles.txtSelectStyle}>
              {getDistrictsFromIds(
                province_id,
                working_districts,
                district_list,
              )}
            </Text>
            <ArrowUpDown />
          </TouchableOpacity>
          {this.state.isShowDistrict ? (
            <FlatList
              style={styles.viewSelect}
              data={working_district_list}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this._handleSelectDistrict(rowData.district_id);
                    }}>
                    <View style={styles.infoBoxSelect}>
                      <Text style={styles.txtViewSelect}>
                        {getNameDistrictFromId(
                          province_id,
                          rowData.district_id,
                          district_list,
                        )}
                      </Text>
                      <View style={styles.selectLocationViewNumberApply}>
                        <View
                          style={{
                            width:
                              (rowData.number_accepted_employees * 150) /
                              rowData.number_employees,
                            height: 20,
                            backgroundColor: '#fa6400',
                            borderRadius: 8,
                          }}
                        />
                        <Text style={styles.selectLocationTextNumberApply}>
                          Đã ứng tuyển {rowData.number_accepted_employees}/
                          {rowData.number_employees}
                        </Text>
                      </View>

                      <CheckBox
                        disabled={true}
                        isChecked={checkIdInIds(
                          rowData.district_id,
                          working_districts,
                        )}
                        checkedImage={<CBChecked />}
                        unCheckedImage={<CBUnChecked />}
                      />
                    </View>
                    <View style={styles.lineSelect} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({isShowTime: !this.state.isShowTime});
          }}
          style={boxSelectStyle(
            this.state.isShowTime || working_times.length > 0,
          )}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/ic-time-gray.png')}
            style={{width: 24, height: 24, marginEnd: 5}}
          />
          <Text style={styles.txtSelectStyle}>
            {this._setTextTime(working_times)}
          </Text>
          <ArrowUpDown />
        </TouchableOpacity>
        {this.state.isShowTime ? (
          <FlatList
            style={styles.viewSelect}
            data={working_time_list}
            renderItem={({item: rowData}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this._handleSelectTime(rowData);
                  }}>
                  <View style={styles.infoBoxSelect}>
                    <Text style={styles.txtViewSelect}>{rowData}</Text>
                    <CheckBox
                      disabled={true}
                      isChecked={checkIdInIds(rowData, working_times)}
                      checkedImage={<CBChecked />}
                      unCheckedImage={<CBUnChecked />}
                    />
                  </View>
                  <View style={styles.lineSelect} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        ) : null}
      </View>
    );
  }
}