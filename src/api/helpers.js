import * as apiVersion from './version';
import {AsyncStorage, Dimensions, Platform} from "react-native";
import {API_HOSTNAME} from './constants';
import VersionNumber from 'react-native-version-number';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getBottomSpace} from "react-native-iphone-x-helper";

const appVersion = VersionNumber.appVersion;


export const fetchDataSuccess = (type, data) => ({type: type, data});

export const getApiPath = (version, apiName) => {
    return apiVersion.version[version][apiName].path;
}

export const storeData = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
        console.log(error.message);
    }
}

export const convertObjectToStringQuery = (object) => {
    let formBody = [];

    for (let property in object) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(object[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    return formBody = formBody.join("&");
}
export const formatMoney = (money) => {
    let n = money,
        s = n < 0
            ? "-"
            : "",
        i = parseInt(n = Math.abs(+ n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3
            ? j % 3
            : 0;

    let c = 0;
    let d = ",";
    let t = ",";

    return s + (j
        ? i.substr(0, j) + t
        : "") + i
        .substr(j)
        .replace(/(\d{3})(?=\d)/g, "$1" + t) + (c
        ? d + Math.abs(n - i).toFixed(c).slice(2)
        : "");
}

export const getUrl =(path)=>{
    return API_HOSTNAME+path;
}

export const formatTextUpCaseFirst = (str) => {
    if (typeof str == "string") {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1).toLowerCase();
        }
        return splitStr.join(' ');
    }
    return '';
}

export const strSlice = (string, num) => {
    if (string.length > num) {
        string = string.slice(0, num) +'...';
    }
    return string;
}

export const convertPhone = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (let i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }
    return newText;
}

export const getSizeTabCode=()=>{
    const { height } = Dimensions.get('window');

    if(height >= 640 && height <= 740){
        if(Platform.OS === 'ios'){
            if(height < 736){
                return hp('4.6%');
            }else{
                return hp('5%');
            }
        }else{
            return hp('4.4%');
        }
    }else if(height >= 740 && height <= 812){
        if(Platform.OS === 'ios'){
            return hp('4.6%');
        }else{
            return hp('5.1%');
        }
    }else if(height >= 813 && height <= 853){
        return hp('5%');
    }
    else if(height >= 854 && height <= 896){
        return hp('4.8%');
    } else{
        return hp('5%');
    }
}

export const getSizeTabScan=()=>{
    const { height } = Dimensions.get('window');

    if(height >= 640 && height <= 740){
        return hp('62%');
    }else if(height >= 740 && height <= 812){
        return hp('55%');
    }else if(height >= 813 && height <= 853){
        return hp('53%');
    }
    else if(height >= 854 && height <= 896){
        return hp('53%');
    }
    else{
        return hp('62%');
    }
}

export const getSizeButton=()=>{
    const { height } = Dimensions.get('window');

    if(height >= 640 && height < 731){
        if(Platform.OS === 'ios'){
            return hp('22%');
            //iphone 7, 8
        }else{
            return hp('19%');
        }
    }else if(height >= 732 && height <= 740){
        if(Platform.OS === 'ios'){
            return hp('23%');
        }else{
            return hp('24%');
        }
    } else if(height >= 740 && height <= 812){
        return hp('29%');
    }else if(height >= 813 && height <= 853){
        return hp('30%');
    } else if(height >= 854 && height <= 896){
        return hp('32%');
    } else{
        return hp('30%');
    }
}


export const getSizeCard=()=>{
    const { height } = Dimensions.get('window');

    if(height >= 640 && height < 731){
        if(Platform.OS === 'ios'){
            return hp('13%');
            //iphone 7, 8
        }else{
            return hp('10%');
        }
    }else if(height >= 732 && height <= 740){
        if(Platform.OS === 'ios'){
            return hp('14%');
        }else{
            return hp('14%');
        }
    } else if(height >= 740 && height <= 812){
        return hp('21%');
    }else if(height >= 813 && height <= 853){
        return hp('22%');
    } else{
        return hp('25%');
    }
}

export const getTopCamera=()=>{
    const { height } = Dimensions.get('window');

    if(height >= 640 && height < 731){
        if(Platform.OS === 'ios'){
            return -55;
            //iphone 7, 8
        }else{
            return -55;
        }
    }else if(height >= 732 && height <= 740){
        if(Platform.OS === 'ios'){
            return -55;
        }else{
            return -50;
        }
    } else if(height >= 740 && height <= 812){
        return -90;
    }else if(height >= 813 && height <= 853){
        return -115;
    } else{
        return -90;
    }
}

export const getSizeBoxRegulation=()=>{
    const { height } = Dimensions.get('window');

    if(height <= 639){
        if(Platform.OS === 'android'){
            return hp('20%');
        }else{
            return hp('21%');
        }
    }else if(height >= 640 && height < 731){
        if(Platform.OS === 'ios'){
            return hp('22%');
            //iphone 7, 8
        }else{
            return hp('22%');
        }
    }else if(height >= 732 && height <= 740){
        if(Platform.OS === 'ios'){
            return hp('30%');
        }else{
            return hp('27%');
        }
    } else if(height >= 740 && height <= 812){
        if(Platform.OS === 'ios'){
            return hp('35%');
        }else{
            return hp('33%');
        }
    }else if(height >= 813 && height <= 853){
        if(Platform.OS === 'ios'){
            return hp('41%');
        }else{
            return hp('36%');
        }
    } else{
        if(Platform.OS === 'ios'){
            return hp('42%');
        }else{
            return hp('38%');
        }
    }
}

export  const getSizeIphoneScan =()=>{
    const { height } = Dimensions.get('window');

    if(height >= 640 && height < 731){
       //iphone 6 7
        return -230;
    }else if(height >= 732 && height <= 740){
        return -235;
        //iphone 7 8 plus
    } else if(height >= 740 && height <= 812){
        return -275;
        //iphone x
    }else if(height >= 813 && height <= 896){
        return -310;
        //iphone x, xr, xmas
    } else{
        return -230;
    }
}

export const convertNumber = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (let i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }
    return newText;
}

