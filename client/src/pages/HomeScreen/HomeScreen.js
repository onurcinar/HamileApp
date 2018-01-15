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
    Dimensions,
    AsyncStorage
} from 'react-native';
import { LinearGradient } from 'expo';
import Container from '../../components/Container';
import { Button } from "native-base";
//import Icon from '@expo/vector-icons/FontAwesome';
import Icon from '@expo/vector-icons/Entypo';
//import InputValidation from 'react-native-input-validation';
import  KeyboardSpacer from 'react-native-keyboard-spacer';
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMail: true,
            showText: 'Göster',
            eposta:null,
            password:null,
        }
    }
    static navigationOptions = {
        header: null
    };
    componentDidMount = async () => {
      var email = await AsyncStorage.getItem('@HamAppStore:email');
     // alert('Email ='+email);
      if(email==null) this.props.navigation.navigate("Login");
        const data = {
          email:email
         };
         // Serialize and post the data
         const json = JSON.stringify(data); 
      return fetch('http://192.168.2.104:5000/api/getUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: json
        })
          .then((response) => response.json())
          .then((responseJson) => {
            var rValue=responseJson.user.regleValue;
            var rDate=responseJson.user.rDate;
            var week=0;
            var day=0;
            var today= new Date();
            if(rValue==0)
            {
              var regleDate = new Date(rDate);
              regleDate.setMonth(regleDate.getMonth()+9);
             // alert('olası dogum tarihi='+regleDate.toString());
              
              var timeDiff = Math.abs(regleDate.getTime() - today.getTime());
              var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
             // alert('1-Toplam = '+diffDays+', Kalan hafta =' + week + ', kalan gün sayısı ='+day);
            }
            else{
              var possibleBirthDate = new Date(rDate);
              var timeDiff = Math.abs(possibleBirthDate.getTime() - today.getTime());
              var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
             // alert('2- Kalan gün sayısı ='+diffDays);
            }
            week=Math.floor(diffDays/7);
            day=diffDays % 7;
           // alert('user ='+rValue.toString());
          //  alert('result ='+responseJson.user.id);
          this.setState({
            isLoading: false,
            week:week,
            day:day

          }, function() {
             // alert('key ='+accounts);
            // do something with new state
           //alert('result ='+ this.state.dsWorkStates[0].name);
          });
        })
        .catch((error) => {
          console.error(error);
        });
       
    }
    press() {
        var email=this.state.eposta;
        var pass=this.state.password;
        alert('email = ' + email +  '  sifre ='+pass);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            alert("Email is Not Correct");
            this.refs.txtEposta.focus();
        }
        // else if(pass.length<4 ||pass.length>8 )
        // {
        //     alert("Sifre 4 ile 8 karakter arasında olmalıdır");
        //     this.refs.txtPassword.focus();
        // }
        else{
            // Login Start //
           // const { navigate } = this.props.navigation;
            // If the form is valid...
              const data = {
               email:email,
                password: pass
              };
              // Serialize and post the data
              const json = JSON.stringify(data);
        
            //fetch('http://192.168.2.103:3000/users/login', {
              fetch('http://192.168.2.104:5000/api/login', {
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
                    // alert(result);
                    // alert('token = ' + clientId.toString());
                    try {
                      await AsyncStorage.setItem('@HamAppStore:key', clientId.toString());
                    } catch (error) {
                      // Error saving data
                      alert('Set Item error = '+ error);
                    }
                   // AsyncStorage.setItem('key', clientId);
        
                    alert(`Success! You may now access protected content.`);
                    //navigate("HomeView");
                    this.props.navigation.navigate("Profile");
                  }
                })
                .catch((error) => {
                  alert('There was an error logging in.'+ error);
                })
                .done()
            } 
            // Login End //
    }
    submit() {
        this.setState({ showForm: !this.state.showForm });
    }
    showPassword() {
        this.setState({
            showMail: !this.state.showMail,
            showText: this.state.showMail ? 'Gizle' : 'Göster'
        });
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
                <ScrollView scrollEnabled={false} 
                style={[styles.scroll, 
                    { width: winSize.width - 30, marginBottom: 30 }]}>
                        <Text style={styles.textHeader}>Merhaba,</Text>
                        <View style={[styles.textDynamicHeader, {flexDirection:'row', flex:1, justifyContent :'space-around'}]}>
                            
                            <Text>24 Hafta-</Text>
                            <Text>2 Günlük-</Text>
                            <Text>Hamilesin-</Text>
                        </View>
                        <ImageBackground style={{ width: 114, height: 207, alignSelf:'center', marginBottom: 10, marginTop: 10 }} source={require('../../images/1.png')} />
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                            <Icon name="mail" size={30} color="#000" />
                            <TextInput ref='txtEposta' keyboardType={'email-address'}
                                onChangeText={(eposta) => this.setState({ eposta })}
                                value={this.state.eposta}
                                 underlineColorAndroid={'transparent'} placeholder="E-Posta" 
                                 style={[styles.textInput, { borderBottomWidth: 1, borderColor: 'grey', height: 30, marginLeft: 10 }]} /> 
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <Icon name="lock" size={30} color="#000" />
                            <View style={styles.rowLine}>
                                <TextInput ref='txtPassword' underlineColorAndroid={'transparent'} keyboardType={'default'}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                password={this.state.showMail} secureTextEntry={this.state.showMail} placeholder="Şifre" 
                                style={styles.textInput} />
                                <TouchableHighlight onPress={this.showPassword.bind(this)} underlayColor="white">
                                    <View >
                                        <Text style={{ color: 'blue' }}>{this.state.showText}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <Button full rounded primary
                            style={{ marginTop: 30, width: 60, alignSelf: 'center' }}
                            onPress={this.press.bind(this)}>
                            <Text>Giriş</Text>
                        </Button>
                        <View style={{ marginTop: 40, paddingTop: 10, borderStyle: 'dotted', flex: 1, flexDirection: 'row', borderTopWidth: 1, borderColor: 'grey', justifyContent: 'center', width: winSize.width - 30 }}>
                            <Text style={{ color: 'grey' }}> Yeni Kullanıcıysan </Text>
                            <TouchableHighlight style={{ marginLeft: 5 }} underlayColor="white" onPress={() => this.props.navigation.navigate("SignUp")} >
                                <View >
                                    <Text style={{ color: 'blue' }}>Kayıt Ol</Text>
                                </View>
                            </TouchableHighlight>
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
    rowLine:
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 10,
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginLeft: 10
        },
    alignRight: {
        alignSelf: 'flex-end'
    },
    textHeader: {
        height: 30,
        fontSize: 20,
        marginTop:20,
        alignSelf: 'center'
    },
    textDynamicHeader: {
      height: 30,
      marginTop:20,
      alignSelf: 'center'
  },
    textInput: {
        height: 20,
        fontSize: 15,
        backgroundColor: 'transparent',
        flex: 1,
    }
});

