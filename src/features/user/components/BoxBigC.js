import React, {Component, Fragment} from 'react'
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import styleUser from '../styles/styles';
import stylesHome from "../../home/styles/styles";

export default class BoxBigC extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {voucher} = this.props;
        return (
            <View>
                <View style={[{backgroundColor:'#fafafa'}]}>
                    <View style={stylesHome.boxRegulationChild}>
                        <Text style={stylesHome.txtRegulation}>Điều kiện và hướng dẫn sử dụng</Text>
                        <ScrollView>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Mã BigC chỉ có giá trị sử dụng một lần.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Được áp dụng nhiều mã BigC trên cùng một hóa đơn nhưng giá trị hóa đơn phải lớn hơn hoặc bằng tổng giá trị mã BigC. Tổng giá trị mã BigC trong một hóa đơn không được vượt quá 10 triệu (bao gồm mã BigC do Got It và BigC phát hành).</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Được áp dụng thanh toán cho các sản phẩm đang được khuyến mãi.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Vui lòng xem kỹ thời hạn sử dụng trên mã BigC.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Vui lòng xuất trình mã BigC cho cashier/nhà cung cấp để thực hiện quy đổi. Không xuất trình mã BigC cho cashier/ nhà cung cấp khi khách hàng chưa chắc chắn sử dụng.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Hóa đơn đỏ không được xuất cho phần tiền được thanh toán bằng mã BigC.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Mã BigC không được áp dụng cho chương trình bán sỉ.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Mã BigC được sử dụng thanh toán cho việc mua sản phẩm, không sử dụng cho các dịch vụ tại BigC.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Mã BigC đã mua sẽ không được hoàn lại sau khi đổi và không được bán lại.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Mã BigC không có giá trị quy đổi thành tiền mặt. Khách hàng có thể được yêu cầu trả thêm tiền nếu sử dụng quá giá trị của mã BigC.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Khách hàng có trách nhiệm bảo mật thông tin mã BigC sau khi đặt mua. Got It sẽ không chịu trách nhiệm hoàn trả các mã thẻ bị mất.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Got It không chịu trách nhiệm đối với chất lượng của sản phẩm hoặc dịch vụ được cung cấp cũng như đối với các tranh chấp về sau giữa khách hàng và nhà cung cấp.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Got It có quyền sửa chữa hoặc thay đổi điều khoản và điều kiện mà không thông báo trước.</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}
