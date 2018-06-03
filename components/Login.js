
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, Image, TouchableHighlight,ToastAndroid, NavigationActions  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { userSignIn } from '../actions/userActions' ;
import HomePlaces from './places/HomePlaces';
var userDetails = require('./shared/userDetails');
var registrationStyle = require('../assets/style/Registration');


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'aquinof@rchsp.med.sa',
            password:'1',
            
        };

       

      }
    onLogin (){
        if(this.state.email=="" || this.state.password==""){
            ToastAndroid.showWithGravityAndOffset("Invalid username or wrong password",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50);
            return false;
        }

        this.props.userSignIn(this.state.email,this.state.password).then(res=>{
        	if(res.status==200){
                
                if(res.exist==false){
                    this.setState({email:'',password:''});
                    ToastAndroid.showWithGravityAndOffset(res.result,ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
                }else{
                    userDetails.id=res.data.id;
                    userDetails.username=res.data.email;
                    userDetails.firstname=res.data.firstname;
                    this.props.navigation.navigate('HomePlaces');
                    
                }
            }
        });
    }
    render() {
    const { navigate } = this.props.navigation;
    return (
        <Root>
            <Container style={registrationStyle.containerWrapper}>
        	   
          	
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={registrationStyle.container}>
                        <View style={registrationStyle.logoContainer}>
                        <Image  style={registrationStyle.logo} resizeMode='contain'  source={require('../images/logo.png')} />
                        </View>
                        <Item  stackedLabel style={registrationStyle.item}>
                            <Label style={registrationStyle.stackedlabel}>Email</Label>
                            <View style={registrationStyle.inputicon}>  
                            <TextInput style={registrationStyle.textinput} 
                            name="email" autoCorrect={false}
                            value={this.state.email}  maxLength = {50}
                            onChangeText={email=>this.setState({email})}/>
                            </View>
                        </Item>
                        <Item  stackedLabel style={registrationStyle.item}>
                            <Label style={registrationStyle.stackedlabel}>Password</Label>
                            <View style={registrationStyle.inputicon}>  
                            <TextInput style={registrationStyle.textinput} 
                            name="password" autoCorrect={false}
                            value={this.state.password}  maxLength = {50}
                            onChangeText={password=>this.setState({password})}/>
                            </View>
                        </Item>

                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <Button 
                                onPress={()=>this.onLogin()}
                                full rounded style={registrationStyle.registrationbutton}>
                                <Text style={{color:'white'}}>Login</Text>
                            </Button>
                            <TouchableHighlight underlayColor={'transparent'}>
                            <Text style={registrationStyle.haveaccount}>Forgot Password?</Text>
                            </TouchableHighlight>
                            <TouchableHighlight  underlayColor={'transparent'}  onPress={() =>navigate('Register')}>
                            <Text style={registrationStyle.haveaccount}>Not a member? <Text style={registrationStyle.loginButton}>Register</Text></Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </ScrollView>
            </Container>
      </Root>
    );
  }
}


const mapStateToProps = state => ({
})
  
  
  Login=connect(mapStateToProps,{userSignIn})(Login);
  
  export default Login;