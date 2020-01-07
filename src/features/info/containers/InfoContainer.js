import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../styles/styles';
import stylesInfo from '../styles/styles';
import InfoForm from '../component/InfoForm';
import {SCREEN_CONFIRM_INFO} from '../../../api/screen';

class InfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Tiên',
      lastName: 'Nguyễn Ngọc',
      genderMale: false,
      genderFeMale: false,
      yearOfBirth: new Date().getFullYear() - 18,
      city: 'Hồ Chí Minh',
    };
  }
  _onChangeText = (text, type) => {
    if (type == 'lastName') {
      this.setState({lastName: text});
    } else if (type == 'firstName') {
      this.setState({firstName: text});
    }
  };
  _handleGenderSelect = (isMale, isCheck) => {
    if (isMale) {
      if (isCheck) {
        this.setState({genderMale: true, genderFeMale: false});
      } else {
        this.setState({genderMale: false, genderFeMale: true});
      }
    } else {
      if (isCheck) {
        this.setState({genderMale: false, genderFeMale: true});
      } else {
        this.setState({genderMale: true, genderFeMale: false});
      }
    }
  };

  _selectYearOfBirth = yearSelect => {
    this.setState({yearOfBirth: yearSelect});
  };

  _selectCity = citySelect => {
    this.setState({city: citySelect});
  };

  _openConfirm = () => {
    this.props.navigation.navigate(SCREEN_CONFIRM_INFO);
  };

  render() {
    const {} = this.props;
    return (
      <LinearGradient colors={['#FEBE10', '#F0532D']} style={styles.container}>
        <SafeAreaView style={stylesInfo.container}>
          <InfoForm
            onChangeText={this._onChangeText}
            lastName={this.state.lastName}
            firstName={this.state.firstName}
            genderMale={this.state.genderMale}
            genderFeMale={this.state.genderFeMale}
            handleGenderSelect={this._handleGenderSelect}
            selectYearOfBirth={this._selectYearOfBirth}
            yearOfBirth={this.state.yearOfBirth}
            selectCity={this._selectCity}
            city={this.state.city}
            openHomeScreen={this._openConfirm}
          />
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(InfoContainer);
