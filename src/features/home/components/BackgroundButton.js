import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class BackgroundButton extends Component {
  makeStyles() {
    return StyleSheet.create({
      view: {
        flexDirection: 'row',
        borderRadius: 23,
        borderColor: this.props.borderColor,
        borderWidth: 1,
        // backgroundColor: this.props.backgroundColor,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
      },
      touchable: {
        marginBottom: 8,
      },
      image: {
        marginRight: 8,
      },
      text: {
        fontSize: 16,
        textAlign: 'center',
        color: this.props.textColor,
      },
    });
  }
  render() {
    const styles = this.makeStyles();
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
        <LinearGradient
          colors={[this.props.backgroundColorStart, this.props.backgroundColor]}
          useAngle={true}
          angle={-90}
          style={styles.view}>
          <Text style={styles.text}>{this.props.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
