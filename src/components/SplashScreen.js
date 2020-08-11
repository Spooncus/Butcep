/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing,
  Dimensions,
  ImageBackground,
} from "react-native";
import {Actions} from 'react-native-router-flux';

const { width, height } = Dimensions.get("window");

const switchtoAuth = () => {
    Actions.replace('login')
}

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0.5);
    this.animatedValue2 = new Animated.Value(0.3);
  }

  componentDidMount() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      tension: 5,
      friction: 2,
      delay: 900
    }).start();

    Animated.timing(this.animatedValue2, {
      toValue: 1,
      delay: 200,
      duration: 1000
    }).start();

    setTimeout(switchtoAuth,1200)
  }

  render() {
    const truckStyle = {
      transform: [{ scale: this.animatedValue }]
    };

    const scaleText = {
      transform: [{ scale: this.animatedValue2 }]
    };

    return (
        <ImageBackground
        source={require('../../img/3147.jpg')}
        style={{width, height, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View style={[styles.ring, truckStyle]}>
            <Animated.Image
                source={require("../../img/appLogo.png")}
                style={[
                {
                    resizeMode: "contain",
                    width: 200,
                    height: 200
                }
                ]}
            />
            </Animated.View>

            <Animated.View
            style={[
                {
                position: "absolute",
                bottom: 20,
                width: width - 20,
                height: 4,
                backgroundColor: "#fff",
                borderRadius: 2
                },
                scaleText
            ]}
            />
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  ring: {
    backgroundColor: "transparent",
  },
  starStyle: {
    width: 100,
    height: 20,
    marginBottom: 20
  }
});