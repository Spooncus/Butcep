import React from 'react';
import {Text, View} from 'react-native';

const Header = (props) => {
  const {textStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}> {props.headerText} </Text>
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 23,
    fontFamily: 'sans-serif-thin',
  },
  viewStyle: {
    backgroundColor: '#a4a4a4',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
  },
};

export default Header;
