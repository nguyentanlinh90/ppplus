import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import {viewJobDetail} from '../../../utils/utils';
import ButtonSeeMore from '../../../components/ButtonSeeMore';
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
    return (
      <View>
        <View style={viewJobDetail(this.state.isSeeMore)}>
          <Text style={styles.txtJobDetailTitle}>THÔNG TIN CÔNG VIỆC</Text>
          <Text style={styles.txtJobDetailContent}>
            - Giới thiệu và quảng bá sản phẩm của công ty {'\n'}- Tư vấn và bán
            hàng ĐTDĐ OPPO {'\n'}- Ghi nhận thông tin bán hàng, cập nhật thị
            trường {'\n'}- Giải quyết thắc mắc của khách hàng về sản phẩm
          </Text>
        </View>

        <ButtonSeeMore
          isSeeMore={this.state.isSeeMore}
          handlePress={this._handlePress}
        />
      </View>
    );
  }
}
