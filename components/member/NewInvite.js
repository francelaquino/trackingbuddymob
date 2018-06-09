
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Content,Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import { sendInvite, displayMember, displayHomeMember } from '../../actions/memberActions' ;
var globalStyle = require('../../assets/style/GlobalStyle');


class NewInvite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            invitationcode:'3DG73I3',
        };
      }
    
    componentWillMount() {
        this.initialize();
    }
            
    initialize(){
        this.setState({
            isLoading:false,
        })
    }
    
    goBack(){
        this.props.navigation.goBack();
    }  
    onSubmit(){
        if(this.state.invitationcode==""){
            return false;
        }
        this.props.sendInvite(this.state.invitationcode).then(res=>{
        	if(res==true){
                ToastAndroid.showWithGravityAndOffset("Member successfully added",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
                this.props.displayMember();
                this.props.displayHomeMember();
                this.setState({invitationcode:''})
            }else{
                ToastAndroid.showWithGravityAndOffset("Invalid invitation code",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
            }
        }).catch(function(err) {
            ToastAndroid.showWithGravityAndOffset("Invalid invitation code",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
        });
    }

    loading(){
        return (
          <Root>
          <Container style={globalStyle.containerWrapper}>
          <View>
              <Text>Loading</Text>
          </View>
          </Container>
          </Root>
        )
    }
    ready(){
        return (
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerLeft} >
                            <Button transparent onPress={()=> {this.goBack()}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>Invitation</Title>
                        </Body>
                    </Header>
                
                    <Content padder>
                    <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.container}>
                            <Item  stackedLabel style={globalStyle.item}>
                                <View style={globalStyle.inputicon}>  
                                <TextInput style={globalStyle.textinputCenter} 
                                name="invitationcode" autoCorrect={false}
                                value={this.state.invitationcode}  maxLength = {20}
                                onChangeText={invitationcode=>this.setState({invitationcode})}/>
                                </View>
                            </Item>
                            
                            
                            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                <Button disabled={!this.state.invitationcode}
                                    onPress={()=>this.onSubmit()}
                                    bordered light full rounded style={this.state.invitationcode ? globalStyle.secondaryButton : globalStyle.secondaryButtonDisabled}>
                                    <Text style={{color:'white'}}>Send Invitation</Text>
                                </Button>
                            </View>

                        </View>
                    </ScrollView>
                    </Content>
                </Container>
        </Root>
        );
    }
    render() {
        if(this.state.isLoading){
            return this.loading();
        }else{
            return this.ready();
        }
    }
}


const mapStateToProps = state => ({
    members: state.fetchMember.members,
})
  
export default connect(mapStateToProps,{displayMember,sendInvite,displayHomeMember})(NewInvite);