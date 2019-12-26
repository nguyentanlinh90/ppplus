import React, {Component} from 'react'
import {View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList} from 'react-native';
import styles from '../../../styles/styles';
import {connect} from "react-redux";
import stylesHome from "../styles/styles";
import styleUser from "../../user/styles/styles";
import Back from "../../../components/Back";

class MechanismContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {revenue} = this.props;
        return (
            <View style={styles.body}>
                <SafeAreaView style={styles.container}>
                    <View style={styleUser.boxHistory}>
                        <Back navigation = {this.props.navigation} title={'Cơ chế'} styleTitle={styleUser.styleTitle}/>
                    </View>
                    <View style={{marginLeft:10, marginRight:10, height:'100%', flex:1}}>
                        <ScrollView style={{height:'100%'}}>
                            <Text style={stylesHome.txtRegulation}>Khách hàng lựa chọn tham gia Chương trình</Text>
                            <View style={[stylesHome.boxRow, {marginTop: 0}]}>
                                <Text style={{fontWeight: 'bold'}}>{'\u2022'}</Text>
                                <Text style={stylesHome.txtCoChe}>Khách hàng tham gia Chương trình Đối tác Chiến lược của NPP và Công ty P&G Vietnam là các Khách hàng Lẻ lớn có Mức đóng góp Doanh số cao của Công ty trong thời gian qua và là các Khách hàng quan trọng hàng đầu của Công ty.</Text>
                            </View>
                            <Text style={[stylesHome.txtRegulation, {marginTop: 5}]}>Quyền lợi của Khách hàng Đối tác Chiến lược</Text>
                            <View style={[stylesHome.boxRow, {marginTop: 0}]}>
                                <Text style={{fontWeight: 'bold'}}>{'\u2022'}</Text>
                                <Text style={stylesHome.txtCoChe}>Được tham gia trưng bày SAO theo mức đầu tư cao nhất của Công ty và được chăm sóc trưng bày & dịch vụ bởi NVBB & NVKD hàng tuần.</Text>
                            </View>
                            <View style={[stylesHome.boxRow, {marginTop: 0}]}>
                                <Text style={{fontWeight: 'bold'}}>{'\u2022'}</Text>
                                <Text style={stylesHome.txtCoChe}>Được  hỗ trợ cài đặt Ứng dụng phần mềm gọn nhẹ & dễ sử dụng trên Điện thoại Smartphone của Khách hàng để được cập nhật kết quả Doanh số hàng tuần/tháng. </Text>
                            </View>
                            <View style={[stylesHome.boxRow, {marginTop: 0}]}>
                                <Text style={{fontWeight: 'bold'}}>{'\u2022'}</Text>
                                <Text style={stylesHome.txtCoChe}>Được hưởng thêm Tiền Thưởng theo % Doanh số thực đạt tháng( ngoài các Chương trình qui định chung hàng tháng của Công ty) bằng các Quà tặng hấp dẫn như Phiếu mua hàng online, Thẻ cào điện thoại, Dịch vụ & ăn uống tiện ích,… khi đạt được Chỉ tiêu tăng trưởng Doanh số hàng tháng đề ra( % Giá trị Tiền thưởng tương ứng bằng Quà tặng và Chỉ tiêu tăng trưởng/Kết quả doanh số sẽ được thông báo  bởi Nhân viên phụ trách Kinh doanh hàng tháng và được cập nhật trên Ứng dụng Phần mềm cài đặt của Điện thoại Smartphone của Khách hàng).</Text>
                            </View>
                            <View style={[stylesHome.boxRow, {marginTop: 0}]}>
                                <Text style={{fontWeight: 'bold'}}>{'\u2022'}</Text>
                                <Text style={stylesHome.txtCoChe}>Được thông báo & cập nhật các Dịch vụ khác từ Công ty (cập nhật kết quả doanh số, Chương trình khuyến mại, thông tin khác,…) thông qua Phần mềm cài đặt trên Điện thoại Smartphone của Khách hàng.</Text>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(MechanismContainer);
