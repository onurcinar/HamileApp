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
            date: null,
            rBackgroundColor: 'blue',
            bBackgroundColor: 'grey',
            bText: 'Son Regle Tarihi'
        }
    }
    static navigationOptions = {
        header: null
    };

    setBirthDate(value) {
        this.setState({
            rBackgroundColor: value == 1 ? 'blue' : 'grey',
            bBackgroundColor: value == 1 ? 'grey' : 'blue',
            bText: value == 1 ? 'Son Regle Tarihi' : 'Beklenen Doğum Tarihi'
        });
    }

    render() {
        let winSize = Dimensions.get('window');
        //console.log(`width = ${winSize.width}`);
        let cData = [{
            value: 'Erkek',
        }, {
            value: 'Kız',
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
                            Bebeğine dair bir kaç sorumuz var...
                         </Text>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', width: winSize.width - 60, }}>
                           
                            <Dropdown style={{ height: 30 }}
                                label='Bebeğin Cinsiyeti'
                                data={cData}
                            />
                            <TextInput underlineColorAndroid={'transparent'} placeholder="Bebeğin İsmi"
                                style={styles.textInput} />
                        </View>
                        <Button full rounded primary
                            style={{ marginTop: 30, width: 70, alignSelf: 'center' }}
                            onPress={() => this.props.navigation.navigate("Profile")}>
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
        marginTop: 20
    }
});

