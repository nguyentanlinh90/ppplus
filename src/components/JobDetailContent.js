import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import styles from '../features/home/styles/styles';
import BookmarkChecked from './BookmarkChecked';
import BookmarkUnChecked from './BookmarkUnChecked';
import BgButton from './BgButton';
import JobInfo from '../features/home/components/JobInfo';
import JobRequest from '../features/home/components/JobRequest';
import ItemSelectLocation from '../features/home/components/ItemSelectLocation';
import {setGender, handleCheck} from '../utils/utils';

export default class JobDetailContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobBookMark: false,
    };
  }

  render() {
    const {
      item,
      gender_list,
      getWorkingDistrictIds,
      getWorkingTimeIds,
      checkValid,
      handleApplyJob,
      province_list,
      district_list
    } = this.props;
    console.log('linhnt', item.job_detail_lists)

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{borderRadius: 20, marginTop: -30, backgroundColor: '#fff'}}>
        <View style={styles.jobDetailIndicator} />
        <View>
          <View style={[styles.jobDetailTop]}>
            {item.job_company.icon == '' ? (
              <Image
                resizeMode="contain"
                source={require('../assets/images/broken-image.png')}
                style={styles.jobDetailLogo}
              />
            ) : (
              <Image
                resizeMode="contain"
                source={{uri: item.job_company.icon}}
                style={styles.jobDetailLogo}
              />
            )}

            <View style={styles.jobDetailTopInfo}>
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
                <CheckBox
                  onClick={() => {
                    this.setState({jobBookMark: !this.state.jobBookMark});
                  }}
                  isChecked={this.state.jobBookMark}
                  checkedImage={<BookmarkChecked />}
                  unCheckedImage={<BookmarkUnChecked />}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#6D7278', fontSize: 13, marginEnd: 5}}>
                  Độ khó:
                </Text>
                <Text
                  style={{color: '#fa6400', fontSize: 13, fontWeight: 'bold'}}>
                  {item.hard_level}
                </Text>
                <Text style={{color: '#6D7278', fontSize: 13}}>/5</Text>
              </View>
            </View>
          </View>
          <JobRequest
            time={item.start_date + ' - ' + item.end_date}
            position={item.position}
            rankAge={
              item.employee_min_age + ' - ' + item.employee_max_age + ' tuổi'
            }
            gender={setGender(item.employee_gender, gender_list)}
            figure={item.employee_figure}
            height={
              item.employee_min_height +
              ' - ' +
              item.employee_max_height +
              ' cm'
            }
            weight={
              item.employee_min_weight +
              ' - ' +
              item.employee_max_weight +
              ' kg'
            }
            uniform={item.employee_uniform_description}
          />
          <View style={styles.jobDetailViewLine} />
          <JobInfo description={item.description} />
          {item.is_applied ? null : (
            <View>
              <View style={styles.jobDetailViewLine} />
              <View style={{padding: 16}}>
                <Text style={styles.txtJobDetailTitle}>ĐỊA ĐIỂM LÀM VIỆC</Text>
                <Text
                  style={{fontSize: 16, color: '#1c1c1c', marginBottom: 10}}>
                  Chọn địa điểm và thời gian làm việc mong muốn
                </Text>
                <View>
                  <FlatList
                    style={{}}
                    data={item.job_detail_lists}
                    renderItem={({item: rowData, index}) => {
                      return (
                        <ItemSelectLocation
                          province_list={province_list}
                          district_list={district_list}
                          index={index}
                          province_id={rowData.province_id}
                          working_district_list={rowData.working_district_list}
                          working_time_list={rowData.working_time_list}
                          //
                          getWorkingDistrictIds={getWorkingDistrictIds}
                          getWorkingTimeIds={getWorkingTimeIds}
                          checkValid={checkValid}
                        />
                      );
                    }}
                    listKey={(item, index) => 'D' + index.toString()}
                  />
                </View>
              </View>
            </View>
          )}
          <View style={styles.jobDetailViewLine} />
          {item.is_applied ? (
            <View
              style={[styles.jobDetailBoxSubmit, {backgroundColor: '#C7C7C7'}]}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Ứng Tuyển Ngay
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleApplyJob()}
              style={styles.jobDetailBoxSubmit}>
              <BgButton />
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Ứng Tuyển Ngay
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  }
}
