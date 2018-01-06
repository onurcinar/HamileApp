import  {
  AsyncStorage,
    ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';
import React, { Component } from 'react';
import { resolve } from 'url';

const t = require('tcomb-form-native')

const Form = t.form.Form

const User = t.struct({
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

export default class LoginView extends React.Component {
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
       // username: value.email,
       email:value.email,
        password: value.password
      }
      // Serialize and post the data
      const json = JSON.stringify(data)

    //fetch('http://192.168.2.103:3000/users/login', {
      fetch('http://192.168.2.103:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
        .then((response) => response.json())

        .then(async (res) => {
          var code=res.code;
          var result=res.success;
          var clientId=res.clientId;
        //  alert('sonuc ='+ result);
          if (code!=200) {
           alert(result);
          } else {
            alert(result);
            alert('token = ' + clientId.toString());
            try {
              await AsyncStorage.setItem('@HamAppStore:key', clientId.toString());
            } catch (error) {
              // Error saving data
              alert('Set Item error = '+ error);
            }
           // AsyncStorage.setItem('key', clientId);

            alert(`Success! You may now access protected content.`);
            // Redirect to home screen
            //this.props.navigation.navigate("HomeView");
            navigate("HomeView");
            //this.props.navigator.pop()
          }
        })
        .catch((error) => {
          alert('There was an error logging in.'+ error);
        })
        .done()
    } else {
      // Form validation error
     // alert('6');
      alert('Please fix the errors listed and try again.')
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          ref='form'
          options={options}
          type={User}
          value={this.state.value}
          onChange={this._onChange}
        />
        <TouchableHighlight onPress={this._handleAdd}>
          <Text style={[styles.button, styles.greenButton]}>Log In</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
};

var styles = StyleSheet.create({
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

//module.exports = LoginView
