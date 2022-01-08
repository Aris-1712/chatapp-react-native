import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Styles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import {Input} from 'react-native-elements';
import IconE from 'react-native-vector-icons/Entypo';
import Button from '../../Components/Button';

const Profile = props => {
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [isVisible,setIsVisible]=useState(false)
  const getUserDetails = async () => {
    try {
      let email = await AsyncStorage.getItem('email');
      let username = await AsyncStorage.getItem('username');
      setEmail(email);
      setUsername(username);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };
  const logout = async () => {
    try {await AsyncStorage.setItem('signin','2');
      props.setLogin();
    } catch (error) {
      console.log(error.message)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };
  useEffect(() => {
    if ('admin' in props.route.params) {
      getUserDetails();
    }
  }, [props.route.params]);
  const editHandler=async()=>{
    try {
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('username', userName)
      setIsVisible(false)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  }
  const editModal = (
    <Modal isVisible={isVisible}>
      <View style={{backgroundColor: '#ffff', padding: 20, borderRadius: 10}}>
        <Input
          value={userName}
          onChangeText={text => {
            setUsername(text);
          }}
          inputContainerStyle={{borderBottomColor: '#307351'}}
          placeholder="Enter Contact Name"
          leftIcon={<Icon style={Styles.newContactIcon} name="user"></Icon>}
        />
        <Input
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          inputContainerStyle={{borderBottomColor: '#307351'}}
          placeholder="Enter Contact Email"
          leftIcon={<IconE style={Styles.newContactIcon} name="mail"></IconE>}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Button
            width={130}
            onPress={() => {
              editHandler();
            }}
            title={'EDIT'}></Button>
          <Button
            width={130}
            onPress={() => {
              setIsVisible(false);
            }}
            title={'CLOSE'}></Button>
        </View>
      </View>
    </Modal>
  );
  if ('user' in props.route.params) {
    let user = props.route.params.user;
    return (
      <SafeAreaView style={Styles.holder}>
        <View style={Styles.header}>
          <Icon
            onPress={() => {
              props.navigation.goBack();
            }}
            style={Styles.icon}
            name="left"></Icon>
        </View>
        <View style={Styles.profileHolder}>
          {user.img ? (
            <Image
              style={Styles.img}
              source={{
                uri: user.img,
              }}></Image>
          ) : (
            <Avatar
              size={100}
              rounded
              title={user.name[0]}
              containerStyle={{
                backgroundColor: 'coral',
                marginBottom: 20,
              }}></Avatar>
          )}
          <Text style={Styles.title}>{user.name}</Text>
          <View style={Styles.infoHolder}>
            <Text style={Styles.infoLabel}>Email Address</Text>
            <Text style={Styles.infoVal}>{user.email}</Text>
          </View>
          <View style={Styles.infoHolder}>
            <Text style={Styles.infoLabel}>Name</Text>
            <Text style={Styles.infoVal}>{user.name}</Text>
          </View>
          <View style={Styles.infoHolder}>
            <Text style={Styles.infoLabel}>JSON BIN_ID</Text>
            <Text style={Styles.infoVal}>{user.bin_id}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={Styles.holder}>
        <View style={Styles.header}>
          <Icon
            onPress={() => {
              props.navigation.goBack();
            }}
            style={Styles.icon}
            name="left"></Icon>
        </View>
        <View style={Styles.profileHolder}>
          <Avatar
            size={100}
            rounded
            title={userName[0]}
            containerStyle={{
              backgroundColor: 'coral',
              marginBottom: 20,
            }}></Avatar>
          <Text style={Styles.title}>{userName}</Text>
          <View style={Styles.infoHolder}>
            <Text style={Styles.infoLabel}>Email Address</Text>
            <Text style={Styles.infoVal}>{email}</Text>
          </View>
          <View style={Styles.infoHolder}>
            <Text style={Styles.infoLabel}>Name</Text>
            <Text style={Styles.infoVal}>{userName}</Text>
          </View>
          <TouchableOpacity
            onPress={()=>setIsVisible(true)}
            style={{
              ...Styles.infoHolder,
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text style={Styles.infoLabel}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            style={{
              ...Styles.infoHolder,
              // marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text style={Styles.infoLabel}>Logout</Text>
          </TouchableOpacity>
        </View>
        {editModal}
      </SafeAreaView>
    );
  }
};
const mapActionsToProps = dispatch => {
  return {
    setLogin: () => {
      dispatch({type: 'SET_LOGIN', payload: false});
    },
  };
};
export default connect(null, mapActionsToProps)(Profile);
