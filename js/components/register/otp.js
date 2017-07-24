
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
class Otp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tel:'',
      id:'',
      email:'',
      fbid:'',
      name:'',
      gender:'',
      fromTime:null,
    };
  }

  componentDidMount(){
    if(!this.props.userdetail) return;
    this.setState({id:this.props.userdetail.id,email:this.props.userdetail.email,fbid:this.props.userdetail.fbid
      ,name:this.props.userdetail.name
      ,gender:this.props.userdetail.gender});
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


    sendotp(){
      this.props.setUser({tel:this.state.tel,id:this.state.id,email:this.state.email,fbid:this.state.fbid ,name:this.state.name,
        gender:this.state.gender,});
      // this.replaceRoute('verifyotp');
      var fromTime =  new Date();
      this.props.setLastestsendOtp(fromTime);
      var phoneno = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      var tel = this.state.tel;

      if(phoneno.test(tel)){
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
              this.replaceRoute('verifyotp',this.state.tel);
            }
          }).done();
        }
      }
      else{
        if(Platform.OS === "ios"){
          Alert.alert(
            'Warning!',
            'เบอร์โทรศัพท์ไม่ถูกต้อง'
          );
        }
        else{
          ToastAndroid.show('เบอร์โทรศัพท์ไม่ถูกต้อง', ToastAndroid.SHORT);
        }

      }
    }


    render() {

      const { props: { name, index, list } } = this;
      {

        return (
          <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
          <Header>
          <Button transparent onPress={() => this.popRoute()}>
          <Icon name='ios-arrow-back' />
          </Button>

          <Title>OTP</Title>


          </Header>

          <Content padder style={{backgroundColor:'#FFFFFF',}}>
          <Grid style={{ flex: 1, flexDirection: 'column',  alignItems: 'center',}}>
          <Row style={{ flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',}}>


          <List  style={{
            marginLeft:-16,
          }}>
          <ListItem style={{width:300,marginTop:62,}}>
          <InputGroup >
          <Icon name='ios-phone-portrait' style={{color:'#000',}} />
          <Input keyboardType="phone-pad" placeholder='ระบุเบอร์โทรศัพท์'  style={{color:'#000', }}

          onChangeText={tel => this.setState({tel})} />
          </InputGroup>
          </ListItem>


          </List >
          <TouchableOpacity onPress={() => this.sendotp()} >
          <View  style={{backgroundColor:'#F3C42C',flex:1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  marginTop:24,padding:8,  width:300,borderRadius:4 }}>
          <Text
          style={{
            color: "rgba(255,255,255,1)",
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: 'Helvetica Neue',
          }}>ตกลง</Text>
          </View>
          </TouchableOpacity>



          </Row>
          <TouchableOpacity onPress={() => this.popRoute()} >
          <Text
          style={{
            marginTop:24,
            textDecorationLine: 'underline',
            color: 'black',
            fontSize: 14,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          ล๊อคอินเข้าสู่ระบบ
          </Text>
          </TouchableOpacity>
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
      pushNewRoute:(route,prop)=>dispatch(pushNewRoute(route)),
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

  export default connect(mapStateToProps, bindAction)(Otp);
