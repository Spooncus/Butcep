import React, { Component } from "react";
import {  StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Animated } from "react-native";
import { Actions } from 'react-native-router-flux';
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get('window');

class AddButton extends Component {

  

    render(){
      return(
          <TouchableOpacity onPress={() => this.props.onPress()}>
              <View style={styles.section} backgroundColor={this.props.color} >
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                      size={45}
                      name={this.props.icon}
                      type="antdesign"
                      color="#fff"
                      
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
      //backgroundColor:'#ffd700',
      borderRadius: 50,
      height: height * 0.12,
      width: width * 0.21,
      position:'absolute',
      top: height*0.12,
      left: width*0.47,
      alignItems: 'center',
      flex: 1,
        
    },
  });
export default AddButton;