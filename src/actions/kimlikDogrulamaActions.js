import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_STATE_FAIL,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from './types';
export const emailChanged = email => {
  return dispatch => {
    dispatch({
      type: EMAIL_CHANGED,
      payload: email,
    });
  };
};

export const passwordChanged = password => {
  return dispatch => {
    dispatch({
      type: PASSWORD_CHANGED,
      payload: password,
    });
  };
};

export const loginUser = ({email, password}) => {
  return dispatch => {
    dispatch({type: LOGIN_USER});
    if (email === '' || password === '') {
      Alert.alert('Mesaj: ', 'Her iki alan da dolu olmalidir!', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => loginSucces(dispatch, user))
        .catch(() => loginFail(dispatch));
    }
  };
};

const loginFail = dispatch => {
  Alert.alert('Mesaj: ', 'Kullanıcı adı veya şifre yanlış!', [
    {text: 'Tamam', onPress: () => null},
  ]);
  dispatch({
    type: LOGIN_USER_FAIL,
  });
};
const loginSucces = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  Actions.Menu({type: 'reset'});
};

export const registerUser = ({email, password}) => {
  return dispatch => {
    dispatch({type: REGISTER_USER});
    if (email === '' || password === '') {
      Alert.alert('Mesaj: ', 'Her iki alan da dolu olmalidir!', [
        {text: 'Tamam', onPress: () => null},
      ]);
      dispatch({
        type: REGISTER_USER_FAIL,
      });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => registerSuccess(dispatch, user))
        .catch(() => {
          Alert.alert('Mesaj: ', 'Kayıt başarısız oldu!', [
            {text: 'Tamam', onPress: () => null},
          ]);
          dispatch({
            type: REGISTER_USER_FAIL,
          });
        });
    }
  };
};

const registerSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user,
  });
  Actions.login({type: 'reset'});
};
