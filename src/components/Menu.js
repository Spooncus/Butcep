import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

class Menu extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../../img/3147.jpg')}
        style={{width, height, alignItems: 'center', justifyContent: 'center'}}>
        <View>
          <Image
            source={require('../../img/appLogo.png')}
            style={{
              width: width * 0.25,
              height: height * 0.14,
              alignSelf: 'center',
            }}
          />
          <Text style={styles.isimText}>bütcep</Text>
          <Button
            buttonStyle={styles.iconMenu}
            title="Son Harcamalar"
            onPress={() => Actions.harcamaList()}
          />
          <Button
            buttonStyle={styles.iconMenu}
            title="Raporlar"
            onPress={() => Actions.raporlar()}
          />
          <Button
            buttonStyle={styles.iconMenu}
            title="Tahminler"
            onPress={() => Actions.veriCek()}
          />
          <Button
            buttonStyle={styles.iconMenu}
            title="Çıkış"
            onPress={() => Actions.login({type: 'reset'})}
          />
          <Button
            buttonStyle={styles.iconRight}
            icon={
              <Icon
                size={38}
                name="pluscircleo"
                type="antdesign"
                color="#fff"
              />
            }
            onPress={() => Actions.harcamaOlustur()}
          />
        </View>
      </ImageBackground>
    );
  }

  state = {
    fontLoaded: false,
    moved: false,
    scale: new Animated.Value(0),
  };

  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
  }

  moveLeft = () => {
    const {moved} = this.state;

    Animated.spring(this.position, {
      toValue: {
        x: moved ? 0 : -180,
        y: 0,
      },
    }).start();

    Animated.spring(this.state.scale, {
      toValue: moved ? 0 : 1,
      duration: 800,
    }).start();

    this.setState({moved: !moved});
  };
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
  },
  iconMenu: {
    borderRadius: 8,
    justifyContent: 'center',
    height: height * 0.06,
    width: width * 0.45,
    backgroundColor: '#fdc514',
    marginTop: 10,
  },
  iconRight: {
    borderRadius: 50,
    zIndex: 11,
    right: -100,
    bottom: -140,
    justifyContent: 'center',
    height: 55,
    width: 55,
    backgroundColor: '#fdc514',
    position: 'absolute',
    alignItems: 'center',
    elevation: 8,
  },
});
export default Menu;
