import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  ScrollView,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SpinnerComponent from '../../../components/Spinner';
import SearchResult from '../components/SearchResult';
import SearchSuggest from '../components/SearchSuggest';
import styles from '../styles/styles';
import {SEARCH_SUGGEST_LIST} from '../../../utils/constants';
import {ACCESS_TOKEN} from '../../../utils/constants';
import {searchJobs, searchJobDetail} from '../actions/index';
import {changeMsgCode} from '../../../api/helpers';
import * as types from '../../../api/types';
import {showAlert, showAlertWithPress} from '../../../utils/utils';
import {SCREEN_JOB_DETAIL} from '../../../api/screen';

const screenHeight = Math.round(Dimensions.get('window').height);

var token = '';
var page = 1;

var searchMoreList = [
  'Key test 1',
  'Key test 2',
  'Key test 3',
  'Key test 4',
  'Key test 5',
];
class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isShowSearchSuggest: true,
      inputSearch: '',
      suggestList: [],
      data: {},
      jobDetail: {},
    };
    this._getToken();
    this._getSuggestList();
  }

  async _getToken() {
    token = await AsyncStorage.getItem(ACCESS_TOKEN);
  }
  _onChangeText(text) {
    this.setState({inputSearch: text, isShowSearchSuggest: true});
  }

  async _getSuggestList() {
    var suggestList = await AsyncStorage.getItem(SEARCH_SUGGEST_LIST);
    if (suggestList && suggestList.length > 0) {
      this.setState({suggestList: JSON.parse(suggestList)});
    }
  }

  _saveSearchSuggest = async (key, array) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(array));
    } catch (error) {}
  };

  _onSubmitSearch = () => {
    const {inputSearch} = this.state;
    if (inputSearch.length > 1) {
      const {suggestList} = this.state;
      var temp = suggestList;
      //save max 3 items
      if (temp.length == 3) {
        temp.splice(2, 1); // delete the last item
      }
      //add item to the top of list
      temp.unshift(inputSearch);
      this._saveSearchSuggest(SEARCH_SUGGEST_LIST, temp);
      this.setState({suggestList: temp});

      this._startSearch(inputSearch);
    }
  };

  _startSearch = inputSearch => {
    //start search
    this.setState({isLoading: true});
    const {searchJobs} = this.props;
    var params = page + '&key_words=' + inputSearch;
    if (token != '') {
      searchJobs(token, params);
    }
  };

  _onSearch = key_words => {
    this.setState({inputSearch: key_words});
    this._startSearch(key_words);
  };

  _searchJobDetail = id => {
    const {searchJobDetail} = this.props;
    this.setState({isLoading: true});
    searchJobDetail(token, id);
  };
  _gotoJobDetail = data => {
    this.props.navigation.navigate(SCREEN_JOB_DETAIL, [data, token]);
  };

  _hideLoading = () => {
    this.setState({isLoading: false});
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.msg_code == types.SEARCH_JOBS_SUCCESS) {
      this.setState({
        isShowSearchSuggest: false,
        data: nextProps.data,
      });
      this._hideLoading();
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.SEARCH_JOBS_FAIL) {
      showAlertWithPress(nextProps.message, this._hideLoading);
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.SEARCH_JOBS_DETAIL_SUCCESS) {
      //setState method doesn't mutate the state immediately
      this.setState({jobDetail: nextProps.data}, function() {
        // //so we must waiting setState done
        this._gotoJobDetail(this.state.jobDetail);
      });
      this._hideLoading();
      nextProps.changeMsgCode('');
    } else if (nextProps.msg_code == types.SEARCH_JOBS_DETAIL_FAIL) {
      showAlertWithPress(nextProps.message, this._hideLoading);
      nextProps.changeMsgCode('');
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, backgroundColor: '#d8d8d8'}}>
          <SpinnerComponent visible={this.state.isLoading} />
          <View style={styles.boxImgHeader}>
            <Image
              resizeMode="stretch"
              source={require('../../../assets/images/bg-home-header.png')}
              style={{width: '100%', height: '100%', position: 'absolute'}}
            />
            <View style={styles.viewSearch}>
              <TouchableOpacity
                style={styles.viewButtonBack}
                onPress={() => this.props.navigation.goBack()}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-back-white.png')}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
              <View style={styles.viewInput}>
                <TextInput
                  selectionColor={'#1c1c1c'}
                  style={{color: '#1c1c1c', fontSize: 16}}
                  returnKeyType="search"
                  value={this.state.inputSearch}
                  onChangeText={text => this._onChangeText(text)}
                  onSubmitEditing={event => this._onSubmitSearch()}
                />
              </View>
              <TouchableOpacity style={styles.viewButtonFilter}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-filter.png')}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            {this.state.isShowSearchSuggest ? (
              <SearchSuggest
                suggestList={this.state.suggestList}
                searchMoreList={searchMoreList}
                onSearch={this._onSearch}
              />
            ) : (
              <SearchResult
                data={this.state.data}
                getJobDetail={this._searchJobDetail}
              />
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg_code: state.search.msg_code,
    message: state.search.message,
    data: state.search.data,
  };
}
export default connect(
  mapStateToProps,
  {
    changeMsgCode,
    searchJobs,
    searchJobDetail,
  },
)(SearchContainer);
