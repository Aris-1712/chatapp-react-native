import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Chat from '../../Views/Chat';
import ChatDetails from '../../Views/ChatDetails';
import Profile from '../../Views/Profile';
import Signin from '../../Views/Signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../Views/Loading';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

function RootStack(props) {
  const [login, setLogin] = useState(0);
  const getStorage = async () => {
    const value = await AsyncStorage.getItem('signin');
    if (value === '1') {
      setLogin(1);
      if(!props.login){
        props.setLogin(true)
      }
      
    }else{
      setLogin(2)
      if(props.login){
        props.setLogin(false)
      }
    }
  };
  useEffect(() => {
    getStorage();
  }, [props.login]);
  return (
    <Stack.Navigator>
      {login === 0 ? (
        <Stack.Screen
        options={{headerShown: false}}
        name="Loading"
        component={Loading}
      />
      ) : login === 2 ? (
        <>
          <Stack.Screen
            options={{headerShown: false}}
            name="Signin"
            component={Signin}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{headerTitle: 'Chats'}}
            name="Home"
            component={Chat}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ChatDetails"
            component={ChatDetails}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Profile"
            component={Profile}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
const mapStateToProps=(state)=>{
  return(
    {login:state.login}
  )
}
const mapActionsToProps = dispatch => {
  return {
    setLogin: (val) => {
      dispatch({type: 'SET_LOGIN', payload: val});
    },
  };
};
export default connect(mapStateToProps,mapActionsToProps)(RootStack);
