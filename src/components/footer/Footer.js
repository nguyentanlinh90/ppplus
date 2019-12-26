import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Platform,
} from 'react-native';
import styles from '../../styles/styles';
import * as menu from '../../api/menu';
import {Dimensions} from 'react-native';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {page, navigation} = this.props;
    let data = menu.menu[page];
    let rows = [];
    for (let i = 0; i < data.length; i++) {
      rows.push(
        <TouchableWithoutFeedback
          key={i}
          onPress={() => navigation.navigate(data[i].router)}>
          <View
            style={{
              width: Dimensions.get('window').width / data.length,
            }}>
            {data[i].page == page ? (
              <View
                style={{
                  height: '100%',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  {data[i].page == 'home' ? (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/ic-home-select.png')}
                        style={styles.imgNav}
                      />
                      <View style={styles.circleMenu} />
                    </View>
                  ) : null}
                  {data[i].page == 'message' ? (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/ic-message-select.png')}
                        style={styles.imgNav}
                      />
                      <View style={styles.circleMenu} />
                    </View>
                  ) : null}
                  {data[i].page == 'notification' ? (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/ic-noti-select.png')}
                        style={styles.imgNav}
                      />
                      <View style={styles.circleMenu} />
                    </View>
                  ) : null}
                  {data[i].page == 'profile' ? (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/ic-profile-select.png')}
                        style={styles.imgNav}
                      />
                      <View style={styles.circleMenu} />
                    </View>
                  ) : null}
                </View>
                <Text style={styles.textNavMainActive}>{data[i].name}</Text>
              </View>
            ) : (
              <View style={{
                  height: '100%',
                }}> 
                <View
                  style={{
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  {data[i].page == 'home' ? (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/ic-home-unselect.png')}
                        style={styles.imgNav}
                      />
                      <View style={{width:5,height:5}} />
                    </View>
                  ) : null}
                  {data[i].page == 'message' ? (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/ic-message-unselect.png')}
                        style={styles.imgNav}
                      />
                      <View style={{width:5,height:5}} />
                    </View>
                  ) : null}
                  {data[i].page == 'notification' ? (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/ic-noti-unselect.png')}
                        style={styles.imgNav}
                      />
                      <View style={{width:5,height:5}} />
                    </View>
                  ) : null}
                  {data[i].page == 'profile' ? (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/ic-profile-unselect.png')}
                        style={styles.imgNav}
                      />
                      <View style={{width:5,height:5}} />
                    </View>
                  ) : null}
                </View>
                <Text style={styles.textNavMain}>{data[i].name}</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>,
      );
    }
    return <View style={styles.navMain}>{rows}</View>;
  }
}
