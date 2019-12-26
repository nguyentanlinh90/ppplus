import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text, Image, FlatList
} from 'react-native';
import styleReward from "../styles/styles";
import SelectBox from "../../../components/SelectBox";
import styles from "../../../styles/styles";


class TabReward extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {categories, brands, onChangeBox, category_id, category_name} = this.props;
        return (
            <View style={styleReward.boxSlider}>
                <View style={styleReward.boxSliderTab}>
                    <View style={styleReward.boxCode}>
                        <View style={styleReward.boxStore}>
                            <Image resizeMode="contain" source={require('../../../assets/images/store.png')}/>
                        </View>
                        <View style={{ alignSelf: 'center'}}>
                            <Text style={styleReward.txtGotIt}>GOT IT CODE</Text>
                        </View>
                    </View>
                    <View style={styleReward.boxSelected}>
                        <SelectBox
                            data={categories}
                            onChangeBox={onChangeBox}
                            index={category_id}
                            value={category_name}
                            type={'type'}
                            placeholder={'Chọn ngành hàng'}
                            stylesProps={styles.stylesProps}
                            stylesInput={styles.stylesInput}
                            stylesPickerAndroid={styles.stylePickerAndroid}
                            styleIconArrowDown={styles.iconArrowDown}
                        />
                    </View>
                    <View style={styleReward.boxBrand}>
                        <View>

                            <FlatList
                                data={brands}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => <View>
                                    <Text style={styleReward.txtCate}>{item.categoryName}</Text>
                                    <View style={{height:100, marginTop:10, marginBottom:10}}>
                                        {(item.brands.length > 0)?
                                            (
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    legacyImplementation={false}
                                                    data={item.brands}
                                                    horizontal={true}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item }) =>
                                                        <View>
                                                            {(item)?
                                                                (
                                                                    <View style={{width:100,height:100,backgroundColor:'#fff', borderRadius:6, marginLeft:5, marginRight:5}}>
                                                                        <Image style={{
                                                                            width:100,
                                                                            height:100
                                                                        }} source={{ uri: item.brandImg}} />
                                                                        <Text>{item.brandNm}</Text>
                                                                    </View>
                                                                ):null

                                                            }
                                                        </View>
                                                    }
                                                />
                                            ):null
                                        }
                                    </View>
                                </View>}/>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

export default TabReward;