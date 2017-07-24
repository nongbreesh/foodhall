
'use strict';

import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  RefreshControl,
  Image,
  Modal,
  ToastAndroid,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  DatePickerIOS,
  TextInput,
} from 'react-native'
import { openDrawer } from '../../actions/drawer';
import { popRoute ,replaceOrPushRoute,pushNewRoute} from '../../actions/route';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import LoadingContainer from 'react-native-loading-container';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import moment from 'moment';
import { setBasket} from '../../actions/list';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import KeyboardSpacer from 'react-native-keyboard-spacer';
class Confirmorder extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      ds:[],
      dataSource:ds,
      refreshing: false,
      numpadval: 0,
      userdetail:null,
      summary:0,
      total:0,
      strtitle:'',
      shopdetail:[],
      modalVisible:false,
      loading:false,
      date: new Date(),
      address:props.address.address.formatted_address,
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  }

  componentDidMount(){
    this.setState({userdetail:this.props.user,shopdetail:this.props.shopdetail});
  }

  navigateTo(route) {
    this.props.replaceOrPushRoute(route);
  }

  popRoute() {
    this.props.popRoute();
  }

  onDateChange = (date) => {
    this.setState({date: date});
  };

  replaceRoute(route) {
    this.props.pushNewRoute(route);
  }

  onnumpadChange=(rowData,index,type)=>{
    var amount =  rowData.amount? rowData.amount:0;
    if(type  == 'minute'){
      var num = amount - 1;
    }
    else{
      var num = amount + 1;
    }
    if(num < 0){
      num = 0;
    }
    rowData.amount = num;
    this.setState({});
    this.checkAmount();
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  checkAmount=()=>{
    var summary = 0;
    var total  = 0;
    this.state.dataSource._dataBlob.s1.map((data)=>{

      if(data != null){
        summary += data.price * data.amount;
      }

    });

    total = summary + parseInt(this.state.shopdetail.deriveryfee);

    this.setState({summary:summary,total:total});

  }
  placeorder(){
    this.setState({loading:true});

    var orderlist= [];
    var amountlist = []


    var deriveryrange = "";
    if(this.props.basket.istoday != true){
      deriveryrange = this.props.basket.setrange;
    }

    var params = {
      // orderlist: JSON.stringify(orderlist),
      // amountlist:JSON.stringify(amountlist),
      userid: this.props.user.id,
      shopid: this.props.shopdetail.id,
      deliverytime:moment.utc(this.props.basket.settime).format('YYYY-MM-DD HH:mm:ss'),
      summary:this.state.summary,
      paidtype: 'CASH',
      deriveryrange:deriveryrange,
      lat: this.props.address.address.geometry.location.lat,
      lng: this.props.address.address.geometry.location.lng,
      address: this.state.address,
    };

    var formData = new FormData();
    this.state.dataSource._dataBlob.s1.map((data)=>{

      if(data != null){
        var strid = data.id;
        var orderamount = data.amount;
        formData.append('orderlist[]',strid);
        formData.append('amountlist[]',orderamount);
      }

    });


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

    //console.log(formData);
    fetch(this.props.apiaddress + 'api/submitorder',request).then((response) =>
    {
      return response.json() // << This is the problem
    })
    .then((responseData) => { // responseData = undefined
      return responseData;
    })
    .then((data) => {
      //console.log(data);
      this.setState({loading:false});
      this.navigateTo('orders');
    }).done();


  }

  deliverytime(){
    if(this.props.basket.istoday  == true){
      return (
        <Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#000' ,fontSize:18,}}>{this.props.basket.settime.format('DD/MM/YYYY เวลา HH:mm')}</Text></Col>
      );
    }
    else{
      return (<Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#000' ,fontSize:18,}}>{this.props.basket.settime.format('DD/MM/YYYY')} เวลา {this.props.basket.setrange}</Text></Col>
    );
  }

}
render() {
  const { props: { name, index, list } } = this;
  return (
    <Container theme={myTheme} style={{backgroundColor: '#FFFFFF'}}>
    <Header>
    <Button transparent onPress={() => this.popRoute()}>
    <Icon name='ios-arrow-back' />
    </Button>

    <Title>รายการอาหาร</Title>


    </Header>

    <View style={styles.container} >
    <Grid>
    <Row>
    <LoadingContainer
    onError={e => console.log(e)}
    onLoadStartAsync={this._loadInitialDataAsync.bind(this)}
    onReadyAsync={this._onReadyAsync.bind(this)}>
    <Content>
    <View style={[{flex: 1}]}>

    <View style={{width:null,backgroundColor:'#FFF',}}>
    <Grid>
    <Row style={{height:50,width:null,backgroundColor:'#FFFFFF',}}>
    <Col style={{alignItems:'flex-start',justifyContent:'center',paddingLeft:8,}}><Text style={{color:'#000',fontSize:18}}>ร้านค้า</Text></Col>
    <Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#000',fontSize:18,}}>{this.props.shopdetail.title}</Text></Col>
    </Row>
    <Row style={{height:50,width:null,backgroundColor:'#FFFFFF',}}>
    <Col style={{alignItems:'flex-start',justifyContent:'center',paddingLeft:8,}}><Text style={{color:'#000',fontSize:18}}>เวลาจัดส่ง</Text></Col>
    {this.deliverytime()}
    </Row>
    <Row style={{height:50,width:null,backgroundColor:'#FFFFFF',}}>
    <Col style={{alignItems:'flex-start',justifyContent:'center',paddingLeft:8,}}><Text style={{color:'#000',fontSize:18}}>ยอดที่ต้องชำระ</Text></Col>
    <Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#000', fontSize:18,}}>{this.numberWithCommas(this.state.total)}฿</Text></Col>
    </Row>
    <Row style={{height:50,width:null,backgroundColor:'#FFFFFF',}}>
    <Col style={{alignItems:'flex-start',justifyContent:'center',paddingLeft:8,}}><Text style={{color:'#000',fontSize:18}}>การชำระเงิน</Text></Col>
    <Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#000', fontSize:18,}}>เงินสด</Text></Col>
    </Row>
    <Row style={{height:50,width:null,backgroundColor:'#FFFFFF',}}>
    <Col style={{alignItems:'flex-start',justifyContent:'center',padding:8,}}>
    <Row style={{width:null,backgroundColor:'#FFFFFF',}}>
    <Col style={{alignItems:'flex-start',justifyContent:'center',}}><Text style={{color:'#000',fontSize:18}}>ที่อยู่สำหรับจัดส่ง</Text>

    </Col>
    </Row>
    </Col>
    </Row>
    </Grid>
    <TextInput
    style={{height: 100,margin:8, borderColor: '#dddddd', borderWidth: 1,fontSize: 16,padding:8,backgroundColor:'#FFFFFF',}}
    onChangeText={(address) => this.setState({address})}
    editable = {true}
    multiline = {true}
    value={this.state.address}
    />
    </View>
    <Row style={{height:50,width:null,backgroundColor:'#FFFFFF',justifyContent:'center',alignItems:'center', }}>

    <TouchableOpacity onPress={() => this.placeorder()} >
    <View style={{borderRadius:4,  height:50,width:240,backgroundColor:'#38C872',flexDirection:'row',alignItems:'center' ,justifyContent: 'center',}}>
    <Text style={{color:'#FFF',fontSize:18}}>ส่งรายการสั่งซื้อให้ร้านค้า</Text>
    </View>
    </TouchableOpacity>
    </Row>
    <Row style={{height:50,width:null,backgroundColor:'#FFFFFF',justifyContent:'center',alignItems:'center', }}>
    </Row>
    </View>
    <KeyboardSpacer/>
    </Content>

    </LoadingContainer>

    </Row>
    </Grid>

    <SleekLoadingIndicator loading={this.state.loading} />

    </View>

    </Container>
  )
}

async _loadInitialDataAsync() {
  return;
}

async _onReadyAsync(data) {
  return new Promise((resolve) => {
    this.props.basket.push(null);
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.props.basket),
    },resolve)
    this.checkAmount();
  });
}
}


function bindAction(dispatch) {
  return {
    openDrawer: ()=>dispatch(openDrawer()),
    closeDrawer: ()=>dispatch(closeDrawer()),
    pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
    replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
    setIndex:(index)=>dispatch(setIndex(index)),
    setShopdetail:(detail)=>dispatch(setShopdetail(detail)),
    setBasket:(detail)=>dispatch(setBasket(detail)),
    popRoute: () => dispatch(popRoute())
  }
}




function mapStateToProps(state) {
  return {
    address: state.address.all,
    name: state.user.name,
    index: state.list.selectedIndex,
    list: state.list.list,
    apiaddress: state.list.apiaddress,
    imageaddress: state.list.imageaddress,
    shopdetail:state.list.shopdetail,
    user: state.user.all,
    basket: state.list.basket
  };
}

export default connect(mapStateToProps, bindAction)(Confirmorder);
