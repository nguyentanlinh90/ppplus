import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import {viewJobDetail} from '../../../utils/utils';
import ButtonSeeMore from '../../../components/ButtonSeeMore';
import JobRequestItem from '../components/JobRequestItem';
export default class JobInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSeeMore: false,
    };
  }
  _handlePress = () => {
    this.setState({isSeeMore: !this.state.isSeeMore});
  };
  render() {
    const {time, rankAge, gender, figure, height, weight, uniform} = this.props;
    return (
      <View>
        {this.state.isSeeMore ? (
          <View style={styles.viewJobDetailItem}>
            <Text style={styles.txtJobDetailTitle}>YÊU CẦU</Text>
            <JobRequestItem title="Thời gian" content={time} />
            <JobRequestItem title="Độ tuổi" content={rankAge} />
            <JobRequestItem title="Giới tính" content={gender} />
            <JobRequestItem title="Ngoại hình" content={figure} />
            <JobRequestItem title="Cân nặng" content={height} />
            <JobRequestItem title="Chiều cao" content={weight} />
            <JobRequestItem title="Đồng phục" content={uniform} />
          </View>
        ) : (
          <View style={styles.viewJobDetailItem}>
            <Text style={styles.txtJobDetailTitle}>YÊU CẦU</Text>
            <JobRequestItem title="Thời gian" content={time} />
            <JobRequestItem title="Độ tuổi" content={rankAge} />
          </View>
        )}

        <ButtonSeeMore
          isSeeMore={this.state.isSeeMore}
          handlePress={this._handlePress}
        />
      </View>
    );
  }
}
