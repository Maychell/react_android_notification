/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import NotificationsIOS from 'react-native-notifications';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  bodyText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  mainButtonText: {
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  plainButtonText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    margin: 10,
  },
});

export class react_android extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceToken: 'Waiting for device token...',
      notificationReceived: 'No notifications yet...',
      elapsed: 0,
      lastNotification: undefined
    };

    setInterval(this.onTick.bind(this), 1000);

    //Notification register listeners
    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
    NotificationsIOS.requestPermissions();

    //Notification listeners
    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this));
  }

  onTick() {
    this.setState({
      elapsed: this.state.elapsed + 1
    });
  }

  onPushRegistered(deviceToken) {
    console.log('Push-notifications registered!', deviceToken);
    this.setState({
      ...this.state,
      deviceToken: deviceToken
    });
  }

  onPushRegistrationFailed(error) {
    console.error(error);
  }

  handleNotification(notification) {
    this.setState({
      ...this.state,
      notificationReceived: notification.data.default
    });
    // console.log("onNotificationReceived: ", notification);
  }

  onNotificationReceivedForeground(notification) {
    // console.log("Notification Received - Foreground", notification);
    handleNotification(notification);
  }

  onNotificationReceivedBackground(notification) {
    // console.log("Notification Received - Background", notification);
    handleNotification(notification);
  }

  onNotificationOpened(notification) {
    console.log("onNotificationOpened: ", notification);
    this.setState({
      ...this.state,
      lastNotification: notification.getData(),
      notificationRxTime: this.state.elapsed
    });
  }
  
  componentWillUnmount() {
    //Remove notification register listeners
    NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));

    //Remove notification listeners
    NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Wix React Native Notifications</Text>
        <TextInput style={styles.bodyText} value={this.state.deviceToken} />
        <Text style={styles.bodyText}>{this.state.notificationReceived}</Text>
        <Text style={styles.bodyText}>{this.state.initialNotification ? 'Opened from notification' : ''}</Text>
        <Text style={styles.bodyText}>Last notification: {this.state.lastNotification ? '\n'+this.state.lastNotification.body + ` (opened at ''${this.state.notificationRxTime})` : "N/A"}</Text>
        <Text style={styles.bodyText}>Time elapsed: {this.state.elapsed}</Text>
        <Text>{"\n\n"}</Text>
        <TouchableHighlight onPress={() => this.onPostNotification()}>
          <Text style={styles.mainButtonText}>Try Me!</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.onCancelNotification()}>
          <Text style={styles.plainButtonText}>Undo last</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('react_android', () => react_android);
