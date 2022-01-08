const initialState={
    users:[],login:false
}

const Reducer=(state=initialState,Actions)=>{
    switch (Actions.type) {
        case "SET_USERS":
            return {...state,users:[...Actions.payload]}
        case "SET_LOGIN":
            return {...state,login:Actions.payload}    
    
        default:
            return {...state}
    }
}


export default Reducer