import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
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
    const {description} = this.props;
    return (
      <View>
        {/* {this.state.isSeeMore ? ( */}
          <View style={styles.viewJobDetailItem}>
            <Text style={styles.txtJobDetailTitle}>THÔNG TIN CHI TIẾT</Text>
            <Text style={styles.txtJobDetailContent}>{description}</Text>
          </View>
        {/* ) : (
          <View style={styles.viewJobDetailItem}>
            <Text style={styles.txtJobDetailTitle}>THÔNG TIN CÔNG VIỆC</Text>
            <Text style={styles.txtJobDetailContent}>
              - Giới thiệu và quảng bá sản phẩm của công ty {'\n'}- Tư vấn và
              bán hàng ĐTDĐ OPPO
            </Text>
          </View>
        )} */}

        {/* <ButtonSeeMore
          isSeeMore={this.state.isSeeMore}
          handlePress={this._handlePress}
        /> */}
      </View>
    );
  }
}
