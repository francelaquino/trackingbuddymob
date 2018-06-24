
import React, { Component } from 'react';
import { NetInfo , TouchableOpacity,Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, ToastAndroid, Image,Dimensions } from 'react-native';
import { Drawer,Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail,Card,CardItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, { ProviderPropType, Marker, AnimatedRegion,Animated,Polyline } from 'react-native-maps';
import Loading  from '../shared/Loading';
import LeftDrawer from '../shared/LeftDrawer'
import { connect } from 'react-redux';
import { displayHomeMember  } from '../../actions/memberActions' ;
import { setConnection  } from '../../actions/connectionActions' ;
import { saveLocationOffline, saveLocationOnline  } from '../../actions/locationActions' ;
import firebase from 'react-native-firebase';
import BackgroundJob from 'react-native-background-job';

var globalStyle = require('../../assets/style/GlobalStyle');
var userdetails = require('../../components/shared/userDetails');
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = .05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

BackgroundJob.cancelAll();

const trackPosition = {
    jobKey: "trackPositionJob",
    job: () =>trackLocation(),
};
    
BackgroundJob.register(trackPosition);

var trackPositionSchedule = {
    jobKey: "trackPositionJob",
    period: 200000,
    exact: true,
    allowExecutionInForeground: true
}

  
let trackLocation;


class HomePlaces extends Component {
    constructor(props) {
        super(props)
        this.map = null;

        this.state = {
            isMapReady:false,
            groupname:'',
            isLoading:true,
            region:{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA ,
                longitudeDelta: LONGITUDE_DELTA,
            },
            centerMarker: [],
            markers: [],
        };

      }
    

    

    
   
    componentDidMount(){
        let self=this;
        trackLocation =function() {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let coords = {
                        lat: position.coords.latitude,
                        lng:  position.coords.longitude,
                        dateadded : Date.now()
                      };
                    NetInfo.isConnected.fetch().done((isConnected) => {
                        if(isConnected){

                            self.props.saveLocationOnline(coords);

                        }else{
                            self.props.saveLocationOffline(coords);
                        }
                    });
        
        
               
                },
                (err) => {
                },
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
              );
            }

    
        this.setState({ isLoading:false});
        BackgroundJob.schedule(trackPositionSchedule);
        
    }
  

    plotMarker(){

            this.setState({markers:[],centerMarker:[]})
            for (let i = 0; i < this.props.members.length; i++) {
                const coord = {
                    id:i,
                    firstname:this.props.members[i].firstname,
                    address:this.props.members[i].address,
                    avatar:this.props.members[i].avatar,
                    coordinates:{
                      latitude: this.props.members[i].coordinates.latitude,
                      longitude: this.props.members[i].coordinates.longitude,
                      latitudeDelta: LATITUDE_DELTA ,
                      longitudeDelta: LONGITUDE_DELTA,
                    }
                  };

                 
                
                if(!isNaN(this.props.members[i].coordinates.longitude) && !isNaN(this.props.members[i].coordinates.latitude)){
                    this.setState({ isLoading:false,markers: this.state.markers.concat(coord),centerMarker: this.state.centerMarker.concat(coord.coordinates) })
                    
                }
                   
            }
            

    }
    fitToMap(){
        if(this.props.members.length==1){
            this.map.animateToRegion({
                latitude: this.props.members[0].coordinates.latitude,
                longitude: this.props.members[0].coordinates.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              })
        }else{
            this.map.fitToCoordinates(this.state.centerMarker, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })  
        }

    }
    
    componentWillMount() {
        this.initialize();
    }

    centerToMarker(latitude,longitude){
       
        let center=[{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.00522 * ASPECT_RATIO
        }
        ];
        this.map.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          })

    }
    
    
    changeGroup = (groupname) => {
        this.reload();
        this.setState({groupname:groupname});
        
    }
    reload(){
        let self=this;
        self.props.displayHomeMember().then(res=>{
            setTimeout(() => {
                self.plotMarker();
            }, 1000);
        });
    }
    initialize(){
        let self=this;
        let memberRef = firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',function(snapshot){
            self.props.displayHomeMember().then(res=>{
                setTimeout(() => {
                    self.plotMarker();
                }, 1000);
            });
        })
       


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

  
    

    closeDrawer = () => {
        this.drawer._root.close()
    };
      openDrawer = () => {
        this.drawer._root.open()
    };
    ready(){


        const members =this.props.members.map(member=>(
            <ListItem key={member.id}  avatar style={globalStyle.listItemSmall} >
            <Left style={globalStyle.listLeft}>
               
                <View style={globalStyle.listAvatarContainerSmall} >
                { member.avatar==='' ?  <Thumbnail  onPress={()=>this.centerToMarker(member.coordinates.latitude,member.coordinates.longitude)} style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                <Thumbnail onPress={()=>this.centerToMarker(member.coordinates.latitude,member.coordinates.longitude)}  style={globalStyle.listAvatarSmall} source={{uri: member.avatar}} />
                }
                </View>
            </Left>
            <Body style={globalStyle.listBody} >
                <Text numberOfLines={1} style={globalStyle.listHeading} onPress={()=>this.centerToMarker(member.coordinates.latitude,member.coordinates.longitude)}>{member.firstname}</Text>
                <Text numberOfLines={1} note style={{fontSize:10}}>{member.address}</Text>
            </Body>
            <Right button style={globalStyle.listRight} >
                <TouchableOpacity  onPress={() =>this.props.navigation.navigate('LocationPlaces',{id:member.id})} >
                <View style={{width:50,height:50,justifyContent: 'center',alignItems: 'center'}}>
                <Entypo  style={{marginTop:28,fontSize:20,color:'#fbbc05'}} name="location"/>
                </View>
                </TouchableOpacity>
              </Right>
            </ListItem>
        ));

        const markers =this.state.markers.map(marker=>(
                <MapView.Marker key={marker.id}
                onLayout = {() => this.fitToMap()}
                coordinate={marker.coordinates}
                title={marker.firstname}>
                <Image style={styles.marker} 
                    source={require('../../images/marker.png')} />
                        <Text   style={styles.markerText}>{marker.firstname}</Text>
                   
                <MapView.Callout>
                
                    <View style={styles.callOut}>
                    <View style={globalStyle.listAvatarContainerSmall} >
                    { marker.avatar==='' ?  <Thumbnail  style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                    <Thumbnail  style={globalStyle.listAvatarSmall} source={{uri: marker.avatar}} />
                    }
                    </View>
                    <Text  style={styles.callOutText}>{marker.address}</Text></View>
                </MapView.Callout>
                </MapView.Marker>
               
        ));
        
        

        return (
            <Drawer leftDrawerWidth={40}
            tapToClose={true} 
                ref={(ref) => { this.drawer = ref; }}
                content={<LeftDrawer closeDrawer = {this.closeDrawer} navigation={this.props.navigation}/>}
                onClose={() => this.closeDrawer()} >
                <Root>
                
                <Container style={globalStyle.containerWrapper}>
                
          
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerMenu} >
                            <Button transparent onPress={()=>this.openDrawer()} >
                                <Icon size={30} name='menu' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>Home</Title>
                        </Body>
                        
                       


                           
                            
                        
                    </Header>
                    <View style={styles.mainContainer}>
                    
                        <View style={styles.mapContainer}>
                        
                        <MapView ref={map => {this.map = map}}
                            showsUserLocation = {false}
                            zoomEnabled = {true}
                            style={styles.map}
                            loadingEnabled={true}
                            >
                            {markers}


                            </MapView>
                            { this.state.groupname!=='' &&
                            <View style={{flexDirection: 'column',marginVertical: 5,width:'100%', alignItems:'center',position:'absolute',bottom:0}}>
                            <Text style={{paddingTop:5,opacity:.5,borderRadius:15,backgroundColor:'black',width:200,height:30,color:'white',textAlign:'center', alignSelf: "center", flexDirection:'column'}}>{this.state.groupname} Group</Text>
                            </View>
                            }
                        </View>
                        
                        
                        <View style={styles.navBar} >
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>this.props.navigation.navigate('SelectGroup',{changeGroup : this.changeGroup})}>
                                <Ionicons style={globalStyle.navBarIcon} name="md-swap"/>
                                <Text style={globalStyle.navBarLabel}>Switch Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>this.fitToMap()}>
                                <Entypo style={globalStyle.navBarIcon} name="location"/>
                                <Text style={globalStyle.navBarLabel}>Center Map</Text>
                            </TouchableOpacity>
                            <View style={globalStyle.navBarButton}>
                                <MaterialIcons style={globalStyle.navBarIcon} name="my-location"/>
                                <Text style={globalStyle.navBarLabel}>Checkin</Text>
                            </View>
                            
                        </View>
                        
                        <View style={styles.memberContainer} >
                        <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                            {members}
                            
                        </ScrollView>
                        </View>
                    </View>
          

                    
                </Container>
            </Root>
            </Drawer>
            
        )
    }



    render() {
            if(this.state.isLoading){
                return this.loading();
            }else{
                return this.ready();
            }
        

  }
}



