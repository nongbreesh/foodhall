
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
import { setUser } from '../../actions/user';
import { popRoute,replaceRoute,replaceOrPushRoute,pushNewRoute } from '../../actions/route';
import { View,Container,Header, Content, List, ListItem, InputGroup, Input, Icon ,Button,Title} from 'native-base';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import myTheme from '../../themes/base-theme';
import { Grid, Col, Row } from 'react-native-easy-grid';
import styles from './styles';
import {FBLoginManager}  from 'react-native-facebook-login';
class Register extends Component {

  constructor(props) {
    super(props);



    this.state = {
      userdetail:null,
      emailortel:'',
      password:'',
      loading:false,
      tel: '',
      name: '',
      gender: '',
      email: '',
      fbid:'',
    };
  }

  componentWillMount(){
    // FBLoginManager.getCredentials(function(error, data){
    //   if (!error) {
    //     console.log(data.credentials);
    //   }
    // });
  }

  componentDidMount(){
    AsyncStorage.getItem("userdetail").then((value) => {
      this.props.setUser(JSON.parse(value));
      this.setState({userdetail:JSON.parse(value)});
    }).done();
  }
  replaceRoute(route) {
    this.props.pushNewRoute(route);
  }

  navigateTo(route) {
    this.props.replaceOrPushRoute(route);
  }

  fblogin=()=>{
    var _this = this;
    this.setState({loading:true,});
    FBLoginManager.loginWithPermissions(["email","user_friends","public_profile"], function(error, data){
      if (!error) {
        var  user = data.credentials;
        var api = 'https://graph.facebook.com/v2.3/'+user.userId+'?fields=email,name,gender&edirect=false&access_token='+user.token+'';
        fetch(api)
        .then((response) => response.json())
        .then((responseData) => {
          _this.setState({fbid:responseData.id,
            name:responseData.name,
            gender:responseData.gender,
            email:responseData.email,});
            _this.registeruser();
          })
          .done();
        } else {
          console.log("Error: ", error);
        }
      })

      //     FBLoginManager.logout(function(error, data){
      //       if (!error) {
      //       } else {
      //         console.log(error, data);
      //       }
      //     });

    }

    registeruser=()=>{
      var params = {
        tel: this.state.tel,
        name: this.state.name,
        gender: this.state.gender,
        email: this.state.email,
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

      fetch(this.props.apiaddress + 'api/buyer_register',request).then((response) =>
      {
        return response.json() // << This is the problem
      })
      .then((responseData) => { // responseData = undefined
        return responseData;
      })
      .then((data) => {
        if(data.result == 'success'){
          this.login();
        }
        else{
          this.alertmsg('อีเมลล์ซ้ำในระบบ');
        }
      }).done();

    }


    login=()=>{
      this.setState({loading:true,});
      var params = {
        email: this.state.emailortel,
        password: this.state.password,
        fbid: this.state.fbid,
      };

      if(this.state.emailortel == '' && this.state.fbid == ''){
        this.setState({loading:false,});
        this.alertmsg('ไม่สามารถเข้าสู่ระบบได้');
        return;
      }

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
        if(data.result){
          this.setState({loading:false,});
          if(data.result.tel == ''){
            this.props.setUser({
              id:data.result.id,
              email:data.result.email,
              fbid:this.state.fbid,
              name:this.state.name,
              gender:this.state.gender,
            });
            this.replaceRoute('otp');
          }
          else{
            AsyncStorage.setItem("userdetail",JSON.stringify({tel:data.result.tel
              ,email:data.result.email
              ,islogin:1
              ,fullname:data.result.fullname
              ,id:data.result.id
              ,fbid:data.result.fbid}));

              AsyncStorage.getItem("userdetail").then((value) => {
                this.props.setUser(JSON.parse(value));
              }).done();
              this.setState({loading:false,});
              this.navigateTo('account');
            }
          }
          else{
            this.setState({loading:false,});
            this.alertmsg('ไม่สามารถเข้าสู่ระบบได้');
          }
        }).done();
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


      logout=()=>{
        FBLoginManager.logout(function(error, data){
          if (!error) {
          } else {
            console.log(error, data);
          }
        });
        AsyncStorage.setItem("userdetail",JSON.stringify({tel:''
        ,email:''
        ,fullname:''
        ,islogin:0
        ,id:''
        ,fbid:''}));
        this.setState({userdetail:null});

        this.navigateTo('account');
      }

      popRoute() {
        this.props.popRoute();
      }

      _renderUserImg(){
        if(!this.props.user) return;
        if (this.props.user.fbid == '' || this.props.user.fbid == 0){
          return (<Image
            style={{
              width: 100,
              height: 100,
            }}
            resizeMode={"stretch"}
            source={{uri:this.props.imageaddress + 'img_blank.png'}}
            />);
          }
          else{
            return (<Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
              resizeMode={"contain"}
              source={{uri:'https://graph.facebook.com/' + this.props.user.fbid + '/picture?type=large&redirect=true&width=500&height=500'}}
              />);
            }

          }
          _renderTel() {
            if(!this.props.user) return;
            if (!this.props.user.tel) return;
            return (
              <Text
              style={{
                marginTop:12,
                color: "rgba(108,108,108,1)",
                fontSize: 16,
                fontWeight: 'normal',
                fontFamily: 'Helvetica Neue',
              }}>
              เบอร์โทรศัพท์ {this.props.user.tel}
              </Text>
            );
          }


          _renderEmail() {
            if(!this.props.user) return;
            if (!this.props.user.email) return;
            return (
              <Text
              style={{
                marginTop:12,
                color: "rgba(108,108,108,1)",
                fontSize: 16,
                fontWeight: 'normal',
                fontFamily: 'Helvetica Neue',
              }}>
              {this.props.user.email}
              </Text>
            );
          }


