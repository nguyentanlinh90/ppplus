import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ArrowUpDown from '../../../components/ArrowUpDown';
import ArrowUp from '../../../components/ArrowUp';
import ArrowDown from '../../../components/ArrowDown';
import styles from '../styles/styles';
import {
  boxSelectStyle,
  txtInBoxSelectStyle,
  txtInputStyle,
  getNameFromId,
  isEmpty,
} from '../../../utils/utils';
export default class FormLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isShowEducation: false,
    };
  }
  _setShowEducation = () => {
    this.setState({
      isShowEducation: !this.state.isShowEducation,
    });
  };

  render() {
    const {
      myScroll,
      handleScrollView,
      enableScrollViewScroll,
      onChangeText,
      education_id,
      education_list,
      education_major_name,
      handleSelectEducation,
    } = this.props;

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
              onPress={() => {
                this.setState({isShowEducation: !this.state.isShowEducation});
              }}
              style={boxSelectStyle(
                this.state.isShowEducation || !isEmpty(education_id),
              )}>
              <Text style={styles.txtSelectStyle}>
                {getNameFromId(education_id, education_list)}
              </Text>
              <ArrowUpDown />
            </TouchableOpacity>
            {this.state.isShowEducation ? (
              <View
                onStartShouldSetResponderCapture={() => {
                  handleScrollView(false);
                  if (
                    myScroll.contentOffset === 0 &&
                    enableScrollViewScroll === false
                  ) {
                    handleScrollView(true);
                  }
                }}>
                <FlatList
                  style={styles.viewSelect}
                  data={education_list}
                  renderItem={({item: rowData}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this._setShowEducation();
                          handleSelectEducation(rowData.id);
                        }}>
                        <View style={styles.infoBoxSelect}>
                          <Text style={styles.txtViewSelect}>
                            {rowData.name}
                          </Text>
                        </View>
                        <View style={styles.lineSelect} />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                />
              </View>
            ) : null}
            <Text style={[styles.txtTitleBasicInfo, {marginTop: 20}]}>
              Chuyên ngành
            </Text>
            <TextInput
              style={[txtInputStyle(education_major_name), {marginBottom: 10}]}
              returnKeyType="done"
              value={education_major_name}
              name="education_major_name"
              placeholder="Nhập chuyên ngành"
              onChangeText={text => onChangeText(text, 'education_major_name')}
            />
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
