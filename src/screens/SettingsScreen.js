import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Ionicons } from '@expo/vector-icons';

import { loadSettings, saveSettings } from '../utils/localStore';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  componentWillMount() {
    this.setState({ loading: true, settings: {} });
    loadSettings().then(settings =>
      this.setState({ loading: false, settings: settings })
    );
  }

  onChangeUseGoogleMap = () => {
    let newState = this.state;
    newState.settings.useGoogleMap = !newState.settings.useGoogleMap;
    this.setState(newState);
    saveSettings(this.state.settings);
  };

  render() {
    return this.state.loading
      ? <Text>loading...</Text>
      : <View style={styles.container}>
          <View style={styles.container}>
            <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
              {Platform.OS === 'ios' &&
                <SettingsList.Item
                  hasSwitch={true}
                  switchState={this.state.settings.useGoogleMap}
                  switchOnValueChange={this.onChangeUseGoogleMap}
                  hasNavArrow={false}
                  title="Use Google Map"
                />}
              <SettingsList.Item
                title="Navigation"
                titleInfo="Google Map"
                titleInfoStyle={styles.titleInfoStyle}
              />
            </SettingsList>
          </View>
        </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff4'
  }
});
