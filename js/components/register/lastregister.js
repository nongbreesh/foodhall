
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
  AsyncStorage,
} from 'react-native'
import { openDrawer } from '../../actions/drawer';
import { popRoute,replaceRoute,replaceOrPushRoute,pushNewRoute } from '../../actions/route';
import { View,Container,Header, Content, List, ListItem, InputGroup, Input, Icon ,Button,Title} from 'native-base';
import { setLastestsendOtp } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { setUser } from '../../actions/user';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import styles from './styles';
class Lastregister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tel:this.props.userdetail.tel,
      id:'',
      email:'',
      password:'',
      repassword:'',
      fbid:'',
      name:'',
      gender:'',
      loading:false,
    };

  }

  componentDidMount(){
    if(!this.props.userdetail) return;
    this.setState({id:this.props.userdetail.id,email:this.props.userdetail.email,fbid:this.props.userdetail.fbid
      ,name:this.props.userdetail.name
      ,gender:this.props.userdetail.gender})
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

    validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    dologin(){
      var params = {
        email: this.state.email,
        password: this.state.password,
        fbid:this.state.fbid,
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
      fetch(this.props.apiaddress + 'api/buyer_login',request).then((response) =>
      {
        return response.json() // << This is the problem
      })
      .then((responseData) => { // responseData = undefined
        return responseData;
      })
      .then((data) => {
        this.setState({loading:false,});
        //console.log(data.result);
        if(data.result != null){
          AsyncStorage.setItem("userdetail",JSON.stringify({tel:data.result.tel
            ,email:data.result.email
            ,islogin:1
            ,fullname:data.result.fullname
            ,id:data.result.id
            ,fbid:data.result.fbid}));

            AsyncStorage.getItem("userdetail").then((value) => {
              this.props.setUser(JSON.parse(value));
            }).done();

            this.navigateTo('account');


          }
          else{
            this.setState({loading:false,});
            this.alertmsg('อีเมลล์ซ้ำในระบบ');
          }
        }).done();
      }


      register(){
        this.props.setUser({tel:this.state.tel,email:this.state.email,password:this.state.password,  fbid:this.state.fbid,  name:this.state.name,
          gender:this.state.gender,});
          if(this.state.email != ''
          && this.state.password != ''
          && this.state.repassword != ''){
            if(this.state.password  == this.state.repassword){
              if(this.validateEmail(this.state.email)){
                // do register
                this.setState({loading:true,});
                var params = {
                  tel: this.state.tel,
                  password: this.state.password,
                  email: this.state.email,
                  fbid: this.state.fbid,
                  name: this.state.name,
                  gender: this.state.gender,
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
                fetch(this.props.apiaddress + 'api/buyer_register',request).then((response) =>
                {
                  return response.json() // << This is the problem
                })
                .then((responseData) => { // responseData = undefined
                  return responseData;
                })
                .then((data) => {
                  this.setState({loading:false,});
                  if(data.result == 'success'){
                    this.dologin();
                  }
                  else{
                    this.setState({loading:false,});
                    this.alertmsg('อีเมลล์ซ้ำในระบบ');
                  }
                }).done();
              }
              else{
                this.alertmsg('กรุณากรอกอีเมลล์ให้ถูกต้อง');
              }
            }
            else{
              this.alertmsg('รหัสผ่านไม่ตรงกัน');
            }
          }
          else{
            this.alertmsg('กรุณากรอกข้อมูลให้ครบ');
          }

        }

        alertmsg(msg){
          if(Platform.OS === "ios"){
            Alert.alert(
              'Warning!',
              msg
            );
          }
          else{
            ToastAndroid.show(msg, ToastAndroid.SHORT);
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

              <Title>ข้อมูลสมัครสมาชิก</Title>


              </Header>
              <View style={styles.container}>

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
              <Icon name='ios-mail-outline' style={{color:'#000',}} />
              <Input autoCorrect={false} value={this.state.email} keyboardType="email-address" placeholder='อีเมลล์'  style={{color:'#000', }}
              onChangeText={email => this.setState({email})} />
              </InputGroup>

              </ListItem>
              <ListItem style={{width:300,}}>
              <InputGroup >
              <Icon name='ios-unlock-outline'  style={{color:'#000',}}  />
              <Input placeholder='รหัสผ่าน' secureTextEntry={true}  style={{color:'#000',}}
              onChangeText={password => this.setState({password})} />
              </InputGroup>
              </ListItem>
              <ListItem style={{width:300,}}>
              <InputGroup >
              <Icon name='ios-unlock-outline'  style={{color:'#000',}}  />
              <Input placeholder='ยืนยันรหัสผ่าน' secureTextEntry={true}  style={{color:'#000',}}
              onChangeText={repassword => this.setState({repassword})} />
              </InputGroup>
              </ListItem>



              </List >
              <TouchableOpacity onPress={() => this.register()} >
              <View  style={{backgroundColor:'#F3C42C',flex:1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  marginTop:24,padding:8,  width:300,borderRadius:4 }}>
              <Text
              style={{
                color: "rgba(255,255,255,1)",
                fontSize: 14,
                fontWeight: "normal",
                fontFamily: 'Helvetica Neue',
              }}>ยืนยันการสมัคร</Text>
              </View>
              </TouchableOpacity>



              </Row>

              </Grid>

              </Content>

              <SleekLoadingIndicator loading={this.state.loading} />
              </View>
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

      export default connect(mapStateToProps, bindAction)(Lastregister);
