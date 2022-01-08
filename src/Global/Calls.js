import Axios from 'axios';
import {key,URL} from './Endpoint'
// let key = '$2b$10$h7NPENcTycNuPFx1f9toE.n/zZo2e/bTAOq5Qjb6s5DJnhpGAuGnS';
export const getUsers = async () => {
  return await Axios.get(
    `${URL}/61d5a26d2675917a628a8348/latest`,
    {headers: {'X-Master-Key': key}},
  );
};
export const putUsers = async (val) => {
  return await Axios.put(
    `${URL}/61d5a26d2675917a628a8348`,val,
    {headers: {'X-Master-Key': key}},
  );
};
export const newUser = async (val)=>{
  return await Axios.post(
    `${URL}`,{chats:[]},{headers: {'X-Master-Key': key}},
  )
}
export const getChats = async id => {
  return await Axios.get(`${URL}/${id}/latest`, {
    headers: {'X-Master-Key': key},
  });
};
export const newChat = async (id,chats,val) => {
  return await Axios.put(
    `${URL}/${id}`,
    {
      chats: [...chats, val],
    },
    {headers: {'X-Master-Key': key}},
  );
};
