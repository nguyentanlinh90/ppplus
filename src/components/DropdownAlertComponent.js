import React, {Component} from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import styles from '../styles/styles';

export default class DropdownAlertComponent extends Component {
  render() {
    const {ref, dropdown} = this.props;
    return (
      <DropdownAlert
        ref={ref => (dropdown = ref)}
        defaultContainer={styles.defaultContainerDropdown}
        defaultTextContainer={styles.defaultTextContainerDropdown}
      />
    );
  }
}
