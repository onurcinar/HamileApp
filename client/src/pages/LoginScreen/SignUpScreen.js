import React, { Component } from 'react';

import {
    Alert,
    StyleSheet,
    View,
    TextInput,
    Text,
    ScrollView,
    AsyncStorage,
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
import  KeyboardSpacer from 'react-native-keyboard-spacer';
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
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(name ==null || name=='') 
        {
           alert('Lütfen Bir Ad Giriniz..');
           this.refs.txtName.focus();
           return false;
        }
        if(surname ==null || surname=='') 
        {
           alert('Lütfen Bir SoyAd Giriniz..');
           this.refs.txtSurName.focus();
           return false;
        }
        if(email ==null || email=='') 
        {
           alert('Lütfen Bir Email Giriniz..');
           this.refs.txtEmail.focus();
           return false;
        }
        if (!reg.test(email)) {
            alert("Email is Not Correct");
            this.refs.txtEmail.focus();
            return false;
        }
        if(pass ==null || pass=='') 
        {
           alert('Lütfen şifre Giriniz..');
           this.refs.txtPass.focus();
           return false;
        }
        if(pass.length<4 ||pass.length>8 )
        {
             alert("Sifre 4 ile 8 karakter arasında olmalıdır");
             this.refs.txtPass.focus();
             return false;
        }
        if(passRep ==null || passRep=='') 
        {
           alert('Lütfen şifre tekrar Giriniz..');
           this.refs.txtPassRep.focus();
           return false;
        }
        if(passRep !=pass) 
        {
           alert('Şifre Tekrarını yanlış girdiniz..');
           this.refs.txtPassRep.focus();
           return false;
        }
        return true;
    }

    submit() {
        var name=this.state.name;
        var surName=this.state.surName;
        var email=this.state.email;
        var pass=this.state.password;
        var passRep=this.state.passwordRep;

      var result= this.validate(name,surName,email,pass,passRep);
      //alert('result ='+result);
      if(!result) return;
       // alert('girdi');
       // const value = this.refs.form.getValue();
        const { navigate } = this.props.navigation;
          const data = {
            first_name: name,
            last_name: surName,
            email: email,
            password: pass,
          }
          // Serialize and post the data
          const json = JSON.stringify(data);
         //fetch('http://10.6.26.116:5000/api/register', {
          fetch('http://192.168.2.104:5000/api/register', {
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
                var result=res.msg;
                if(code!=200)
                {
                    alert(result);
                    return;
                }
              alert('Success! You may now log in.');
              try {
                await AsyncStorage.setItem('@HamAppStore:email', email.toString());
              } catch (error) {
                // Error saving data
                alert('Set Item error = '+ error);
              }
              // Redirect to home screen
              navigate("StepTwo");
              //this.props.navigation.navigate.navigate("StepTwo");
            })
            .catch((error) => {
              alert('There was an error creating your account.' + error);
            })
            .done()
        } 
      

    render() {
        let winSize = Dimensions.get('window');
       // console.log(`width = ${winSize.width}`);
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
                        <TextInput ref='txtSurName' keyboardType={'default'}
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
                    <KeyboardSpacer />
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

