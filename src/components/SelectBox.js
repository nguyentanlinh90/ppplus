import React, {Component} from 'react';
import {View, Picker, Platform, TextInput} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import ModalSelector from 'react-native-modal-selector';
import styles from '../styles/styles';

export default class SelectBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: this.props.index,
            value: this.props.value
        };
        this.onChangeSelectBox = this.onChangeSelectBox.bind(this);
    }

    onChangeSelectBox = (option) => {
        const {onChangeBox} = this.props;
        this.setState({key: option.key, value: option.label});
        onChangeBox(option.key, option.label);
    }

    componentWillReceiveProps(nextProps) {
        if (Platform.OS === 'android') {
            if (nextProps.data.length != 0) {
                for (let i = 0; i < nextProps.data.length; i++) {
                    if (nextProps.index == nextProps.data[i].key) {
                        this.setState({key: nextProps.data[i].key});
                    }
                }
            }
        } else if (Platform.OS == 'ios') {
            this.setState({value: nextProps.value});
        }
    }

    render() {
        const {data, onChangeBox, placeholder, stylesProps, stylesInput, stylesPickerAndroid, styleIconArrowDown} = this.props;
        const rows = [];

        if (Platform.OS === 'android') {
            if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    rows.push(<Picker.Item key={i} label={data[i].value.toString()} value={data[i].key}/>);
                }
            }
        } else {
            if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].key == this.state.key) {
                        rows.push({
                            key: data[i].key, section: true, label: data[i].value
                        });
                    } else {
                        rows.push({
                            key: data[i].key, label: data[i].value
                        });
                    }
                }
            }
        }
        if (Platform.OS === 'android') {
            return (
                <View style={stylesProps}>
                    <Picker
                        selectedValue={this.state.key}
                        mode={"dropdown"}
                        style={[stylesPickerAndroid]}
                        itemStyle={
                            {
                                fontSize: 8
                            }
                        }
                        onValueChange={(itemValue) => onChangeBox(itemValue, '')}>
                        {rows}
                    </Picker>
                </View>
            );
        } else {
            return (
                <View style={stylesProps}>
                    <ModalSelector
                        style={styles.cbbModalIos}
                        data={rows}
                        selectedKey={this.state.key}
                        initValue="Select ...!"
                        supportedOrientations={['portrait']}
                        accessible={true}
                        cancelText={'Hủy'}
                        onChange={(option)=> this.onChangeSelectBox(option)}>

                        <TextInput
                            style={stylesInput}
                            editable={false}
                            placeholder= {placeholder}
                            value={this.state.value.toString()} />

                        <View style={styleIconArrowDown}>
                            <Icon name={'ios-arrow-down'} size={12} color={'#333333'} />
                        </View>
                    </ModalSelector>
                </View>
            );
        }

    }
}