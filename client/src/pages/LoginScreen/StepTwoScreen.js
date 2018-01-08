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
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
//import Icon from '@expo/vector-icons/FontAwesome';
import Icon from '@expo/vector-icons/Entypo';
import  KeyboardSpacer from 'react-native-keyboard-spacer';
export default class StepTwo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date:null,
            rBackgroundColor:'blue',
            bBackgroundColor: 'grey',
            bText:'Son Regle Tarihi',
            bDate:null,
            wState:null,
            eState:null,
            rDate:null
        }
    }
    static navigationOptions = {
        header: null
    };

    validate(bDate,wState,eState,rDate){
        if(bDate ==null) 
        {
           alert('Lütfen Doğum Tarihi Giriniz..');
          // this.refs.dpBDate.focus();
           return false;
        }
        if(wState ==null) 
        {
           alert('Lütfen Çalışma Durumunu Giriniz..');
       //    this.refs.drpWState.focus();
           return false;
        }
        if(eState ==null) 
        {
           alert('Lütfen Öğrenim Durumunu Giriniz..');
          // this.refs.drpEState.focus();
           return false;
        }
        if(rDate ==null) 
        {
           alert('Lütfen Regle / Beklenen Doğum Tarihi Giriniz..');
          // this.refs.dpRDate.focus();
           return false;
        }
        return true;
    }
    submit = async () => {
        var bDate=this.state.bDate;
        var wState=this.state.wState;
        var eState=this.state.eState;
        var rDate=this.state.rDate;
        var email = await AsyncStorage.getItem('@HamAppStore:email');
       // alert('bdate ='+bDate+ ', wState ='+ wState+ ', eState ='+eState+', rDate ='+rDate);
        var result=this.validate(bDate,wState,eState,rDate);
       // alert('result ='+result);
       if(!result) return;
       const { navigate } = this.props.navigation;
          const data = {
            email:email,
            bDate: bDate,
            wState: wState,
            eState: eState,
            rDate: rDate
          }
          // Serialize and post the data
          const json = JSON.stringify(data);
         fetch('http://10.6.26.116:5000/api/step2', {
          //fetch('http://192.168.2.103:5000/api/step2', {
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
              navigate("StepThree");
              //this.props.navigation.navigate.navigate("StepTwo");
            })
            .catch((error) => {
              alert('There was an error creating your account.' + error);
            })
            .done()
    }
    setBirthDate(value)
    {
        this.setState({
            rBackgroundColor:value==1?'blue':'grey',
            bBackgroundColor: value == 1 ? 'grey' : 'blue',
            bText: value == 1 ? 'Son Regle Tarihi' :'Beklenen Doğum Tarihi'
        });
    }

    render() {
        let winSize = Dimensions.get('window');
        //console.log(`width = ${winSize.width}`);
        let cData = [{
            value: 'Çalışıyor',
        }, {
            value: 'İşsiz',
        }, {
            value: 'Kararsız',
        }];
        let oData = [{
            value: 'İlkokul',
        }, {
            value: 'Ortaokul',
        }, {
            value: 'Lise',
        }, {
                value: 'Üniversite',
        }, {
            value: 'Yüksek Lisans',
            }];
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
                            Sana dair bir kaç sorumuz var...
                         </Text>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', width: winSize.width - 60, }}>
                            <DatePicker
                                style={{ width: winSize.width-50 }}
                                date={this.state.bDate}
                                mode="date"
                                ref='dpBDate'
                                placeholder="Doğum Tarihi"
                                format="DD-MM-YYYY"
                                minDate="01-01-1950"
                                maxDate="31-12-2100"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginRight: 0
                                    },
                                    dateInput: {
                                        marginRight: 36
                                    }
                                }}
                                onDateChange={(bDate) => { this.setState({ bDate: bDate }) }}
                            />
                            <Dropdown style={{height:30}}
                                label='Çalışma Durumu'
                                data={cData}
                                ref='drpWDate'
                                //value={this.state.wState}
                                onChangeText={(wState) => this.setState({ wState })}
                            />
                            <Dropdown style={{ height: 30 }}
                                label='Öğrenim Durumu'
                                data={oData}
                                ref='drpEDate'
                                //value={this.state.eState}
                                onChangeText={(eState) => this.setState({ eState })}
                            />
                            <View style={{flex:1,flexDirection:'row', marginTop:20}}>
                                <TouchableHighlight style={{ flex:1 }} underlayColor="white" onPress={()=>this.setBirthDate(1)} >
                                    <View >
                                        <Text style={{ color: 'white', backgroundColor:this.state.rBackgroundColor }}>Son Regle Tarihi</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight style={{ flex: 1 }} underlayColor="white" onPress={() => this.setBirthDate(2)} >
                                    <View >
                                        <Text style={{ color: 'white', backgroundColor:  this.state.bBackgroundColor }}>Beklenen Doğum Tarihi</Text>
                                    </View>
                                </TouchableHighlight>
                             </View>
                            <DatePicker
                                style={{ width: winSize.width - 50, marginTop:10 }}
                                date={this.state.rDate}
                                ref='dpRDate'
                                mode="date"
                                placeholder={this.state.bText}
                                format="DD-MM-YYYY"
                                minDate="01-01-1950"
                                maxDate="31-12-2100"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginRight: 0
                                    },
                                    dateInput: {
                                        marginRight: 36
                                    }
                                }}
                               onDateChange={(rDate) => { this.setState({ rDate: rDate }) }}
                            />
                        </View>
                        <Button full rounded primary
                            style={{ marginTop: 30, width: 70, alignSelf: 'center' }}
                            onPress={this.submit.bind(this)}>
                            <Text>Devam Et</Text>
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
        marginLeft: 10,
        marginTop: 20
    }
});

