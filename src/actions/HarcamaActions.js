import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
  HARCAMA_CHANGED,
  HARCAMA_OLUSTUR_REQUEST,
  HARCAMA_OLUSTUR_REQUEST_SUCCESS,
  HARCAMA_OLUSTUR_REQUEST_FAIL,
  HARCAMA_LIST_DATA_SUCCESS,
  HARCAMA_UPDATE_REQUEST,
  HARCAMA_UPDATE_REQUEST_SUCCESS,
  HARCAMA_UPDATE_REQUEST_FAIL,
  HARCAMA_DELETE_REQUEST,
  HARCAMA_DELETE_REQUEST_SUCCESS,
} from './types';
import {Alert} from 'react-native';

export const harcamaDegis = ({props, value}) => {
  return dispatch => {
    dispatch({
      type: HARCAMA_CHANGED,
      payload: {props, value},
    });
  };
};

export const harcamaOlustur = ({firma, aciklama, fiyat, tarih, kategori}) => {
  const {currentUser} = firebase.auth();
  return dispatch => {
    dispatch({type: HARCAMA_OLUSTUR_REQUEST});
    if (tarih === '' || kategori === '' || fiyat === '') {
      Alert.alert(
        'Mesaj: ',
        'Kategori, Tarih ve Fiyat alanları boş bırakılamaz!',
        [{text: 'Tamam', onPress: () => null}],
      );
      dispatch({type: HARCAMA_OLUSTUR_REQUEST_FAIL});
    } else {
      firebase
        .database()
        .ref(`/kullanicilar/${currentUser.uid}/harcamalar`)
        .push({firma, aciklama, fiyat, tarih, kategori})
        .then(() => {
          dispatch({type: HARCAMA_OLUSTUR_REQUEST_SUCCESS});
          Actions.pop({type: 'reset'});
        });
    }
  };
};

export const harcamaListData = () => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/kullanicilar/${currentUser.uid}/harcamalar`)
      .on('value', snapshot => {
        dispatch({type: HARCAMA_LIST_DATA_SUCCESS, payload: snapshot.val()});
      });
  };
};

export const harcamaIptal = () => {
  Actions.pop();
};

export const harcamaUpdate = ({
  firma,
  aciklama,
  fiyat,
  tarih,
  kategori,
  uid,
}) => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    dispatch({type: HARCAMA_UPDATE_REQUEST});
    if (tarih === '' || kategori === '' || fiyat === ''){
      Alert.alert(
        'Mesaj: ',
        'Kategori, Tarih ve Fiyat alanları boş bırakılamaz!',
        [{text: 'Tamam', onPress: () => null}],
      );
      dispatch({type: HARCAMA_UPDATE_REQUEST_FAIL});
    } else {
      firebase
        .database()
        .ref(`/kullanicilar/${currentUser.uid}/harcamalar/${uid}`)
        .set({firma, aciklama, fiyat, tarih, kategori})
        .then(() => {
          dispatch({type: HARCAMA_UPDATE_REQUEST_SUCCESS});
          Actions.pop({type: 'reset'});
        });
    }
  };
};

export const harcamaDelete = ({uid}) => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    dispatch({type: HARCAMA_DELETE_REQUEST});
    firebase
      .database()
      .ref(`/kullanicilar/${currentUser.uid}/harcamalar/${uid}`)
      .remove()
      .then(() => {
        dispatch({type: HARCAMA_DELETE_REQUEST_SUCCESS});
        Actions.pop();
      });
  };
};

export const harcamaDeleteClick = ({uid}) => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    dispatch({type: HARCAMA_DELETE_REQUEST});
    firebase
      .database()
      .ref(`/kullanicilar/${currentUser.uid}/harcamalar/${uid}`)
      .remove()
      .then(() => {
        dispatch({type: HARCAMA_DELETE_REQUEST_SUCCESS});
      });
  };
};
