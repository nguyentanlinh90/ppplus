import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ArrowUpDown from '../../../components/ArrowUpDown';
import ArrowUp from '../../../components/ArrowUp';
import ArrowDown from '../../../components/ArrowDown';
import styles from '../styles/styles';

export class BasicInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  render() {
    const {onChangeText, contact} = this.props;

    return (
      <Collapse
        isCollapsed={this.state.isCollapsed}
        onToggle={isCollapsed => this.setState({isCollapsed: isCollapsed})}>
        <CollapseHeader>
          <View style={styles.boxTitleFill}>
            <Text style={styles.txtBasicInfo}>ĐỊNH DANH TÀI KHOẢN</Text>
            <View style={styles.boxArrow}>
              {this.state.isCollapsed ? <ArrowUp /> : <ArrowDown />}
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={{marginEnd: 16, marginStart: 16, paddingBottom: 20}}>
            <Text style={styles.txtTitleBasicInfo}>Địa chỉ thường trú</Text>
            <View style={styles.boxPickerBasicInfo}>
              <TextInput
                style={styles.txtInputBasicInfo}
                returnKeyType="done"
                value={contact}
                name="contact"
                placeholder="Nhập số nhà và tên đường"
                onChangeText={text => onChangeText(text, 'contact')}
              />
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
export default BasicInfoForm;
