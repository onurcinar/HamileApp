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
            showMail: true,
            showText: 'Göster'
        }
    }
    static navigationOptions = {
        header: null
    };
    press() {
        Alert.alert('You tapped the button!')
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
                        <TextInput underlineColorAndroid={'transparent'} placeholder="Ad - Soyad" 
                            style={styles.textInput} />
                        <TextInput underlineColorAndroid={'transparent'} placeholder="E-Posta"
                            style={styles.textInput} />
                        <TextInput underlineColorAndroid={'transparent'} password={true} secureTextEntry={true} placeholder="Şifre"
                            style={styles.textInput} />
                            <TextInput underlineColorAndroid={'transparent'} password={true} secureTextEntry={true} placeholder="Şifre Tekrar"
                            style={styles.textInput} />
                        </View>
                        <Button full rounded primary
                            style={{ marginTop: 30, width: 60, alignSelf: 'center' }}
                            onPress={() => this.props.navigation.navigate("StepTwo")}>
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

