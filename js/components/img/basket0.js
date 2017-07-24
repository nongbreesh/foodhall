
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

class Basket extends Component {
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
      date: new Date(),
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }



  gobasket=()=>{
    var user = this.state.userdetail;
    if(user.islogin == 1){
      this.navigateTo('basket');
    }
    else{
      this.navigateTo('account');
    }
  }

  numberPad =(rowData,index)=>{
    return (
      <Grid style={{margin:0,marginBottom:16,}}>

      <Col>
      <TouchableOpacity
      onPress={()=> this.onnumpadChange(rowData,index,'minute')}
      activeOpacity={70 / 100}>
      <View style={{justifyContent: 'center',
      alignItems: 'center',backgroundColor:'#ecf0f1',padding:8,}}>
      <Icon style={{fontSize:14,color:'#000000' , }} name='ios-remove-outline' />
      </View>
      </TouchableOpacity>
      </Col>

      <Col style={{width:50, justifyContent: 'center',
      alignItems: 'center',}}>
      <Text style={{fontSize:14,color:"green",lineHeight:22, }}>{rowData.amount?rowData.amount:'0'}</Text>
      </Col>

      <Col>
      <TouchableOpacity
      onPress={()=> this.onnumpadChange(rowData,index,'plus')}
      activeOpacity={70 / 100}>
      <View style={{justifyContent: 'center',
      alignItems: 'center',backgroundColor:'#ecf0f1',padding:8,}}>
      <Icon style={{fontSize:14,color:'#000000', }} name='ios-add-outline' />
      </View>
      </TouchableOpacity>
      </Col>

      </Grid>

    )
  }

  rendershop = () =>{
    return (
      <ListView
      enableEmptySections={true}
      dataSource = {this.state.dataSource}
      renderRow = {this.renderRow.bind(this)}>
      </ListView>
    )
  }

  renderRow(rowData, sec, i){
    if(rowData != null){
      return (
        <View style={{  borderBottomWidth: 1,
          borderColor: '#d7d7d7',backgroundColor:'#FFF',}}>
          <Grid>
          <Col style={{  width: 96,}}>
          <Image
          style={{
            height: 80,
            width: 80,
            margin:8,
          }}
          resizeMode={"cover"}
          source={{uri:this.props.imageaddress + rowData.img}}
          />
          </Col>
          <Col>
          <Row style={{padding:8}}>
          <Text style={{color:'#000000',}}>{rowData.title}</Text>
          </Row>
          <Row>
          {this.numberPad(rowData,i)}
          </Row>
          </Col>
          <Col style={{  justifyContent: 'center',
          alignItems: 'flex-end', marginRight:8,}}>
          <Text style={{color:'#000000',}}>{rowData.price}฿</Text>
          </Col>
          </Grid>

          </View>
        )
      }
      else{
        return (
          <View style={{  borderBottomWidth: 1,
            borderColor: '#d7d7d7',}}>
            <Grid>
            <Row style={{height:50,}}>
            <Col style={{alignItems:'flex-start',justifyContent:'center',paddingLeft:8,}}><Text style={{color:'#000',fontSize:18,}}>ค่าบริการจัดส่ง</Text></Col>
            <Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#38C872',fontWeight:'bold',fontSize:18,}}>{this.state.shopdetail.deriveryfee}฿</Text></Col>
            </Row>
            <Row style={{height:50,}}>
            <Col style={{alignItems:'flex-start',justifyContent:'center',paddingLeft:8,}}><Text style={{color:'#000',fontSize:18,}}>ค่าอาหาร</Text></Col>
            <Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#38C872',fontWeight:'bold',fontSize:18,}}>{this.numberWithCommas(this.state.summary)}฿</Text></Col>
            </Row>

            </Grid>

            </View>
          )
        }
      }

      golaststep(){
        if(parseInt(this.state.summary) < parseInt(this.state.shopdetail.minprice)){
          this.alertmsg('ค่าอาหารต้องมากกว่า '+ this.state.shopdetail.minprice +' บาท')
        }
        else{
          //show celendar
          var strtitle = "";
          // var deliverydate = new Date();//.addHours(parseInt(this.state.shopdetail.ordertime)).toString("dd-mm-yyyy");
          // var TimezoneOffset =  (-1) * (new Date()).getTimezoneOffset() / 60;
          //console.log(deliverydate.getTime() + (parseInt(this.state.shopdetail.ordertime)*60*60*1000));
          let today     = moment(new Date());
          var  deliverydate  =  moment().add(parseInt(this.state.shopdetail.ordertime), 'hours');
          // console.log(today);
          // console.log(deliverydate);
          if(deliverydate.diff(today, 'days') == 0){
            strtitle = "ต้องการให้ส่งวันนี้เวลา?";
          }
          if(deliverydate.diff(today, 'days') == 1){
            strtitle = "ต้องการให้ส่งพรุ่งนี้เวลา?";
          }
          if(deliverydate.diff(today, 'days') > 1){
            strtitle = "ต้องการให้ส่งหลังวันที่ " + deliverydate.format('DD/MM/YYYY') + " เวลา?";
          }
          // console.log(strtitle);
          this.setState({modalVisible: true,strtitle:strtitle,date:deliverydate.toDate()});

        }
      }

      confirmorder(visible){
        this.setState({modalVisible: visible});
        let today     = moment(new Date());
        let setdate     = moment(this.state.date);
        var deliverydate = today.add(parseInt(this.state.shopdetail.ordertime), 'hours');
        // console.log(setdate.diff(deliverydate, 'hours'));
        if(deliverydate.diff(setdate, 'hours') == 0){
          this.props.basket.settime =  setdate;
          //console.log(this.props.basket);
          //console.log(moment.utc(setdate).format('YYYY-DD-MM HH:mm:ss'));
          this.props.setBasket(this.props.basket);
          this.replaceRoute('confirmorder');
        }
        else{
          if(this.state.shopdetail.ordertime > 0){
            this.alertmsg('ต้องสั่งล่วงหน้าอย่างน้อย '+this.state.shopdetail.ordertime+' ชั่วโมง');
          }
          else{
            this.alertmsg('ไม่สามารถตั้งเวลาส่งน้อยกว่าเวลาปัจจุบัน');
          }
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

      renminprice(){
        if(parseInt(this.state.summary) < parseInt(this.state.shopdetail.minprice)){
          return (
            <View style={{  borderColor: '#F00',  borderWidth: 2,margin:8,padding:8,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#F00',fontSize:18,lineHeight:24,}}>คุณต้องมีค่าอาหารมากกว่า {this.numberWithCommas(this.state.shopdetail.minprice)} บาทขึ้นไป</Text>
            </View>
          )
        }
        else{
          return;
        }
      }

      render() {
        const { props: { name, index, list } } = this;
        return (
          <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
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

          {this.renminprice()}
          {this.rendershop()}

          <View style={{width:null,backgroundColor:'#FFF',}}>
          <View style={{height:50,width:null,backgroundColor:'#FFFFFF',}}>
          <Grid>
          <Col style={{alignItems:'flex-start',justifyContent:'center',paddingLeft:8,}}><Text style={{color:'#000',fontSize:18}}>ยอดที่ต้องชำระ</Text></Col>
          <Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#000',fontWeight:'bold',fontSize:18,}}>{this.numberWithCommas(this.state.total)}฿</Text></Col>
          </Grid>
          </View>
          <TouchableOpacity onPress={() => this.golaststep()} >
          <View style={{height:50,width:null,backgroundColor:'#F3C42C',flexDirection:'row',alignItems:'center' ,justifyContent: 'center',}}>
          <Text style={{color:'#FFF',fontSize:18}}>ดำเนินการสั่งซื้อ</Text>
          </View>
          </TouchableOpacity>
          </View>
          </LoadingContainer>
          </Row>
          </Grid>
          <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={{marginTop: 0,flex:1,backgroundColor:'rgba(0,0,0,.3)'}}>
          <View style={{backgroundColor:'#FFFFFF',flex:1,}}>
          <Grid style={{position:'absolute',left:10,top:10}}>
          <Row>
          <Image
          style={{
            height: 25,
            width: 27,
            marginRight:10,
          }}
          resizeMode={"cover"}
          source={require('./../img/ic_ordertime.png')}
          />
          <Text style={{fontSize:16,color:"#000000" , }}>{this.state.strtitle}</Text>
          </Row>
          </Grid>
          <TouchableOpacity onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}>
          <Icon style={{color:'#000000',position:'absolute',right:10,top:0,fontSize:42,}} name='ios-close-outline' />
          </TouchableOpacity>
          <DatePickerIOS style={{marginTop:50,}}
          date={this.state.date}
          mode="time"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
          minuteInterval={30}
          />
          </View>
          <TouchableOpacity onPress={() => {
            this.confirmorder(!this.state.modalVisible)
          }}>
          <View  style={{backgroundColor:'#F3C42C',position:'absolute',left:0,right:0,bottom:0, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  marginTop:24,padding:16  }}>
          <Text
          style={{
            color: "rgba(255,255,255,1)",
            fontSize: 18,
            fontWeight: "normal",
            fontFamily: 'Helvetica Neue',
          }}>ยืนยัน</Text>
          </View>
          </TouchableOpacity>
          </View>
          </Modal>
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

    export default connect(mapStateToProps, bindAction)(Basket);
