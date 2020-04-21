import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Date from '../calendar/Date';
export default class Dates extends Component {
  render() {
    const {currentDateIndex, dates, onSelectDay, onRenderDay} = this.props;
    return (
      <View style={styles.container}>
        {dates.map((date, index) => (
          <View key={index}>
            <Date
              date={date}
              index={index}
              isActive={index === currentDateIndex}
              onPress={onSelectDay}
              onRender={onRenderDay}
              key={index}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
