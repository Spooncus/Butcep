import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Dimensions,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {Icon, Button} from 'react-native-elements';
import {emailChanged, passwordChanged, registerUser} from '../actions';
import {Button2, Card, CardSection, Spinner} from '../ortak';

const {width, height} = Dimensions.get('window');

class RegisterForm extends Component {
  state = {email: '', password: '', loading: false};
  clickRegister() {
    const {email, password} = this.props;
    this.props.registerUser({email, password});
  }
  registerSucces() {
    this.setState({loading: false});
  }
  registerFail() {
    this.setState({loading: false});
    Alert.alert('Mesaj: ', 'Kullanici adi veya sifreniz hatali!', [
      {text: 'Tamam', onPress: () => null},
    ]);
  }
  renderRegisterButton() {
    return <Button onPress={this.clickRegister.bind(this)}> KAYIT OL </Button>;
  }

  render() {
    const {inputStyle} = styles;
    return (
      <ImageBackground
        source={require('../../img/3147.jpg')}
        style={{width, height, alignItems: 'center', justifyContent: 'center'}}>
        <KeyboardAvoidingView
          style={{
            width,
            height,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          behavior="padding"
          enabled>
          <Image
            source={require('../../img/appLogo.png')}
            style={{
              width: width * 0.25,
              height: height * 0.14,
              alignSelf: 'center',
            }}
          />
          <Text style={styles.isimText}>KAYIT OL</Text>
          <Card>
            <CardSection>
              <TextInput
                placeholder="E-Mail"
                style={inputStyle}
                value={this.props.email}
                onChangeText={email => this.props.emailChanged(email)}
              />
            </CardSection>
            <CardSection>
              <TextInput
                secureTextEntry
                placeholder="Password"
                style={inputStyle}
                value={this.props.password}
                onChangeText={password => this.props.passwordChanged(password)}
              />
            </CardSection>
          </Card>
          <Button
            buttonStyle={styles.icon}
            onPress={this.clickRegister.bind(this)}
            icon={
              <Icon
                size={30}
                name={'power-off'}
                type="font-awesome"
                color="#ffd700"
              />
            }
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  isimText: {
    fontFamily: 'sans-serif-thin',
    fontSize: 35,
    alignSelf: 'center',
    color: 'gray',
  },
  loc: {
    marginTop: 5,
  },
  icon: {
    borderRadius: 35,
    justifyContent: 'center',
    height: 60,
    width: 60,
    backgroundColor: 'white',
    marginTop: 10,
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
});

const mapStateToProps = ({kimlikDogrulamaResponse}) => {
  const {email, password, loading} = kimlikDogrulamaResponse;
  return {
    email,
    password,
    loading,
  };
};

export default connect(
  mapStateToProps,
  {emailChanged, passwordChanged, registerUser},
)(RegisterForm);
