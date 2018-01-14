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
    Picker,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { LinearGradient } from 'expo';
import Container from '../../components/Container';
import { Button } from "native-base";
import Label from '../../components/Label';
import DatePicker from 'react-native-datepicker';
//import Icon from '@expo/vector-icons/FontAwesome';
import Icon from '@expo/vector-icons/Entypo';
import  KeyboardSpacer from 'react-native-keyboard-spacer';
export default class StepTwo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedBabySex:0,
            name:null
        }
    }
    static navigationOptions = {
        header: null
    };
    validate(name,sex){
        if(name ==null || name=='') 
        {
           alert('Lütfen Bebeğin Adını Giriniz..');
           this.refs.txtName.focus();
           return false;
        }
        if(sex ==null ) 
        {
           alert('Lütfen Bebeğin Cinsiyetini Giriniz..');
           return false;
        }
        return true;
    }

    submit = async () => {
        var name=this.state.name;
        var sex=this.state.selectedBabySex;
        var email = await AsyncStorage.getItem('@HamAppStore:email');
     //  alert('sex ='+sex+', name='+name);
      var result= this.validate(name,sex);
      //alert('result ='+result);
     if(!result) return;
      const { navigate } = this.props.navigation;
      const data = {
        email:email,
        name: name,
        sex: sex
      }
      // Serialize and post the data
      const json = JSON.stringify(data);
    // fetch('http://192.168.1.71:5000/api/step3', {
      fetch('http://192.168.1.139:5000/api/step3', {
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
          // Redirect to home screen
          navigate("Profile");
          //this.props.navigation.navigate.navigate("StepTwo");
        })
        .catch((error) => {
          alert('There was an error creating your account.' + error);
        })
        .done()
       // alert('ok');
    }
    render() {
        let winSize = Dimensions.get('window');
        //console.log(`width = ${winSize.width}`);
        
        return (
            <LinearGradient
                colors={['#f6d1cc', '#d8ddee']}
                style={{ padding: 15, alignItems: 'center', borderRadius: 5, flex: 1 }}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}>
                <ScrollView style={styles.scroll}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: winSize.width - 30, marginTop: 30 }}>
                        <ImageBackground style={{ width: 48, height: 48, marginTop: 20 }} source={require('../../images/8.png')} />
                        <Text style={[styles.textHeader, { marginTop: 10 }]}>  Hamile App</Text>
                        <Text style={{
                            marginBottom: 20, textAlign: 'center', marginLeft: 30, marginRight: 20, marginTop: 20, color: 'grey',
                            fontStyle: 'italic', fontSize: 15
                        }}>
                            Bebeğine dair bir kaç sorumuz var...
                         </Text>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', width: winSize.width - 60, }}>
                        <View style={{marginTop:20, height:60}}>
                                <Text style={{minHeight:10, color:'grey'}} >Bebeğin Cinsiyeti</Text>
                                <View style={{marginTop:5, borderWidth:1, borderColor:'grey'}}>
                                    <Picker style={{margin:0}}
                                        selectedValue={this.state.selectedBabySex}
                                        onValueChange={ (babySex) => ( this.setState({selectedBabySex:babySex}) ) } >
                                        <Picker.Item key='0' label='Kız' value='0' />
                                        <Picker.Item key='1' label='Erkek' value='1' />
                                    </Picker>
                                </View>
                            </View>
                            <TextInput ref='txtName' keyboardType={'default'}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                         underlineColorAndroid={'transparent'} placeholder="Bebeğin İsmi" 
                            style={styles.textInput} />
                        </View>
                        <Button full rounded primary
                            style={{ marginTop: 30, width: 70, alignSelf: 'center' }}
                            onPress={this.submit.bind(this)}>
                            <Text>Tamamla</Text>
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
        paddingLeft: 10,
        backgroundColor: 'transparent',
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
        height: 30,
        marginTop: 30
    }
});

