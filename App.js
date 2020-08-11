import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import firebase from 'firebase';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';


class App extends Component {
  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey: 'AIzaSyDp3TLcKzDcNX3bc0KVjnEvtlEkf-WSKfA',
        authDomain: 'finalproject-53cb1.firebaseapp.com',
        databaseURL: 'https://finalproject-53cb1.firebaseio.com',
        projectId: 'finalproject-53cb1',
        storageBucket: 'finalproject-53cb1.appspot.com',
        messagingSenderId: '815861184639',
      }
    );
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex:1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}

export default App;
