import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ArrowUpDown from '../../../components/ArrowUpDown';
import ArrowUp from '../../../components/ArrowUp';
import ArrowDown from '../../../components/ArrowDown';
import styles from '../styles/styles';
import {text_select} from '../../../utils/constants';
import {
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
} from '../../../utils/utils';
export default class FormLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  render() {
    const {onChangeText, showSelectLevel, valueLevel, major} = this.props;
    let txtLevel = '';
    if (valueLevel == 0) {
      txtLevel = 'Trung Học Cơ Sở';
    } else if (valueLevel == 1) {
      txtLevel = 'Trung Học Phổ Thông';
    } else if (valueLevel == 2) {
      txtLevel = 'Trung Cấp';
    } else if (valueLevel == 3) {
      txtLevel = 'Cao Đẳng';
    } else if (valueLevel == 4) {
      txtLevel = 'Đại Học';
    } else {
      txtLevel = text_select;
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
              style={boxSelectStyle(txtLevel != text_select)}
              onPress={() => showSelectLevel()}>
              <Text style={txtInBoxSelectStyle(txtLevel)}>{txtLevel}</Text>
              <ArrowUpDown />
            </TouchableOpacity>
            <Text style={[styles.txtTitleBasicInfo, {marginTop: 20}]}>
              Chuyên ngành
            </Text>
            <TextInput
              style={txtInputStyle(major)}
              returnKeyType="done"
              value={major}
              name="major"
              placeholder="Nhập chuyên ngành"
              onChangeText={text => onChangeText(text, 'major')}
            />
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
