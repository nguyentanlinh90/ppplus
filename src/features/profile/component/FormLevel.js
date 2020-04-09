import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
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
  boxSelectStyleWithAlert,
  getNameFromId,
  isEmpty,
} from '../../../utils/utils';
export default class FormLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isShowEducation: false,
      isSelectMajor: true,
    };
  }
  _setShowEducation = () => {
    this.setState({
      isShowEducation: !this.state.isShowEducation,
    });
  };

  _setShowMajor = () => {
    this.setState({
      isShowMajor: !this.state.isShowMajor,
    });
  };

  render() {
    const {
      myScroll,
      handleScrollView,
      enableScrollViewScroll,
      education,
      education_list,
      major_list_follow_education,
      handleSelectEducation,
      handleSelectMajor,
    } = this.props;
    return (
      <Collapse
        isCollapsed={this.state.isCollapsed}
        onToggle={isCollapsed => this.setState({isCollapsed: isCollapsed})}>
        <CollapseHeader>
          <View style={styles.boxTitleFill}>
            <Text style={styles.txtBasicInfo}>TRÌNH ĐỘ</Text>
            <View style={styles.boxArrow}>
              {this.state.isCollapsed ? <ArrowUp /> : <ArrowDown />}
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={{marginEnd: 16, marginStart: 16, paddingBottom: 20}}>
            <View
              style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
              <Text style={styles.txtTitleBasicInfo}>Học vấn: </Text>
              <View style={{flex: 1, marginStart: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this._setShowEducation();
                  }}
                  style={boxSelectStyleWithAlert(
                    this.state.isShowEducation ||
                      !isEmpty(education.education_id),
                  )}>
                  <Text style={styles.txtSelectStyle}>
                    {getNameFromId(education.education_id, education_list)}
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
                      listKey={(item, index) => 'D' + index.toString()}
                    />
                  </View>
                ) : null}
              </View>
            </View>

            {major_list_follow_education.length > 0 ? (
              <View
                style={{marginBottom: 10, marginTop: 10, flexDirection: 'row'}}>
                <Text style={styles.txtTitleBasicInfo}>Chuyên ngành: </Text>
                <View style={{flex: 1, marginStart: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      this._setShowMajor();
                    }}
                    style={boxSelectStyleWithAlert(
                      !isEmpty(education.education_major_id),
                    )}>
                    <Text style={styles.txtSelectStyle}>
                      {getNameFromId(
                        education.education_major_id,
                        major_list_follow_education,
                      )}
                    </Text>
                    <ArrowUpDown />
                  </TouchableOpacity>
                  {this.state.isShowMajor ? (
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
                        data={major_list_follow_education}
                        renderItem={({item: rowData}) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                this._setShowMajor();
                                handleSelectMajor(rowData.id);
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
                        listKey={(item, index) => 'D' + index.toString()}
                      />
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}
