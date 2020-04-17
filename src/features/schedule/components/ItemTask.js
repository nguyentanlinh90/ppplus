import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import Dash from 'react-native-dash';
import BgButton from '../../../components/BgButton';
import {colors, sizes} from '../../../styles/styles';
import styles from '../styles/styles';
import AnimatedCircularProgress from 'react-native-conical-gradient-progress';

export default class ItemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item, priority_list} = this.props;

    return (
      <View style={styles.itemTaskContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: sizes.s_80}}>
            <Text style={styles.textProgress}>Tiến độ</Text>
            <View style={styles.viewProgress}>
              <View style={styles.viewTextProgress}>
                <Text
                  style={{
                    color: colors.c_727373,
                    fontSize: sizes.s_14,
                    fontWeight: 'bold',
                  }}>
                  {item.task_quest_status.quest_done_number}
                </Text>
                <Text style={{color: colors.c_727373, fontSize: sizes.s_12}}>
                  /{item.task_quest_status.total_quest}
                </Text>
              </View>
              <AnimatedCircularProgress
                size={sizes.s_50}
                width={sizes.s_5}
                fill={
                  (item.task_quest_status.quest_done_number /
                    item.task_quest_status.total_quest) *
                  100
                }
                // prefill={200}
                beginColor={colors.c_f0531d}
                endColor={colors.c_febe10}
                segments={16}
                backgroundColor={colors.c_e6e6e6}
                linecap="round"
              />
            </View>
          </View>
          <View style={styles.viewInfo}>
            <View style={{margin: sizes.s_8, flexDirection: 'row'}}>
              <Image
                source={{uri: item.logo_job_company}}
                style={styles.imageLogo}
              />
              <Text style={styles.textTaskName}>{item.job_name}</Text>
            </View>
            <Text style={styles.textAddress}>{item.job_info}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <BgButton />

          <Text style={styles.textButton}>
            {priority_list[item.priority]}!! 01:32:22
          </Text>
        </TouchableOpacity>
        <Dash
          dashGap={5}
          dashLength={8}
          dashThickness={1}
          dashColor={colors.c_e6e6e6}
          style={{marginStart: sizes.s_40}}
        />
      </View>
    );
  }
}
