import React, { Component } from 'react';
import Expo from 'expo';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field, reduxForm } from 'redux-form';

global.hasErrors=false;
const validate = values => {
    const error = {};
        hasErrors: false;   
        error.email = '';
    error.name = '';
    var ema = values.email;
    var nm = values.name;
    if (values.email === undefined) {
        ema = '';
       hasErrors: true;  
    }
    if (values.name === undefined) {
        nm = '';
        hasErrors: true;
        }
    if (ema.length < 8 && ema !== '') {
        error.email = 'too short';
        hasErrors: true;
        }
    if (!ema.includes('@') && ema !== '') {
        error.email = '@ not included';
        hasErrors: true;
        }
    if (nm.length > 8) {
        error.name = 'max 8 characters';
        hasErrors: true;
    }
    return error;
};

class SimpleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
        this.renderInput = this.renderInput.bind(this);
        this.showErros=this.showErros.bind(this);
    }
    showErros()
    {
        Alert.alert(hasErrors.toString());
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ isReady: true });
    }
    renderInput({ input, label, type, meta: { touched, error, warning } }) {
        var hasError = false;
        if (error !== undefined) {
            hasError = true;        }
        return (
            <Item error={hasError}>
                <Input {...input} />
                {hasError ? <Text>{error}</Text> : <Text />}
            </Item>
        )
    }
    render() {
        const { handleSubmit, reset } = this.props;
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Redux Form</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Field name="email" component={this.renderInput} />
                    <Field name="name" component={this.renderInput} />
                    <Button disabled={!hasErrors} activeOpacity={hasErrors?0.5:1} name="btnSubmit" block primary onPress={this.showErros}>
                        <Text>Submit + {hasErrors.toString()}</Text>
                    </Button>
                    <Item>
                        {hasErrors ? <Text>Hata Var</Text> : <Text />}
                    </Item>
                </Content>
            </Container>
        )
    }
}
export default reduxForm({
    form: 'test',
    validate
})(SimpleForm)