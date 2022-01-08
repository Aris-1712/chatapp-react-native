import * as API from './Calls'
const usersDispatch = (payload)=>{
    return(
        {
            type:"SET_USERS",
            payload:payload
        }
    )
}
export const getUsers = () => {
  return async dispatch => {
    let res=await API.getUsers()
    dispatch(usersDispatch(res.data.record.users))
  };
};
