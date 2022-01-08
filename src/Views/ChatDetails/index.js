import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, TextInput, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Styles from './Styles';
import * as Actions from '../../Global/Actions';
import {Avatar} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as API from '../../Global/Calls';
const ChatDetails = props => {
  let user = props.route.params.user;
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const getChats = async () => {
    try {
      let res = await API.getChats(user.bin_id);
      setChats([...res.data.record.chats]);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };
  useEffect(() => {
    getChats();
  }, [props.route.params.user]);
  const newChatHandler = async val => {
    try {
      let res = await API.newChat(user.bin_id, chats, val);
      setMessage()
      getChats();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };
  return (
    <SafeAreaView style={Styles.holder}>
      <View style={Styles.header}>
        <Icon
          onPress={() => {
            props.navigation.goBack();
          }}
          style={Styles.icon}
          name="left"></Icon>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Profile', {user: user});
          }}>
          {user.img ? (
            <Image
              style={Styles.img}
              source={{
                uri: user.img,
              }}></Image>
          ) : (
            <Avatar
              size={50}
              rounded
              title={user.name[0]}
              containerStyle={{backgroundColor: 'coral'}}></Avatar>
          )}
        </TouchableOpacity>
        <Text style={Styles.title}>{user.name}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#EAE9EC',
        }}>
        {chats.map((ele,ind) => {
          if (ele.type === 'Sent') {
            return (
              <View key={ind} style={Styles.chatTextHolder}>
                <View style={Styles.chatText}>
                  <Text>{ele.message}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View key={ind} style={Styles.chatTextHolderRec}>
                <View style={Styles.chatTextRec}>
                  <Text>{ele.message}</Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
      <View style={Styles.inputHolder}>
        <View style={{...Styles.chatInputHolder,padding:Platform.OS==='ios'?10:0}}>
          <TextInput
            style={Styles.chatInput}
            value={message}
            onChangeText={text => {
              setMessage(text);
            }}
            multiline={true}></TextInput>
        </View>
        <IonIcon
          onPress={() => newChatHandler({type: 'Sent', message: message})}
          style={Styles.sendIcon}
          name="send"></IonIcon>
      </View>
    </SafeAreaView>
  );
};

export default ChatDetails;
