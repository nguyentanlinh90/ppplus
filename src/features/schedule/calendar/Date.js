import React, {Component} from 'react';
import {Text, TouchableOpacity, Dimensions} from 'react-native';

export default class Date extends Component {
  getContainerStyle = () => ({
    ...styles.container,
    ...(this.props.isActive ? styles.containerActive : {}),
  });

  getDayStyle = () => ({
    ...styles.text,
    ...styles.day,
    ...(this.props.isActive ? styles.textActive : {}),
  });

  getDateStyle = () => ({
    ...styles.text,
    ...styles.date,
    ...(this.props.isActive ? styles.textActive : {}),
  });

  // Call `onRender` and pass component's with when rendered
  onLayout = event => {
    const {index, onRender} = this.props;
    const {
      nativeEvent: {
        layout: {width},
      },
    } = event;
    onRender(index, width);
  };

  // Call `onPress` passed from the parent component when date is pressed
  onPress = () => {
    const {index, onPress} = this.props;
    onPress(index);
  };

  render() {
    const {date} = this.props;
    return (
      <TouchableOpacity
        style={[this.getContainerStyle()]}
        onLayout={this.onLayout}
        onPress={this.onPress}>
        <Text style={this.getDayStyle()}>
          {date.format('ddd').toUpperCase()}
        </Text>
        <Text style={this.getDateStyle()}>{date.format('DD')}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    width: Math.round(Dimensions.get('window').width) / 7,
    paddingVertical: 20,
  },
  containerActive: {
    backgroundColor: '#fa6400',
    borderRadius: 35,
  },
  day: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
  },
  text: {
    color: '#ABABAB',
    textAlign: 'center',
  },
  textActive: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
};
