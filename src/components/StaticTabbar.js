import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, Image} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("window");

interface Tab {
    name: string;
}

interface StaticTabbarProps {
    tabs: Tab[];
    value: Animated.Value;
}

export default class StaticTabbar extends Component {
    values: Animated.Value[] = [];

    constructor(props: StaticTabbarProps) {
        super(props);
        const { tabs } = this.props;
        this.values = tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0));
    }
    componentDidMount(){
        this.onPress(1);
    }

    onPress = (index: number) => {
        const { value, tabs } = this.props;
        const tabWidth = width / tabs.length;
        Animated.sequence([
            Animated.parallel(
                this.values.map(v => Animated.timing(v, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                })),
            ),
            Animated.parallel([
                Animated.spring(value, {
                    toValue: tabWidth * index,
                    useNativeDriver: true,
                }),
                Animated.spring(this.values[index], {
                    toValue: 1,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }

    render() {
        const { onPress } = this;
        const { tabs, value } = this.props;
        return (
            <View style={styles.container}>
                {
                    tabs.map((tab, key) => {
                        const tabWidth = width / tabs.length;
                        const cursor = tabWidth * key;
                        const opacity = value.interpolate({
                            inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
                            outputRange: [1, 0, 1],
                            extrapolate: "clamp",
                        });
                        const translateY = this.values[key].interpolate({
                            inputRange: [0, 1],
                            outputRange: [64, 0],
                            extrapolate: "clamp",
                        });
                        const opacity1 = this.values[key].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            extrapolate: "clamp",
                        });
                        return (
                            <React.Fragment {...{ key }}>
                                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                                    <Animated.View style={[styles.tab, { opacity }]}>
                                        {(tab.position == 1)?
                                            (
                                                <View style={{ alignItems: 'center'}}>
                                                    <Image source={require('../assets/images/line-chart-left.png')}/>
                                                    <Text style={styles.txtVenue}>Doanh thu</Text>
                                                </View>
                                            ):null
                                        }
                                        {(tab.position == 2)?
                                            (
                                                <View style={{ alignItems: 'center'}}>
                                                    <Image source={require('../assets/images/home.png')}/>
                                                    <Text style={styles.txtVenue}>Trang chủ</Text>
                                                </View>
                                            ):null
                                        }
                                        {(tab.position == 3)?
                                            (
                                                <View style={{ alignItems: 'center'}}>
                                                    <Image source={require('../assets/images/line-chart-right.png')}/>
                                                    <Text style={styles.txtVenue}>Tiền thưởng</Text>
                                                </View>
                                            ):null
                                        }
                                    </Animated.View>
                                </TouchableWithoutFeedback>
                                <Animated.View
                                    style={{
                                        position: "absolute",
                                        top: -8,
                                        left: tabWidth * key,
                                        width: tabWidth,
                                        height: 44,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        opacity: opacity1,
                                        transform: [{ translateY }],
                                    }}
                                >
                                    <View style={styles.activeIcon}>
                                        {(tab.position == 1)?
                                            (
                                                <Image source={require('../assets/images/line-chart-left.png')}/>
                                            ):null
                                        }
                                        {(tab.position == 2)?
                                            (
                                                <Image source={require('../assets/images/home.png')}/>
                                            ):null
                                        }
                                        {(tab.position == 3)?
                                            (
                                                <Image source={require('../assets/images/line-chart-right.png')}/>
                                            ):null
                                        }
                                    </View>
                                </Animated.View>
                            </React.Fragment>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 84,
    },
    activeIcon: {
        backgroundColor: "#0097F2",
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    txtVenue:{
        fontSize:16,
        color:'#fff',
        lineHeight:25,
        opacity:0.69
    },
});
