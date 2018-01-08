import React, { Component } from 'react';

import {
    Alert,
    StyleSheet,
    View,
    TextInput,
    Text,
    ScrollView,
    ImageBackground,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo';
import Container from '../../components/Container';
import { Button } from "native-base";
import Label from '../../components/Label';
//import Icon from '@expo/vector-icons/FontAwesome';
import Icon from '@expo/vector-icons/Entypo';
export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:null,
            surName:null,
            email:null,
            password:null,
            passwordRep:null
        }
    }
    static navigationOptions = {
        header: null
    };

    validate(name,surname,email,pass,passRep){
        alert('name ='+name+ ', surname ='+surname+', email ='+email+', pass ='+pass+', passREp ='+passRep);
    }

    submit() {
        var name=this.state.name;
        var surName=this.state.surName;
        var email=this.state.email;
        var pass=this.state.password;
        var passRep=this.state.passwordRep;

        validate(name,surName,email,pass,passRep);
return;
alert('girdi');
       // const value = this.refs.form.getValue();
        //const { navigate } = this.props.navigation;
          const data = {
            first_name: name,
            last_name: surName,
            email: email,
            password: pass,
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
              //navigate("HomeView");
              this.props.navigation.navigate.navigate("StepTwo");
            })
            .catch((error) => {
              alert('There was an error creating your account.' + error);
            })
            .done()
        } 
      

    render() {
        let winSize = Dimensions.get('window');
        console.log(`width = ${winSize.width}`);
        return (
            <LinearGradient
                colors={['#f6d1cc', '#d8ddee']}
                style={{ padding: 15, alignItems: 'center', borderRadius: 5, flex: 1 }}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}>
                <ScrollView style={styles.scroll}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: winSize.width - 30, marginTop: 30 }}>
                        <ImageBackground style={{ width: 48, height: 48, marginTop:20}} source={require('../../images/8.png')} />
                        <Text style={[styles.textHeader, {  marginTop: 10 }]}>  Hamile App</Text>
                        <Text style={{ marginBottom: 20, textAlign:'center', marginLeft:30, marginRight:20, marginTop:20 ,color:'grey',
                            fontStyle:'italic', fontSize:15}}>
                             Hamilelik sürecinize dair her şeyi bir uygulama ile takip edin... 
                         </Text>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', width: winSize.width - 60,}}>
                        <TextInput ref='txtName' keyboardType={'default'}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                         underlineColorAndroid={'transparent'} placeholder="Ad" 
                            style={styles.textInput} />
                        <TextInput ref='txSurName' keyboardType={'default'}
                                onChangeText={(surName) => this.setState({ surName })}
                                value={this.state.surName}
                         underlineColorAndroid={'transparent'} placeholder="Soyad" 
                            style={styles.textInput} />
                        <TextInput ref='txtEmail' keyboardType={'email-address'}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                         underlineColorAndroid={'transparent'} placeholder="E-Posta"
                            style={styles.textInput} />
                        <TextInput ref='txtPass' keyboardType={'default'}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                         underlineColorAndroid={'transparent'} password={true} secureTextEntry={true} placeholder="Şifre"
                            style={styles.textInput} />
                        <TextInput ref='txtPassRep' keyboardType={'default'}
                                onChangeText={(passwordRep) => this.setState({ passwordRep })}
                                value={this.state.passwordRep}
                         underlineColorAndroid={'transparent'} password={true} secureTextEntry={true} placeholder="Şifre Tekrar"
                            style={styles.textInput} />
                        </View>
                        <Button full rounded primary
                            style={{ marginTop: 30, width: 60, alignSelf: 'center' }}
                           onPress={this.submit.bind(this)}>
                            <Text>Kayıt Ol</Text>
                        </Button>

                    </View>

                </ScrollView>
            </LinearGradient>

        );
    }
}
const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'transparent',
        flexDirection: 'column'
    },
    textHeader: {
        height: 40,
        fontSize: 30,
        color: 'pink',
        fontWeight: 'bold'
    },
    textInput: {
        height: 20,
        fontSize: 15,
        paddingLeft:10,
        backgroundColor: 'transparent',
        flex: 1,
        borderWidth: 1, 
        borderColor: 'grey', 
        height: 30,
        marginLeft: 10,
        marginTop:20
    }
});

