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
} from 'react-native';
import SearchResult from '../components/SearchResult';
import SearchSuggest from '../components/SearchSuggest';
import styles from '../styles/styles';
import {SEARCH_SUGGEST_LIST} from '../../../utils/constants';
import {array} from 'prop-types';
var searchMoreList = [
  'jkhdkajhdakjs',
  'kạhfkjhfkjsdf',
  'fdskjhsdjkfsdjkhfsjkd',
  'jkhdkajhdakjs',
  'kạhfkjhfkjsdf',
  'fdskjhsdjkfsdjkhfsjkd',
];
class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      suggestList: [],
    };
    this._getSuggestList();
  }

  async _getSuggestList() {
    var suggestList = await AsyncStorage.getItem(SEARCH_SUGGEST_LIST);
    if (suggestList && suggestList.length > 0) {
      this.setState({suggestList: JSON.parse(suggestList)});
    }
  }
  _onChangeText(text) {
    this.setState({inputSearch: text});
  }

  _saveSearchSuggest = async (key, array) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(array));
    } catch (error) {
      console.log('linhnt _saveSearchSuggest', error.message);
    }
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
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, backgroundColor: '#d8d8d8'}}>
          <View style={styles.boxImgHeader}>
            <Image
              resizeMode="stretch"
              source={require('../../../assets/images/bg-home-header.png')}
              style={{width: '100%', height: '100%', position: 'absolute'}}
            />
            <View style={styles.viewSearch}>
              <TouchableOpacity style={styles.viewButtonBack}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/ic-back-white.png')}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
              <View style={styles.viewInput}>
                <TextInput
                  autoFocus={true}
                  selectionColor={'#1c1c1c'}
                  style={{color: '#1c1c1c', fontSize: 16}}
                  returnKeyType="search"
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
            {this.state.inputSearch.length > 1 ? (
              <SearchResult />
            ) : (
              <SearchSuggest
                suggestList={this.state.suggestList}
                searchMoreList={searchMoreList}
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
    msg_code: state.home.msg_code,
    message: state.home.message,
    data: state.home.data,
  };
}
export default connect(mapStateToProps, {})(SearchContainer);
