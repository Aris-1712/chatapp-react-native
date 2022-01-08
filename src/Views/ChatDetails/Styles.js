import {StyleSheet} from 'react-native'


const Styles=StyleSheet.create({
    holder:{
        flex:1,backgroundColor:"#ffff"
    },
    header:{
        height:60,
        flexDirection:"row",
        paddingHorizontal:10,
        alignItems:"center"

    },
    img:{
        width:40,
        height:40,
        borderRadius:50
    },
    title:{
        fontSize:18,
        marginLeft:10,
        fontWeight:"500"
    },
    icon:{
        fontSize:20,
        color:"#307351",
        marginRight:20
    },
    inputHolder:{
        height:70,
        flexDirection:"row",
        paddingHorizontal:10,
        alignItems:"center"
    },
    sendIcon:{
        fontSize:20,
        color:"#307351",
        marginHorizontal:10
    },
    chatTextHolder:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    chatTextHolderRec:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    chatText:{
        padding: 10,
        backgroundColor: '#D9FFF5',
        margin: 10,
        borderRadius: 10,
    },
    chatTextRec:{
        padding: 10,
        backgroundColor: '#ffff',
        margin: 10,
        borderRadius: 10,
    },
    chatInputHolder:{
        backgroundColor: '#EAE9EC',
        flex: 1,
        // padding: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderColor: '#307351',
        borderWidth: 1,
    },
    chatInput:{
        fontSize: 16,
    }
})

export default Styles