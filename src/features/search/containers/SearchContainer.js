import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from '../styles/styles';
import SpinnerComponent from '../../../components/Spinner';
import {ScrollView} from 'react-native-gesture-handler';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeText = this.onChangeText.bind(this);
  }
  onChangeText = (text, type) => {
    if (type == 'inputSearch') {
      this.setState({inputSearch: text});
    }
  };
  render() {
    const {inputSearch} = this.props;
    return (
      <SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.boxSearch}>
            <Image
              resizeMode="contain"
              style={{marginStart: 16, marginEnd: 10, width: 16}}
              source={require('../../../assets/images/ic-search.png')}
            />

            <TextInput
              style={{marginEnd: 16, flex: 1, fontSize: 16}}
              selectionColor="#000"
              placeholder="Nội dung tìm kiếm"
              onChangeText={text => this.onChangeText(text, 'inputSearch')}
              underlineColorAndroid="transparent"
              value={inputSearch}
              autoFocus={true}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Text style={{color: '#4682B4', fontSize: 16, padding: 16}}>
              Huỷ
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 0.7, backgroundColor: '#d8d8d8'}} />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, {})(MessageContainer);
