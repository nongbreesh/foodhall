import {
  MapView,
  Image,
  TouchableOpacity, 
  InteractionManager,
} from 'react-native'

'use strict'; 
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import { setAddress } from '../../actions/address';
import { Container, Header, Title, Content, Text, Button, Icon,View } from 'native-base';

import myTheme from '../../themes/base-theme';
import styles from './styles';

class Mapdetail extends Component {

   
   constructor(props) {
    super(props);    
    this.state = {
    isFollowuser: true, 
    isFirstLoad: true, 
    mapRegion: undefined,
    mapRegionInput: undefined,
    annotations: [],
    placename:null,
    city: undefined,
    subdistrict: undefined,
    didRegionchange:false,
    address:[]
  };
  
  }
  
   componentDidMount() { 
     
   }
   
  
    popRoute() {    
      this.props.popRoute();
    } 
  
  
     setAddress(address) { 
        var  formatted_address = address.formatted_address;
        var city = address.address_components[2].long_name == undefined?'':address.address_components[2].long_name;
        var subdistrict = address.address_components[0].long_name == undefined?'':address.address_components[0].long_name; 
        var subdistrict2 = address.address_components[1].long_name == undefined?'':address.address_components[1].long_name; 
        this.props.setAddress({address:address,city:city,subdistrict :subdistrict +' '+ subdistrict2,placename:formatted_address}); 
    }
  
  
   _getAnnotations = (region) => {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'ตำแหน่งปัจจุบันของคุณ',
    }];
  }
  
  _onRegionChangeComplete = (region) => { 
    if (this.state.isFirstLoad) { 
        this.setState({
        didRegionchange:true,
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false, 
      }); 
    }
     
    setTimeout(() => {
             this.setState({
        isFollowuser: false, 
      }); 
         }, 3000);
    
     this.setState({ 
      placename:'Loading...',
    }); 
    
    this._getlocationfulladdress(region);
  };
  
 
   _getlocationfulladdress(region){
    
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ region.latitude+','+region.longitude+'&sensor=true';
      fetch(url)
     .then((response) => { return response.json() } ) 
     .catch((error) => console.warn("fetch error:", error))
     .then((response) => {  
        if(response.results.length > 0){
        var  formatted_address = response.results[0].formatted_address  == undefined?'':response.results[0].formatted_address;
        var city = response.results[0].address_components[2].long_name == undefined?'':response.results[0].address_components[2].long_name;
        var subdistrict =  response.results[0].address_components[0].long_name == undefined?'':response.results[0].address_components[0].long_name; 
          this.setState({address:response.results[0],city:city,subdistrict:subdistrict,placename:formatted_address,}); 
          this.setAddress(this.state.address);
        }

     })
       
  }
 
  
    render() {

        const { props: { name, index, list } } = this;

        return (
            <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name='ios-arrow-back' />
                    </Button>

                    <Title>{(name) ? name : 'ระบุตำแหน่งจัดส่ง'}</Title>

               
                </Header>
       
   <View style={styles.container}>
                   <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  backgroundColor: 'powderblue',}} >
       
                     <MapView  
                      style={styles.map}
                    
                     onRegionChangeComplete={this._onRegionChangeComplete}
                     showsUserLocation={true}
                     followUserLocation={this.state.isFollowuser}
                     showsCompass={true}
                     region={this.state.mapRegion} 
                     > 
                 
                     </MapView> 
                     
                          
                             <Image 
                            style={{  
                              width: 40,
                              height: 40, 
                             top:-10
                            }}
                            
                            resizeMode={"contain"} 
                          source={require('./img/ic_setloc.png')} 
                          /> 
                     
                     
                   
                  </View> 
       <TouchableOpacity
                      onPress={() => this.popRoute()}
                       activeOpacity={75 / 100}>  
                     <View
                       style={{  
                             position:'absolute', 
                        bottom:24,
                         left:0,
                         right:0,
                         flex:1,
                          backgroundColor: '#FFFFFF', 
                         margin:24, 
                          flexDirection: 'row',
                           justifyContent: 'center',
                          alignItems: 'center',
                         padding:8,
                         borderRadius:5
                         
                       }}>
                       <Text
                         style={{
                            flex:.8, 
                            alignItems: 'center',
                           color: "rgba(56,200,114,1)",
                           fontSize: 16,
                           fontWeight: 'normal',
                           fontFamily: 'Helvetica Neue',
                         }}>
                         {this.state.placename} 
                       </Text>
                        <View
                       style={{  
                          flex:.2,   
                             flexDirection: 'row',
                           justifyContent: 'flex-end',
                           alignItems: 'center', 
                       }}>
                          <Image 
                            style={{  
                              width: 20,
                              height: 20, 
                            }}
                            
                            resizeMode={"contain"} 
                          source={require('./img/ic_next.png')} 
                          />
                       </View>
                     </View>
                  </TouchableOpacity> 
            </View> 
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return { 
        openDrawer: ()=>dispatch(openDrawer()), 
        setAddress:(address)=>dispatch(setAddress(address)),
        popRoute: () => dispatch(popRoute()),
        
    }
}

function mapStateToProps(state) {   
    return {
        name: state.user.name,
        address: state.address.all, 
        index: state.list.selectedIndex,
        list: state.list.list, 
    };
}

export default connect(mapStateToProps, bindAction)(Mapdetail);
