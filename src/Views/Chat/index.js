import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Styles from './Styles';
import * as Actions from '../../Global/Actions';
import * as Calls from '../../Global/Calls';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconE from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {Input} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Button from '../../Components/Button';

const Chat = ({navigation, getUsers, users}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Chats',
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {admin: true});
            }}
            style={Styles.headerOptions}>
            <Icon style={Styles.headerIcon} name="user-circle"></Icon>
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
            style={Styles.headerOptions}>
            <IconE style={Styles.headerIcon} name="new-message"></IconE>
          </TouchableOpacity>
        );
      },
    });
  }, []);
  useEffect(() => {
    try {
      getUsers();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  }, []);
  const addHandler = async () => {
    try {
    let create = await Calls.newUser();
    let bin_id = create.data.metadata.id;
    let createUser = await Calls.putUsers({
      users: [...users, {email, name, bin_id}],
    });
    setEmail();
    setName();
    getUsers();
    setIsVisible(false);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
  }
  };
  const pressHanlder = ele => {
    navigation.navigate('ChatDetails', {user: ele});
  };
  const newChatModal = (
    <Modal isVisible={isVisible}>
      <View style={{backgroundColor: '#ffff', padding: 20, borderRadius: 10}}>
        <Input
          value={name}
          onChangeText={text => {
            setName(text);
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
              addHandler();
            }}
            title={'ADD'}></Button>
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
  return (
    <>
      <ScrollView>
        {users.map((ele,ind) => {
          return (
            <TouchableOpacity key={ind}
              onPress={() => {
                pressHanlder(ele);
              }}
              style={Styles.userHandler}>
              {ele.img ? (
                <Image
                  style={Styles.img}
                  source={{
                    uri: ele.img,
                  }}></Image>
              ) : (
                <Avatar
                  size={50}
                  rounded
                  title={ele.name[0]}
                  containerStyle={{backgroundColor: 'coral'}}></Avatar>
              )}
              <Text style={Styles.title}>{ele.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {newChatModal}
    </>
  );
};
const mapStateToProps = state => {
  return {
    users: state.users,
  };
};
const mapActionsToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(Actions.getUsers());
    },
  };
};
export default connect(mapStateToProps, mapActionsToProps)(Chat);
