import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';
import React, { Component } from 'react';

const t = require('tcomb-form-native');

const Form = t.form.Form

const newUser = t.struct({
  email: t.String,
  password: t.String
})

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      autoCorrect: false
    }
  }
}

export default class RegisterView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props)
    this.state = {
      value: {
        email: '',
        password: ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        email: '',
        password: null
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }

  _handleAdd = () => {
    const value = this.refs.form.getValue();
    const { navigate } = this.props.navigation;
    // If the form is valid...
    if (value) {
      const data = {
        first_name: 'onur',
        last_name: 'cinar',
        email: value.email,
        password: value.password,
      }
      // Serialize and post the data
      const json = JSON.stringify(data);
     // fetch('http://192.168.2.103:3000/users/register', {
      fetch('http://192.168.2.103:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
        .then((response) => response.json())
        .then(() => {
          alert('Success! You may now log in.');
          // Redirect to home screen
          navigate("HomeView");
          //this.props.navigation.navigate.navigate("HomeView");
        })
        .catch((error) => {
          alert('There was an error creating your account.' + error);
        })
        .done()
    } else {
      // Form validation error
      alert('Please fix the errors listed and try again.')
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          ref='form'
          type={newUser}
          options={options}
          value={this.state.value}
          onChange={this._onChange}
        />
        <TouchableHighlight onPress={this._handleAdd}>
          <Text style={[styles.button, styles.greenButton]}>Create account</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
