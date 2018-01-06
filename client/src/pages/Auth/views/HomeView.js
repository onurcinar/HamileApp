import {
  AsyncStorage,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import React, { Component } from 'react';

// const LoginView = require('./LoginView.js')
// const RegisterView = require('./RegisterView.js')
// const ProtectedView = require('./ProtectedView.js')
export default class HomeView extends React.Component {
  static navigationOptions = {
    header: null
  };
  _handleLogOut = () => {
    AsyncStorage.removeItem('@HamAppStore:key');
    alert('You have been logged out.');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate("RegisterView")}>
          <Text style={[styles.button, styles.blueButton]}>
            Register
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate("LoginView")}>
          <Text style={[styles.button, styles.greenButton]}>
            Log In
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._handleLogOut}>
          <Text style={[styles.button, styles.greyButton]}>
            Log Out
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate("ProtectedView")}>
          <Text style={[styles.button, styles.redButton]}>
            Protected Content
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 80,
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  greenButton: {
    backgroundColor: '#4CD964'
  },
  blueButton: {
    backgroundColor: '#34AADC'
  },
  redButton: {
    backgroundColor: '#FF3B30',
    color: '#fff'
  },
  greyButton: {
    backgroundColor: '#777',
    color: '#fff'
  }
});

