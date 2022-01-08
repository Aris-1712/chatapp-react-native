import React, {useState} from 'react';
import {Text, Pressable} from 'react-native';
import Styles from './Styles';

const Button = ({title,onPress,width}) => {
  return (
    <Pressable onPress={onPress} style={{...Styles.button,width:width?width:"50%"}}>
      <Text style={Styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default Button;
