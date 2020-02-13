import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, ScrollView, Image} from 'react-native';
import styles from '../styles/styles';
import InfoForm from '../component/InfoForm';
import {SCREEN_MAIN} from '../../../api/screen';
import {select_location, select_industry} from '../../../utils/constants';
import {dispatchScreen} from '../../../utils/utils';

class InfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Linh',
      lastName: 'Nguyễn Tấn',
      genderMale: false,
      genderFeMale: false,
      yearOfBirth: new Date().getFullYear() - 18,
      city: select_location,
      industry: select_industry,
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
      var cityTemp = this.state.city
        .replace(citySelect + '; ', '')
        .replace('; ' + citySelect, '')
        .replace(citySelect, '');
      if (cityTemp == '') {
        cityTemp = select_location;
      }
      this.setState({city: cityTemp});
      return;
    }
    this.setState({
      city: (this.state.city + '; ' + citySelect).replace(
        select_location + '; ',
        '',
      ),
    });
  };

  _selectIndustry = industrySelect => {
    if (this.state.industry.includes(industrySelect)) {
      var industryTemp = this.state.industry
        .replace(industrySelect + '; ', '')
        .replace('; ' + industrySelect, '')
        .replace(industrySelect, '');
      if (industryTemp == '') {
        industryTemp = select_industry;
      }
      this.setState({industry: industryTemp});
      return;
    }
    this.setState({
      industry: (this.state.industry + '; ' + industrySelect).replace(
        select_industry + '; ',
        '',
      ),
    });
  };

  _openHomeScreen = () => {
    dispatchScreen(this.props, SCREEN_MAIN, {});
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
        <SafeAreaView style={[styles.container]}>
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
            openHomeScreen={this._openHomeScreen}
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