const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    navBar: {
        flexDirection: 'row',
        height: 50,
        padding:2,
        backgroundColor: '#35bcc1',
        alignItems:'center',
        borderTopWidth:0,
        borderTopColor:'#009da3',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
    },
    
    mapContainer: {
      flex: 1,
      display: 'flex',
      
    },
    memberContainer: {
        height: 160,
        display: 'flex',
        borderTopColor:'#848482',
        borderTopWidth:.5,
        
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      marker: {
        alignSelf: 'center',
        width:45,
        height:55,
        margin:0,padding:0 
    },
    markerText: {
        textAlign: 'center',
        flex: 1,
        color: 'black',
        fontSize: 6,
        width:32,
        marginLeft:6,
        marginTop:15,
        position:'absolute',


    },
    callOut: {
        width: 100,
        alignItems:'center',
    },
    callOutText:{
        fontSize: 10,
        textAlign: 'center',
    }
  });


const mapStateToProps = state => ({
    members: state.fetchMember.home_members,
    isLoading:state.fetchMember.isLoading,
    isConnected:state.fetchConnection.isConnected,
    coordinates:state.fetchLocation.coordinates,
    
  })
  
  
  
HomePlaces=connect(mapStateToProps,{displayHomeMember,setConnection,saveLocationOffline,saveLocationOnline})(HomePlaces);
  
export default HomePlaces;