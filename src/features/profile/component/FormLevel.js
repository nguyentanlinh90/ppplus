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

export default class FormLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  render() {
    const {onChangeText, showLevelSelect, txtLevel, major} = this.props;
    let level = '';
    if (txtLevel == 0) {
      level = 'Trung Học Cơ Sở';
    } else if (txtLevel == 1) {
      level = 'Trung Học Phổ Thông';
    } else if (txtLevel == 2) {
      level = 'Trung Cấp';
    } else if (txtLevel == 3) {
      level = 'Cao Đẳng';
    } else if (txtLevel == 4) {
      level = 'Đại Học';
    } else {
      level = 'Chọn trình độ';
    }

    return (
      <Collapse
        isCollapsed={this.state.isCollapsed}
        onToggle={isCollapsed => this.setState({isCollapsed: isCollapsed})}>
        <CollapseHeader>
          <View style={styles.boxTitleFill}>
            <Text style={styles.txtBasicInfo}>TRÌNH ĐỘ</Text>
            <View style={styles.boxArrow}>
              {this.state.isCollapsedLevel ? <ArrowUp /> : <ArrowDown />}
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={{marginEnd: 16, marginStart: 16, paddingBottom: 20}}>
            <Text style={styles.txtTitleBasicInfo}>Học vấn</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showLevelSelect()}>
              <View style={styles.boxPickerBasicInfo}>
                <Text style={[styles.txtPicker, {color: '#757575'}]}>
                  {level}
                </Text>
                <ArrowUpDown />
              </View>
            </TouchableOpacity>
            <Text style={[styles.txtTitleBasicInfo, {marginTop: 20}]}>
              Chuyên ngành
            </Text>
            <View style={styles.boxPickerBasicInfo}>
              <TextInput
                style={styles.txtInputBasicInfo}
                returnKeyType="done"
                value={major}
                name="major"
                placeholder="Nhập chuyên ngành"
                onChangeText={text => onChangeText(text, 'major')}
              />
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