export const getDenominationTopupGotit=()=>{
    const denomination = [10000, 20000, 30000, 50000, 100000, 200000, 500000];
    return denomination;
}

export const getDenominationVCGotit=()=>{
    const denomination = [10000, 20000, 50000, 100000, 200000, 500000];
    return denomination;
}

export const getDenominationVCCgv=()=>{
    const denomination = [100000];
    return denomination;
}
export const getDenominationVCBigC=()=>{
    const denomination = [50000, 100000, 200000, 500000, 1000000];
    return denomination;
}
export const calculateMoney = (money, denomination) => {
    let minValue = denomination[0];
    let number = 0;

    for(let i = 0; i < denomination.length; i++){
        if(minValue >= denomination[i]){
            minValue = denomination[i];
        }
    }
    if(minValue > 0){
        number = (Math.floor(parseInt(money) / parseInt(minValue)));
    }
    return minValue * number;
}

export const formatRevenue =(total)=>{
    let value = total/1000000;
    if(value >= 1000){
        value = value/1000;
        return value.toFixed(3).toString()+' tỷ';
    }else{
        if(value < 1){
            return formatMoneyCustom((value * 1000000),'.') +' đ';
        }else{
            return value.toFixed(2).toString() +' tr';
        }
    }
}

export const getSizeNav=()=>{
    const { height } = Dimensions.get('window');
    if(Platform.OS === 'android'){
        return 65;
    }else{
        return 55;
    }
}

export const getSizeTopNav =()=>{
    const { height } = Dimensions.get('window');
    if(height >= 812){
        return 20;
    }else{
        return 10;
    }
}
export const getSizeLogo =()=>{
    const { height } = Dimensions.get('window');
    if(height <= 639){
        return 110;
    }else{
        return 170;
    }
}
export const getSizeImageHome =()=>{
    const { height } = Dimensions.get('window');
    if(height <= 639){
        return '56%';
    }else{
        if(height >= 640 && height < 731){
            if(Platform.OS === 'ios'){
                //iphone 6s, 7, 8
                return hp('38%');
            }else{
                return hp('37%');
            }
        }else if(height >= 732 && height <= 740){
            if(Platform.OS === 'ios'){
                //6s plus, 7 plus, 8 plus
                return hp('34%');
            }else{
                return hp('30%');
            }
        } else if(height >= 740 && height <= 812){
            if(Platform.OS === 'ios'){
                return hp('32%');
            }else{
                return hp('33%');
            }
        }else if(height >= 813 && height <= 853){
            if(Platform.OS === 'ios'){
                return hp('30%');
            }else{
                return hp('30%');
            }
        } else{
            if(Platform.OS === 'ios'){
                return hp('28%');
            }else{
                return hp('28%');
            }
        }
    }
}

export const getSizeMenu =()=>{
    const { height } = Dimensions.get('window');
    if(Platform.OS == 'android'){
        return 120;
    }else{
        if(height >= 812){
            return 130;
        }else{
            return 120;
        }
    }
}

export const formatMoneyCustom = (money, character) => {
    let n = money,
        s = n < 0
            ? "-"
            : "",
        i = parseInt(n = Math.abs(+ n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3
            ? j % 3
            : 0;

    let c = 0;
    let d = ",";
    let t = ""+character+"";

    return s + (j
        ? i.substr(0, j) + t
        : "") + i
        .substr(j)
        .replace(/(\d{3})(?=\d)/g, "$1" + t) + (c
        ? d + Math.abs(n - i).toFixed(c).slice(2)
        : "");
}

export const checkPrice =(branch, amount)=> {
    console.log(branch);
    let flag = false;
    if(branch == 'gotit'){
        if(amount % 10000 === 0){
            flag = true;
        }
    }else if(branch == 'cgv'){
        if(amount % 100000 === 0){
            flag = true;
        }
    }else if(branch == 'bigc'){
        if(amount % 50000 === 0){
            flag = true;
        }
    }
    return flag;
}

export const getVersion = ()=>{
    const version = VersionNumber.appVersion;
    return version;
}
