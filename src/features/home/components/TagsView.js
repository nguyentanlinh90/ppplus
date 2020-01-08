import React, {Component} from 'react';
import {View, StyleSheet, Button, Flat} from 'react-native';
import BackgroundButton from '../components/BackgroundButton';

const addOrRemove = (array, item) => {
  const exists = array.includes(item);

  if (exists) {
    return array.filter(c => {
      return c !== item;
    });
  } else {
    const result = array;
    result.push(item);
    return result;
  }
};

export default class TagsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  render() {
    return <View style={styles.container}>{this.makeButtons()}</View>;
  }

  onPress = tag => {
    let selected;
    if (this.props.isExclusive) {
      selected = [tag];
    } else {
      selected = addOrRemove(this.state.selected, tag);
    }

    this.setState({
      selected,
    });
  };

  makeButtons() {
    return this.props.all.map((tag, i) => {
      const on = this.state.selected.includes(tag);
      const backgroundColor = on ? '#F0932D' : '#fff';
      const backgroundColorStart = on ? '#F0532D' : '#fff';
      const textColor = on ? '#fff' : '#757575';
      const borderColor = on ? '#fff' : '#e3e3e3';

      return (
        <BackgroundButton
          backgroundColor={backgroundColor}
          backgroundColorStart={backgroundColorStart}
          textColor={textColor}
          borderColor={borderColor}
          onPress={() => {
            this.onPress(tag);
          }}
          key={i}
          showImage={on}
          title={tag}
        />
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-between',
    padding: 15,
  },
});
