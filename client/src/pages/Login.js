import React, { Component } from 'react';
 
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import Icon from '@expo/vector-icons/FontAwesome';
export default class Login extends Component {
	press() {
		 Alert.alert('You tapped the button!')
		}

  render() {
    return (
    	<LinearGradient
          					colors={['#f6d1cc',  '#d8ddee']}
          					style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
          					start={{ x: 0, y: 1 }}
  							end={{ x: 1, y: 1 }}>
        <ScrollView style={styles.scroll}>
        	<Container>
    			<Button 
        			label="Forgot Login/Pass"
        			styles={{button: styles.alignRight, label: styles.label}} 
        			onPress={this.press.bind(this)} />
			</Container>
			<Container>
    			<Label text="Username or Email" />
    			<TextInput
       				style={styles.textInput}
    			/>
			</Container>
			<Container>
   				 <Label text="Password" />
    			<TextInput
        			secureTextEntry={true}
        			style={styles.textInput}
    			/>
			</Container>
			<Container>
    			<Button 
        			styles={{button: styles.transparentButton}}
        			onPress={this.press.bind(this)}
    			>
        			<View style={styles.inline}>
        				<Icon name="facebook-official" size={30} color="#3B5699" />
            			<Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text> 
            			<Text style={styles.buttonBlueText}>with Facebook</Text>
        			</View>
    			</Button>
			</Container>
			<View style={styles.footer}>
    			<Container>
        			<Button 
            			label="Sign In"
            			styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
            			onPress={this.press.bind(this)} />
    			</Container>
    			<Container>
        			<Button 
            			label="CANCEL"
            			styles={{label: styles.buttonBlackText}} 
            			onPress={this.press.bind(this)} />
    			</Container>
    			<Container>
    				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        				<LinearGradient
          					colors={['#4c669f', '#3b5998', '#192f6a']}
          					style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
          						<Text
            						style={{
             							 backgroundColor: 'transparent',
              								fontSize: 15,
              							color: '#fff',
            					}}>
            						Sign in with Facebook
          						</Text>
        				</LinearGradient>
      				</View>
    			</Container>
			</View>
        </ScrollView>
        </LinearGradient>

    );
  }
}
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'transparent',
    padding: 20,
    flexDirection: 'column'
},
label: {
    color: '#0d8898',
    fontSize: 20
},
alignRight: {
    alignSelf: 'flex-end'
},
textInput: {
    height: 40,
    fontSize: 20,
    backgroundColor: '#FFF'
},
transparentButton: {
    marginTop: 20,
    borderColor: '#3B5699',
    borderWidth: 2
},
buttonBlueText: {
    fontSize: 20,
    color: '#3B5699'
},
buttonBigText: {
    fontSize: 20,
    fontWeight: 'bold'
},
inline: {
    flexDirection: 'row'
},
buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
},
buttonBlackText: {
    fontSize: 20,
    color: '#595856'
},
primaryButton: {
    backgroundColor: '#34A853'
},
footer: {
   marginTop: 50
}
});

