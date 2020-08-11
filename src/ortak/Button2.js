import React, { Component } from "react";
import {  StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Animated } from "react-native";
import { Actions } from 'react-native-router-flux';
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get('window');

class Button2 extends Component {

  

    render(){
      return(
          <TouchableOpacity onPress={() => this.props.onPress()}>
              <View style={styles.section} backgroundColor={this.props.color} >
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', justifyContent: 'space-between'}}>{this.props.text}</Text>
                <Icon
                      size={20}
                      name={this.props.icon}
                      type="font-awesome"
                      color="#000"
                      
                    />
            </View>
            </View>
          </TouchableOpacity>
      );
    }
}



const styles = StyleSheet.create({
    section:{
      marginTop: 7,
      alignSelf: 'center',
      //backgroundColor:'#ffd700',
      //borderRadius: 10,
      borderWidth: 1,
      borderColor: 'lightgray',
      width: width * 0.35,
      height: height * 0.05,
      alignItems: 'center',
      
    },
  });
export default Button2;