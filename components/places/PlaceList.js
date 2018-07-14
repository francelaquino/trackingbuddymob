
import React, { Component } from 'react';
import { TouchableOpacity,Modal, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, ToastAndroid, Image, FlatList  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch,Thumbnail, Card,CardItem } from 'native-base';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { displayPlaces  } from '../../actions/locationActions' ;
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading  from '../shared/Loading';
var globalStyle = require('../../assets/style/GlobalStyle');



class PlaceList extends Component {
    constructor(props) {
        super(props)
    
    }
   
    componentWillMount() {
        this.initialize();
    }
        
    initialize(){
        this.props.displayPlaces();
    }




    

    loading(){
        return (
          <Root>
          <Container style={globalStyle.containerWrapper}>
          <Loading/>
          </Container>
          </Root>
        )
    }

    renderPlaces(){
        const data=this.props.places;
        return (
            <FlatList
            style={{flex:1}}
                keyExtractor={item => item.id}
                data={data}
                renderItem={({ item }) => (
                    <ListItem icon key={item.id}  avatar style={globalStyle.listItem} >
                    <Left >
                    
                    <Entypo  style={{fontSize:30,color:'#1eaec5'}} name="location"/>
                </Left>
                        <Body style={globalStyle.listBody} >
                            <Text numberOfLines={1} style={globalStyle.listHeading}>{item.placename}</Text>
                            <Text  numberOfLines={1} note style={{fontSize:12}}>{item.address}</Text>
                        </Body>
                    
                        <Right style={globalStyle.listRight}>
                        <TouchableOpacity  style={globalStyle.listRightTouchable}  
                            onPress={() => {this.props.navigation.navigate("PlaceView",{place:item})}}>
                            <SimpleLineIcons  style={globalStyle.listRightOptionIcon}   name='arrow-right' />
                        </TouchableOpacity>
                        </Right>
                    </ListItem>
                ) }
            />)
    }
    ready(){
      
         
        return(
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                    <Left style={globalStyle.headerLeft} >
                            <Button transparent onPress={()=> {this.props.navigation.goBack()}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>Places</Title>
                        </Body>
                        <Right  >
                            <Button transparent onPress={() =>navigate('CreatePlace')}>
                                <Text style={globalStyle.headerRightText}>Add Place</Text>
                            </Button> 
                            
                        </Right>
                    </Header>
                    <Content >
                    <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"} showsVerticalScrollIndicator={false}>
                    <View style={globalStyle.container}>
                    
                        <List>
                            {this.renderPlaces()}
                        </List>
                         
                    </View>
                    </ScrollView>
                    </Content>
                </Container>
            </Root>
        )
    }

    render() {
        if(this.props.isLoading){
            return this.loading();
        }else{
            return this.ready();
        }
    }
   
}
  
  

const mapStateToProps = state => ({
    places: state.fetchLocation.places,
    isLoading: state.fetchLocation.isLoading,
  })
  
PlaceList=connect(mapStateToProps,{displayPlaces})(PlaceList);
  
export default PlaceList;

