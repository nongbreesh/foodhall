
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native'
import { openDrawer } from '../../actions/drawer';
import { popRoute,replaceRoute,replaceOrPushRoute,pushNewRoute } from '../../actions/route';
import { View,Container,Header, Content, List, ListItem, InputGroup, Input, Icon ,Button,Title} from 'native-base';
import { setLastestsendOtp } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { setUser } from '../../actions/user';
class Verifyotp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tel:this.props.userdetail.tel,
      id:'',
      email:'',
      fromTime:null,
      fbid:'',
      otp:'',
    };

  }

  componentDidMount(){
    this.setState({id:this.props.userdetail.id,email:this.props.userdetail.email,fbid:this.props.userdetail.fbid});
  }

  replaceRoute(route) {
    this.props.pushNewRoute(route);
  }

  navigateTo(route) {
    this.props.replaceOrPushRoute(route);
  }



  popRoute() {
    this.props.popRoute();
  }

  veryfyotp(){
    //this.replaceRoute('lastregister');
    var params = {
      tel: this.state.tel,
      fbid: '',
      otp: this.state.otp,
    };
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
    fetch(this.props.apiaddress + 'api/verifyOtp',request).then((response) =>
    {
      return response.json() // << This is the problem
    })
    .then((responseData) => { // responseData = undefined
      return responseData;
    })
    .then((data) => {
      if(data.result == true){
        // do register step
        this.replaceRoute('lastregister');
      }
      else{
        if(Platform.OS === "ios"){
          Alert.alert(
            'Warning!',
            'รหัส OTP ไม่ถูกต้อง'
          );
        }
        else{
          ToastAndroid.show(  'รหัส OTP ไม่ถูกต้อง'  , ToastAndroid.SHORT);
        }
      }
    }).done();
  }


  resendsendotp(){

    var tel = this.state.tel;

    var params = {
      tel: tel,
    };
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

    var fromTime = this.props.lastestsendorp;
    var toTime = new Date();
    var intime = false;
    if(fromTime == undefined){
      fromTime =  new Date();
      this.props.setLastestsendOtp(fromTime);
      intime  = true;
    }
    else{
      var differenceTravel = toTime.getTime() - fromTime.getTime();
      var seconds = Math.floor((differenceTravel) / (1000));
      if(seconds < 60){
        intime  = false;
        if(Platform.OS === "ios"){
          Alert.alert(
            'Warning!',
            'กรุณาลองใหม่อีกครั้งในอีก ' + ( 60 - seconds) + ' วินาที'
          );
        }
        else{
          ToastAndroid.show('กรุณาลองใหม่อีกครั้งในอีก ' + ( 60 - seconds) + ' วินาที' , ToastAndroid.SHORT);
        }
      }
      else{
        intime = true;
      }
    }

    if(intime){
      fetch(this.props.apiaddress + 'api/generateOtp',request).then((response) =>
      {
        return response.json() // << This is the problem
      })
      .then((responseData) => { // responseData = undefined
        return responseData;
      })
      .then((data) => {
        if(data.result == true){
          var fromTime =  new Date();
          this.props.setLastestsendOtp(fromTime);
        }
      }).done();
    }

  }


  render() {

    const { props: { name, index, list,tel } } = this;
    {

      return (
        <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
        <Header>
        <Button transparent onPress={() => this.popRoute()}>
        <Icon name='ios-arrow-back' />
        </Button>

        <Title>ยืนยัน OTP</Title>


        </Header>

        <Content padder style={{backgroundColor:'#FFFFFF',}}>
        <Grid style={{ flex: 1, flexDirection: 'column',  alignItems: 'center',}}>
        <Row style={{ flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',}}>
        <List  style={{
          marginLeft:-16,
        }}>
        <ListItem style={{width:100,marginTop:62,}}>
        <InputGroup >
        <Input keyboardType="numeric" maxLength={5} autoFocus={true}  style={{color:'#000', fontSize: 24, textAlign: 'center', textAlignVertical: 'center' , }}
        onChangeText={otp => this.setState({otp})} />
        </InputGroup>
        </ListItem>
        </List >
        </Row>
        <Row style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',marginTop:32, }}>
        <Text
        style={{
          width:280,
          color: "#000000",
          textAlign:"center",
          fontSize: 14,
          fontWeight: "normal",
          fontFamily: 'Helvetica Neue',
        }}>พิมพ์รหัสที่ได้จาก SMS เบอร์ {this.props.userdetail.tel} (รหัสใช้ได้เพียงครั้งเดียว)</Text>
        </Row>
        <Row style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'center'}} >
        <Col style={{flexDirection: 'row',  alignItems: 'flex-end', justifyContent: 'center',}}>
        <TouchableOpacity onPress={() => this.resendsendotp()} >
        <View  style={{backgroundColor:'#dddddd',flex:1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  marginTop:24,padding:8,  width:100,borderRadius:4 }}>
        <Text
        style={{
          color: "#000000",
          fontSize: 14,
          fontWeight: "normal",
          fontFamily: 'Helvetica Neue',
        }}>ขอรหัสผ่านใหม่</Text>
        </View>
        </TouchableOpacity>
        </Col>
        <Col style={{flexDirection: 'row',  alignItems: 'flex-start', justifyContent: 'center',}}>
        <TouchableOpacity onPress={() => this.veryfyotp()} >
        <View  style={{backgroundColor:'#000000',flex:1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  marginTop:24,padding:8,  width:100,borderRadius:4 }}>
        <Text
        style={{
          color: "#FFFFFF",
          fontSize: 14,
          fontWeight: "normal",
          fontFamily: 'Helvetica Neue',
        }}>ยืนยัน</Text>
        </View>
        </TouchableOpacity>
        </Col>
        </Row>

        </Grid>

        </Content>
        </Container>
      )

    }
  }

}


function bindAction(dispatch) {
  return {
    openDrawer: ()=>dispatch(openDrawer()),
    popRoute: () => dispatch(popRoute()),
    replaceRoute:()=>dispatch(replaceRoute),
    pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
    replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
    setLastestsendOtp:(time)=>dispatch(setLastestsendOtp(time)),
    setUser:(all)=>dispatch(setUser(all)),
  }
}

function mapStateToProps(state) {
  return {
    userdetail: state.user.all,
    index: state.list.selectedIndex,
    list: state.list.list,
    apiaddress: state.list.apiaddress,
    imageaddress: state.list.imageaddress,
    lastestsendorp:state.list.lastestsendorp,
  };
}

export default connect(mapStateToProps, bindAction)(Verifyotp);
