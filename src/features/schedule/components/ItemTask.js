import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Dash from 'react-native-dash';
import AnimatedCircularProgress from 'react-native-conical-gradient-progress';
import moment from 'moment';
import BgButton from '../../../components/BgButton';
import {colors, sizes} from '../../../styles/styles';
import styles from '../styles/styles';
import {isEmpty} from '../../../utils/utils';

export default class ItemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerDistance: 0,
    };
  }

  _startInterval = () => {
    this.interval = setInterval(() => {
      if (this.state.timerDistance !== 0) {
        this.setState(prevState => ({
          timerDistance: prevState.timerDistance - 1,
        }));
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  componentDidMount() {
    let alert_time = this.props.item.alert_time;
    if (!isEmpty(alert_time)) {
      let then = moment(alert_time, 'HH:mm:ss');
      let countdown = moment(then);
      let hoursToSeconds = Math.floor(countdown.format('HH') * 3600);
      let minutesToSeconds = Math.floor(countdown.format('mm') * 60);
      let seconds = Math.floor(countdown.format('ss'));

      this.setState(
        {timerDistance: hoursToSeconds + minutesToSeconds + seconds},
        function() {
          this._startInterval();
        },
      );
    }
  }

  _renderTextTimer = () => {
    const {timerDistance} = this.state;
    if (timerDistance != 0) {
      let sec = timerDistance;
      let hours = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
      let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
      // add 0 if value < 10
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
    }
    return '';
  };

  componentDidUpdate() {
    if (this.state.timerDistance === 0) {
      clearInterval(this.interval);
    }
  }

  render() {
    const {item, priority_list, openWebView} = this.props;

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => openWebView(item.task_site_check)}>
          <BgButton />

          <Text style={styles.textButton}>
            {priority_list[item.priority]}!! {this._renderTextTimer()}
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
