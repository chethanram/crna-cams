import React from 'react';
import {
  Button,
  StyleSheet,
  FlatList,
  Text,
  View,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import { getAccountList } from '../api/account';

class AccountListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Accounts',
      headerRight: (
        <Button
          title="Map"
          onPress={() => navigation.navigate('accountListMap', null)}
        />
      )
    };
  };

  componentWillMount() {
    this._refreshAccountList();
  }

  _refreshAccountList = () => {
    this.setState({ loading: true });

    const { settings } = this.props;
    const baseUrl = settings.useMockData ? null : settings.apiUrl;
    getAccountList(baseUrl).then(value =>
      this.setState({ loading: false, accountList: value })
    );
  };

  _keyExtractor = (item, index) => item.id; // eslint-disable-line no-unused-vars

  _renderItem = ({ item }) =>
    <ListItem
      onPress={() =>
        this.props.navigation.navigate('accountDetail', { account: item })}
      title={item.name}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.ratingText}>
            {item.notes}
          </Text>
        </View>
      }
    />;

  render() {
    return this.state.loading
      ? <ActivityIndicator size="large" />
      : <View style={styles.container}>
          <SearchBar noIcon lightTheme placeholder="" />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this._refreshAccountList}
              />
            }
            data={this.state.accountList}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gray: {
    backgroundColor: '#cccccc'
  },
  horizontal: {
    flexDirection: 'row'
  }
});

const mapStateToProps = ({ settings }) => {
  return { settings };
};

export default connect(mapStateToProps)(AccountListScreen);
