import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, Image} from 'react-native';
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
      city: 'Chọn địa điểm làm việc',
      industry: 'Chọn nhóm ngành',
      isJobLongTerm: false,
      isJobShortTerm: false,
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
    if (this.state.city.includes(citySelect)) {
      this.setState({
        city: this.state.city.replace(citySelect, ''),
      });
    }
    this.setState({
      city: (this.state.city + ', ' + citySelect).replace(
        'Chọn địa điểm làm việc, ',
        '',
      ),
    });
  };

  _selectIndustry = industrySelect => {
    if (this.state.industry.includes(industrySelect)) {
      this.setState({
        industry: this.state.industry.replace(industrySelect, ''),
      });
    }
    this.setState({
      industry: (this.state.industry + ', ' + industrySelect).replace(
        'Chọn nhóm ngành, ',
        '',
      ),
    });
  };

  _openConfirm = () => {
    this.props.navigation.navigate(SCREEN_CONFIRM_INFO);
  };

  _setJobDuration = isLongTerm => {
    if (isLongTerm) this.setState({isJobLongTerm: !this.state.isJobLongTerm});
    else this.setState({isJobShortTerm: !this.state.isJobShortTerm});
  };

  render() {
    const {} = this.props;
    return (
      <View style={{flex: 1}}>
        <Image
          style={{width: '100%', height: '100%', position: 'absolute'}}
          source={require('../../../assets/images/bg.png')}
        />
        <SafeAreaView style={[stylesInfo.container]}>
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
            selectIndustry={this._selectIndustry}
            industry={this.state.industry}
            setJobDuration={this._setJobDuration}
            jobLongTerm={this.state.isJobLongTerm}
            jobShortTerm={this.state.isJobShortTerm}
            openHomeScreen={this._openConfirm}
          />
        </SafeAreaView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, {})(InfoContainer);