          _renderFullname() {
            if(!this.props.user) return;
            if (!this.props.user.fullname) return;
            if (this.props.user.fullname == 0) return;
            if (this.props.user.fullname == 'undefined') return;

            return (
              <Text
              style={{
                marginTop:24,
                color: "rgba(108,108,108,1)",
                fontSize: 18, 
                fontFamily: 'Helvetica Neue',
                fontWeight:'600',
              }}>
              {this.props.user.fullname}
              </Text>
            );
          }

          render() {
            {
              if(this.props.user && this.props.user.islogin == 1){
                return (
                  <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
                  <Header>
                  <Button transparent onPress={this.props.openDrawer}>
                  <Icon name='ios-menu' />
                  </Button>

                  <Title>Account</Title>


                  </Header>
                  <View style={styles.container}>
                  <Content padder>
                  <Grid>
                  <Col  style={{ justifyContent:'center',alignItems:'center',marginTop:16,}}>
                  {this._renderUserImg()}
                  {this._renderFullname()}


                  {this._renderEmail()}

                  {this._renderTel()}
                  <TouchableOpacity onPress={() => this.logout()} >
                  <View  style={{height:40,backgroundColor:'#F3C42C',flex:1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  marginTop:24,padding:8,  width:300,borderRadius:4 }}>
                  <Text
                  style={{
                    color: "rgba(255,255,255,1)",
                    fontSize: 14,
                    fontWeight: "normal",
                    fontFamily: 'Helvetica Neue',
                  }}>LOGOUT</Text>
                  </View>
                  </TouchableOpacity>


                  </Col>
                  </Grid>
                  </Content>
                  <SleekLoadingIndicator loading={this.state.loading} />
                  </View>
                  </Container>
                )
              }
              else{
                return (

                  <Container theme={myTheme} style={{backgroundColor: '#DDDDDD'}}>

                  <View   style={{flex:1,backgroundColor:'#FFFFFF',}}>

                  <Content padder  >
                  <Grid style={{ flex: 1, flexDirection: 'column',  alignItems: 'center',marginTop:30,}}>
                  <Row style={{ flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',}}>
                  <Image
                  style={{
                    height:  150 ,
                    width: 150,
                  }}
                  resizeMode={"cover"}
                  source={require('.././img/ic_application.png')}
                  />
                  <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    lineHeight:28,
                    fontWeight: "normal",
                    fontFamily: 'Helvetica Neue',
                  }}>
                  หิว...เมื่อไหร่ให้คิดถึง FoodHall
                  </Text>

                  <List  style={{
                    marginLeft:-16,
                  }}>
                  <ListItem style={{width:300,marginTop:32,}}>
                  <InputGroup >
                  <Icon name='ios-person' style={{color:'#000',}} />
                  <Input autoCorrect={false} placeholder='อีเมลล์/เบอร์โทรศัพท์'  style={{color:'#000', }}  onChangeText={emailortel => this.setState({emailortel})} />
                  </InputGroup>
                  </ListItem>

                  <ListItem>
                  <InputGroup>
                  <Icon name='ios-unlock'  style={{color:'#000',}}  />
                  <Input placeholder='รหัสผ่าน' secureTextEntry={true}  style={{color:'#000',}}  onChangeText={password => this.setState({password})} />
                  </InputGroup>
                  </ListItem>

                  </List >
                  <TouchableOpacity onPress={() => this.login()} >
                  <View  style={{height:40,backgroundColor:'#F3C42C',flex:1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  marginTop:24,padding:8,  width:300,borderRadius:4 }}>
                  <Text
                  style={{
                    color: "rgba(255,255,255,1)",
                    fontSize: 14,
                    fontWeight: "normal",
                    fontFamily: 'Helvetica Neue',
                  }}>เข้าสู่ระบบ </Text>
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.fblogin()} >
                  <View  style={{height:40,backgroundColor:'#4267b2',flex:1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  marginTop:24,padding:8,  width:300,borderRadius:4}}>
                  <Icon name="logo-facebook" style={{color:"#FFF"}} />
                  <Text
                  style={{
                    color: "rgba(255,255,255,1)",
                    fontSize: 14,
                    fontWeight: "normal",
                    fontFamily: 'Helvetica Neue',
                  }}>     Log in with Facebook</Text>
                  </View>
                  </TouchableOpacity>


                  </Row>
                  <TouchableOpacity onPress={() => this.replaceRoute('otp')} >
                  <Text
                  style={{
                    marginTop:24,
                    textDecorationLine: 'underline',
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'normal',
                    fontFamily: 'Helvetica Neue',
                  }}>
                  สมัครสมาชิกเพื่อใช้บริการ
                  </Text>
                  </TouchableOpacity>
                  </Grid>
                  </Content>
                  <Button transparent onPress={this.props.openDrawer}  style={{position:'absolute',top:22,left:8,}}>
                  <Icon name='ios-menu' style={{color:'#000000'}} />
                  </Button>
                  <SleekLoadingIndicator loading={this.state.loading} />
                  </View>
                  </Container>
                )
              }
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
            setUser:(all)=>dispatch(setUser(all)),
          }
        }

        function mapStateToProps(state) {
          return {
            name: state.user.name,
            index: state.list.selectedIndex,
            list: state.list.list,
            apiaddress: state.list.apiaddress,
            imageaddress: state.list.imageaddress,
            user: state.user.all
          };
        }

        export default connect(mapStateToProps, bindAction)(Register);
