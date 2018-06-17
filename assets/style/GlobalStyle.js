'use strict';
import { theme } from '../style/Theme'
var React = require('react-native');

var { StyleSheet} = React;
module.exports = StyleSheet.create({
    containerWrapper: {
        backgroundColor:'white',
    },
    header: {
        backgroundColor: theme.primaryColor,
    },
    headerMenu: {
        width:40,
        flex:0,
    },
    headerLeft: {
        width:40,
        flex:0,
    },
    headerRightIcon: {
        width:40,
        color:'white',
        flex:0,
    },
    container: {
        backgroundColor:'white',
        flex: 1,
        alignSelf: "center",
        flexDirection:'column',
        width:'100%',
    },
   
    item: {
        borderColor:'transparent',
        backgroundColor:'transparent',
    },
    inputicon:{
        backgroundColor:'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButton:{
        backgroundColor:theme.primaryColor,
        marginBottom:10,
        width:'90%',
        alignSelf: "center",
    },
    secondaryButtonDisabled:{
        backgroundColor:theme.primaryColorDisabled,
        marginBottom:10,
        width:'90%',
        alignSelf: "center",
    },
    deleteButton:{
        backgroundColor:theme.deleteColor,
        marginBottom:10,
        width:'90%',
        alignSelf: "center",
    },
    textinput:{
        flex: 1,
        paddingTop:0,
    },
    textinputCenter:{
        flex: 1,
        paddingTop:0,
        fontSize:25,
        textAlign:'center',
        backgroundColor:'transparent',
        color:'green'
    },
    primaryBKColor:{
        backgroundColor:theme.primaryColor,
    },
    icon:{
        color:'white',
    },
    thumbnail:{
        width:20,
    },
    heading1:{
        color:'#141414',
        fontSize: 17,
    },
    heading2:{
        color:'#313030',
        fontSize: 13,
        fontWeight: 'bold',
    },
    font11:{
        fontSize:11,
    },
    font12:{
        fontSize:12,
    },
    font13:{
        fontSize:13,
    },
    font14:{
        fontSize:14,
    },
    /*List Design Start */
   
    listItem:{
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:.5,
        marginLeft:0,
        padding:5,

       
    },
    listLeft:{
        width:55,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:0,
        marginLeft:3
    },
    listBody:{
        borderBottomWidth:0,
        marginLeft:5
    },
    listHeading:{
        color:'black',
    },
    listRight:{
        borderBottomWidth:0,
        padding:0,
        flexDirection: 'row',
    },
    listRightOptionIcon:{
        fontSize:20,
        color:'silver',
    },
    listRightTouchable:{
        position:'absolute'
        ,top:10
    },
    listAvatarContainer:{
        borderRadius: 50,
        backgroundColor:'silver',
        padding:2,
        width:50,
        height:50,
    },
    listAvatar:{
        width:46,
        height:46,
    },
    listItemSmall:{
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:.5,
        marginLeft:0,
        padding:5,
        height:48,
    },
  
    listHeadingSmall:{
        color:'black',
        fontSize:10,
    },
    listAvatarContainerSmall:{
        borderRadius: 50,
        backgroundColor:'silver',
        padding:2,
        width:40,
        height:40,
    },
    listAvatarSmall:{
        width:36,
        height:36,
    },
    /* List Design End */

    avatarContainer:{
        backgroundColor:'silver',
        alignItems: 'center',
        marginBottom:10,
        borderRadius: 40,
        width: 80,
        height: 80,
        padding:2,
        alignSelf: "center",
        flexDirection:'column',
    },
   
    avatarcontainerbottom:{
        borderRadius: 50,
        backgroundColor:'#e2e0e0',
        padding:2,
        width:40,
        height:40,
    },
    avatarBig: {
        borderRadius: 38,
        width: 76,
        height: 76,
      },
    avatar:{
        width:46,
        height:46,
    },
   
    avatarbottom:{
        width:36,
        height:36,
    },
    label:{
        fontSize:14,
    },
    value:{
        color:'#313030',
        fontSize: 17,
    },
    cardNavBar: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'red',
        width:'100%',
        alignItems:'center',
       
    },
    cardNavFooter:{
        borderTopWidth:.5,
        borderTopColor:'#e4e5e5',
        width:'98%',
        alignSelf: "center",
        height:35
    },
    navBarWrapperYellow:{
        height:28,
        width:28,
        borderRadius: 15,
        backgroundColor:'#edc901',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBarWrapperPrimary:{
        height:28,
        width:28,
        borderRadius: 15,
        backgroundColor:theme.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBarWrapperTransparent:{
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBarButton:{
        flex: 1,
        alignItems: 'center',
        padding:2,
    },
    navBarIcon:{
        fontSize:25,
        color:'white',
        alignItems:'center',
    },
    navBarLabel:{
        fontSize:10,
        height:15,
        color:'white',
    },
    deleteButtonSmall:{
        color:'white',
        textAlign:'center',
        marginBottom:20,
        fontSize:10,
        backgroundColor:'red',
        borderRadius:60,
        paddingTop:3,
        height:20,
        width:80,
        alignSelf: "center", 
        flexDirection:'column'
    },
    /*Modal Design Start*/
    modalWrapper:{
        backgroundColor: 'rgba(0,0,0,0.5)',
        height:'100%',
        zIndex: 1000,
    },
    modalContainer:{
        borderRadius:6, 
        marginTop: 50,
        backgroundColor:'white',
        width:300,
        alignSelf: "center",
        flexDirection:'column',
    },
    modalAvatar:{
        marginLeft:0,
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:.5,
        padding:5
    },
    modalLeft:{
        width:55,
        justifyContent: 'center',
        alignItems: 'center'
    },modalAvatarIcon:{
        color:'#818181'
    },
    modalCancel:{
        width:100,
        color:'#009da3',
        padding:15,
        fontSize:17
    }

    /*Model Design End*/
  

});

