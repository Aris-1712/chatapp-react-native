import React, {useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import Styles from './Styles';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../Components/Button';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';

const Signin = ({navigation,setLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const submitHandler = async() => {
    try {
      
    if (username && password && email) {
      await AsyncStorage.setItem('signin', "1")
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('username', username)
      setLogin()

    } else {
      Toast.show({
        type: 'info',
        text1: 'Warning',
        text2: 'Please provide username and password to proceed',
      });
    }

  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
  }
  };
  return (
    <View style={Styles.signinHolder}>
      <Image style={Styles.logo} source={require('../../../images/logo.png')} />
      <View style={Styles.inputHolder}>
        <Input
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}
          inputContainerStyle={{borderBottomColor: '#307351'}}
          placeholder="Enter Username"
          leftIcon={<Icon style={Styles.icon} name="user"></Icon>}
        />
        <Input
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          inputContainerStyle={{borderBottomColor: '#307351'}}
          placeholder="Enter email"
          leftIcon={<Icon style={Styles.icon} name="mail"></Icon>}
        />
        <Input
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry
          inputContainerStyle={{borderBottomColor: '#307351'}}
          placeholder="Enter Password"
          leftIcon={<Icon style={Styles.icon} name="eye"></Icon>}
        />
      </View>
      <Button
        onPress={() => {
          submitHandler();
        }}
        title={'Login'}></Button>
    </View>
  );
};
const mapActionsToProps=(dispatch)=>{
  return(
    {
      setLogin:()=>{dispatch({type:"SET_LOGIN",payload:true})}
    }
  )
}
export default connect(null,mapActionsToProps)(Signin);
