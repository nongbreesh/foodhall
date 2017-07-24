<<<<<<< HEAD
<<<<<<< HEAD

'use strict';

import React, { Component } from 'react';
import Buttons from 'react-native-button';
import { connect } from 'react-redux';

import {
  TouchableOpacity,
  MapView,
  Image,
  AsyncStorage,
  AlertIOS,
  Platform,
  PushNotificationIOS,
} from 'react-native'
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import { setAddress } from '../../actions/address';
import { setUser } from '../../actions/user';
import { replaceRoute, replaceOrPushRoute ,pushNewRoute} from '../../actions/route';
import LoadingContainer from 'react-native-loading-container';
import { Container, Header, Title, Content, View, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import myTheme from '../../themes/base-theme';
import styles from './styles';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placename:null,
      city: undefined,
      subdistrict: undefined,
      address:[],
      token:''
    };

  }

  componentWillMount() {
    AsyncStorage.getItem("userdetail").then((value) => {
      this.props.setUser(JSON.parse(value));
      if(Platform.OS === "ios"){
        PushNotificationIOS.addEventListener('register', this._onRegistered.bind(this));
        PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification.bind(this));
        PushNotificationIOS.requestPermissions();
      }
    }).done();
  }

  componentWillUnmount() {
    AsyncStorage.getItem("userdetail").then((value) => {
      this.props.setUser(JSON.parse(value));
      if(Platform.OS === "ios"){
        PushNotificationIOS.addEventListener('register', this._onRegistered.bind(this));
        PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification.bind(this));
        PushNotificationIOS.requestPermissions();
      }
    }).done();
  }

  componentDidMount() {

  }

  _onRegistered(deviceToken) {
    this.registeriOSToken(deviceToken);
  }

  registeriOSToken(token){
    //console.log(token);
    if(!this.props.user)return;
    var params = {
      userid: this.props.user.id,
      iostoken: token,
    };
    //console.log(params);
    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }
    var request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: formData
    };

    fetch(this.props.apiaddress + 'api/setbuyertoken',request).then((response) =>
    {
      return response.json() // << This is the problem
    })
    .then((responseData) => { // responseData = undefined
      return responseData;
    })
    .then((data) => {
    }).done();
  }


  _onRegistrationError(error) {
    AlertIOS.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onRemoteNotification(notification) {
    AlertIOS.alert(
      'Push Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onLocalNotification(notification){
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  async _getlocationfulladdress(region){
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ region.latitude+','+region.longitude+'&sensor=true';
    let response = await fetch(url);
    var result = await response.json();
    this.setAddress(result.results[0]);
    return new Promise((resolve) => {
      this.setState({address:result.results[0]},resolve);
    });
  }

  replaceRoute(route) {
    this.props.pushNewRoute(route);
  }

  replaceOrPushRoute(route) {
    this.props.replaceOrPushRoute(route);
  }

  navigateTo(route, index) {
    this.props.closeDrawer();
    this.props.setIndex(index);
    this.props.pushNewRoute(route);
  }

  setAddress(address) {
    var  formatted_address = address.formatted_address;
    var city = address.address_components[2].long_name == undefined?'':address.address_components[2].long_name;
    var subdistrict = address.address_components[0].long_name == undefined?'':address.address_components[0].long_name;
    var subdistrict2 = address.address_components[1].long_name == undefined?'':address.address_components[1].long_name;
    this.setState({address:address,city:city,subdistrict:subdistrict,placename:formatted_address});
    this.props.setAddress({address:address,city:city,subdistrict:subdistrict + ' '+ subdistrict2,placename:formatted_address});
  }



  async _loadInitialDataAsync() {
    let response = await fetch('https://www.reddit.com/r/reactnative.json');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._getlocationfulladdress(position.coords);
        return position;
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );


  }

  async _onReadyAsync() {
    return new Promise((resolve) => {
      this.setState(resolve);
    });
  }
  render() {
    return (
      <Container theme={myTheme}  style={{backgroundColor: '#FFFFFF'}}>
      <Header>
      <Title>{(this.props.name) ? this.props.name : 'Address'}</Title>

      <Button transparent onPress={this.props.openDrawer}>
      <Icon name='ios-menu' />
      </Button>
      </Header>


      <View style={styles.container}>
      <LoadingContainer
      onError={e => console.log(e)}
      onLoadStartAsync={this._loadInitialDataAsync.bind(this)}
      onReadyAsync={this._onReadyAsync.bind(this)}>
      <Content>
      <View
      style={{
        flex: 1,
      }}>
      <Image
      style={{height: 230, width: null}}
      source={require('./img/location_bg.jpeg')}
      >
      </Image>
      </View>
      <View
      style={{
        alignItems:  'center',
        padding:16,
        paddingTop:24,
        backgroundColor: '#FFFFFF'
      }}>
      <Text
      style={{
        color: 'black',
        fontSize: 28,
        lineHeight:28,
        fontWeight: "normal",
        fontFamily: 'Helvetica Neue',
      }}>
      Set location
      </Text>
      </View>

      <View
      style={{
        alignItems:  'flex-start',
        padding:16,
        paddingTop:18,
        backgroundColor: '#FFFFFF'
      }}>
      <Text
      style={{
        color: "rgba(116,116,116,1)",
        fontSize: 16,
        lineHeight:16,
        fontWeight: "normal",
        fontFamily: 'Helvetica Neue',
      }}>
      City
      </Text>


      <View
      style={{
        flexDirection:'row' ,
        flex:1,
      }}>
      <View
      style={{
        flexDirection:'row' ,
        flex:9,
      }}>
      <Text numberOfLines={1}
      style={{
        width:320,
        textDecorationLine: 'underline',
        color: "rgba(0,0,0,1)",
        fontSize:  18 ,
        lineHeight:25,
        fontWeight: "500",
        marginTop:18,
        fontFamily: 'Helvetica Neue',
      }}>
      {this.props.address.city}
      </Text>
      </View>
      <View
      style={{
        flexDirection:'row' ,
        flex:1,
      }}>
      <TouchableOpacity onPress={() => this.replaceRoute('mapdetail')} >
      <Image   onPress={() => this.replaceRoute('mapdetail')}
      style={{height: 30, width: 30,marginLeft:8,marginTop:12}}
      source={require('./img/ic_navigation.png')}
      ></Image>
      </TouchableOpacity>
      </View>
      </View>

      <Text
      style={{
        marginTop:24,
        color: "rgba(116,116,116,1)",
        fontSize: 16,
        lineHeight:16,
        fontWeight: "normal",
        fontFamily: 'Helvetica Neue',
      }}>
      Sub district
      </Text>

      <Text
      style={{
        color: "rgba(0,0,0,1)",
        fontSize:  18 ,
        lineHeight:25,
        fontWeight: "500",
        textDecorationLine: 'underline',
        marginTop:18,
        fontFamily: 'Helvetica Neue',
      }}>
      {this.props.address.subdistrict}
      </Text>



      </View>
      <View
      style={{
        alignItems:  'center',
        backgroundColor: '#FFFFFF'
      }}>
      <Buttons onPress={() => this.replaceOrPushRoute('shops')}
      containerStyle={{padding:8,  width:300 ,marginTop:40,overflow:'hidden', borderRadius:4, backgroundColor: '#F3C42C'}}
      style={{fontSize: 20, color: 'white',}}>
      แสดงรายการร้านอาหาร
      </Buttons>
      </View>
      </Content>
      </LoadingContainer>
      </View>

      </Container>
    )
=======
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";

class Home extends Component {
=======
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";

class Home extends Component {
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    console.log(DrawNav, "786785786");
    return (
      <Container style={styles.container}>
        <Header>
          <Left>

            <Button
              transparent
              onPress={() => {
                DrawerNav.dispatch(
                  NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Home" })]
                  })
                );
                DrawerNav.goBack();
              }}
            >
              <Icon active name="power" />
            </Button>
          </Left>

          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => DrawerNav.navigate("DrawerOpen")}
            >
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Grid style={styles.mt}>
            {this.props.list.map((item, i) => (
              <Row key={i}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() =>
                    this.props.navigation.navigate("BlankPage", {
                      name: { item }
                    })}
                >
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </Row>
            ))}
          </Grid>
        </Content>
      </Container>
    );
<<<<<<< HEAD
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
  }
}

function bindAction(dispatch) {
  return {
<<<<<<< HEAD
<<<<<<< HEAD
    openDrawer: ()=>dispatch(openDrawer()),
    closeDrawer: ()=>dispatch(closeDrawer()),
    pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
    replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
    setAddress:(address)=>dispatch(setAddress(address)),
    setUser:(all)=>dispatch(setUser(all)),

  }
}

function mapStateToProps(state) {
  return {
    address: state.address.all,
    apiaddress: state.list.apiaddress,
    imageaddress: state.list.imageaddress,
    user: state.user.all,
=======
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
=======
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    BlankPage2: { screen: BlankPage2 }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;
