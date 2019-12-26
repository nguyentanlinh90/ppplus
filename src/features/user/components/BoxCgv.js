import React, {Component, Fragment} from 'react'
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import styleUser from '../styles/styles';
import stylesHome from "../../home/styles/styles";

export default class BoxCgv extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {voucher} = this.props;
        return (
            <View style={{height:'100%'}}>
                <View style={{backgroundColor:'#fafafa'}}>
                    <View style={stylesHome.boxRegulationChild}>
                        <Text style={stylesHome.txtRegulation}>Điều kiện và hướng dẫn sử dụng</Text>
                        <ScrollView>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Mỗi coupon CGV tương đương với gía trị 100.000đ của Got It. Mã coupon đúng là 1 dãy số gồm 12 chữ số bắt đầu từ 0xxxxxxxxxxx</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Vé xem phim được áp dụng cho các phim 2D (không áp dụng cho rạp chiếu đặc biệt như rạp 4DX, rạp Gold Class, rạp IMAX, rạp L’amour, Sweetbox…).</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Vé xem phim có giá trị sử dụng cho tất cả các ngày trong tuần, kể cả các dịp lễ, tết.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Vé xem phim sử dụng cho hình thức đặt vé trực tuyến trên trang chủ www.cgv.vn hoặc ứng dụng điện thoại CGV Cinemas và mua vé trực tiếp tại quầy.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Vé xem phim chỉ áp dụng cho ghế thường và ghế VIP.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Vé xem phim không được nhượng bán hay quy đổi thành tiền.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Vé xem phim không áp dụng đồng thời với các chương trình khuyến mãi khác tại rạp.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Got It không chịu trách nhiệm về việc sử dụng, định đoạt Vé xem phim khi đã giao toàn bộ Vé xem phim cho khách hàng.</Text>
                            </View>
                            <View style={stylesHome.boxRow}>
                                <Text>{'\u2022'}</Text>
                                <Text style={stylesHome.txtRow}>Việc sử dụng Vé xem phim phải được thực hiện đúng theo quy định và quy chế của CGV; và các quy định khác của CGV (nếu có).</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}
