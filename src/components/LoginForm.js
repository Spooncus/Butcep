import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  registerUserPage,
} from '../actions';
import {Card, CardSection, Spinner} from '../ortak';
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
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Button2 from '../ortak/Button2'
import GirisButton from '../ortak/GirisButton'

const {width, height} = Dimensions.get('window');

class LoginForm extends Component {
  state = {email: '', password: '', loading: false};

  clickLogin() {
    const {email, password} = this.props;
    this.props.loginUser({email, password});
  }
  clickRegister() {
    Actions.register({type: ''});
  }
  loginSucces() {
    this.setState({loading: false});
  }
  loginFail() {
    this.setState({loading: false});
    Alert.alert('Mesaj: ', 'Kullanici adi veya sifreniz hatali!', [
      {text: 'Tamam', onPress: () => null},
    ]);
  }

  renderButton() {
    if (!this.props.loading) {
      return <Button onPress={this.clickLogin.bind(this)}> GİRİŞ </Button>;
    }
    return <Spinner size="small" />;
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
          <Text style={styles.isimText}>bütcep</Text>
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between',  width:width*0.7}}>
          <GirisButton
            buttonStyle={styles.dateButton}
            onPress={this.clickRegister.bind(this)}
            icon={'adduser'}
            color={'#fdc514'}
            text={'Kayıt Ol '}
          />
          <GirisButton
            buttonStyle={styles.dateButton}
            onPress={this.clickLogin.bind(this)}
            icon={'login'}
            color={'#fdc514'}
            text={'Giriş Yap '}
          />
          </View>
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
  dateButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    height: height*0.01,
    width: width*0.30,
    backgroundColor: "#fdc514",
    marginTop:10,
    
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
  {emailChanged, passwordChanged, loginUser, registerUserPage},
)(LoginForm);