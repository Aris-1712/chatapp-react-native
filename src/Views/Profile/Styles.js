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
    icon:{
        fontSize:20,
        color:"#307351",
        marginRight:20
    },
    profileHolder:{
        alignItems:"center"
    },
    title:{
        fontSize:20,
        fontWeight:"500",
        marginBottom:40
    },
    img:{
        width:200,
        height:200,
        borderRadius:200,
        marginBottom:20
    },
    avatar:{
        marginBottom:20
    },
    infoHolder:{
        flexDirection:'row',
        justifyContent:"space-between",
        width:"100%",
        padding:15,
        backgroundColor:"#EAE9EC"
    },
    infoLabel:{
        fontSize:16,
        color:"#307351"
    },
    infoVal:{
        fontSize:16,
    },
    newContactIcon:{
        fontSize:18,
        color:"#307351"
    }

})

export default Styles