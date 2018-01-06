import  {
  ActivityIndicator,
  AsyncStorage,
    StyleSheet,
  Text,
  View
} from 'react-native';
import React, { Component } from 'react';

  export default class ProtectedView extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props)
    this.state = {
      showIndicator: false,
      secret: null
    }
  }

  componentWillMount() {
    this.setState({
      showIndicator: true
    }, this._fetchData)
  }

    _fetchData = async () => {
    try {
      const clientId = await AsyncStorage.getItem('@HamAppStore:key');
      const { navigate } = this.props.navigation;
      alert('key = '+ clientId);
      const data = {
        // username: value.email,
        clientId: clientId
      }
      // Serialize and post the data
      const json = JSON.stringify(data)
      // fetch('http://192.168.2.103:3000/protected', {
      fetch('http://192.168.2.103:5000/api/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
        .then((response) => response.json())

        .then((res) => {
          var code = res.code;
          alert('code = '+ code);
          if (code == 200) {
          this.setState({
            secret: code,
            showIndicator: false
          })
        }
          else{
              alert('Please Login...'+ code);
            //this.props.navigation.navigate("LoginView");
            navigate("LoginView");
          }
        })
        .catch(() => {
          alert('There was an error fetching the secret info.')
        })
        .done()
    }
       catch(error) {
      // Error retrieving data
      alert('get item error = '+ error);
    }
  }

  _renderIndicator = () => (
    <ActivityIndicator
      animating
      style={[styles.centering]}
      size='large'
    />
  )

  _renderSecret = () => (
    <Text>
      The secret code is {this.state.secret}
    </Text>
  )

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.showIndicator
            ? this._renderIndicator()
            :
            <Text style={styles.centering}>
              {this.state.secret ? this._renderSecret() : <Text>You are not authorized!</Text>}
            </Text>
        }
      </View>
    )
  }
}

var styles = StyleSheet.create({
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
    backgroundColor: '#34AADC',
  },
  centering: {
    flex: 1,
    paddingTop: 28,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

