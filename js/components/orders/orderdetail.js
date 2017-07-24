
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
  MapView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import moment from 'moment';
import { openDrawer } from '../../actions/drawer';
import { popRoute ,replaceOrPushRoute,pushNewRoute} from '../../actions/route';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import LoadingContainer from 'react-native-loading-container';
import { setBasket} from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

class Orderdetail extends Component {
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
      summary:0,
      total:0,
      tfloatshow:true,
      userdetail:null,
    };
  }

  componentDidMount(){
    this.setState({userdetail:this.props.user});
  }

  navigateTo(route) {
    this.props.replaceOrPushRoute(route);
  }

  popRoute() {
    this.props.popRoute();
  }

  replaceRoute(route) {
    this.props.pushNewRoute(route);
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._loadInitialDataAsync().then((data) => {
      this._onReadyAsync(data).then(()=>{
        this.setState({refreshing: false});
      });
    });

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
    this.checkAmoumt();
  }




  gobasket=()=>{
    var user = this.state.userdetail;
    if(user.islogin == 1){
      var basket = [];
      this.state.dataSource._dataBlob.s1.map((data)=>{
        if(data.amount > 0){
          basket.push(data);
        }
      });
      this.props.setBasket(basket);
      this.replaceRoute('basket');
    }
    else{
      this.navigateTo('account');
    }
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  rendershop = () =>{
    return (
      <ListView
      enableEmptySections={true}
      refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        />
      }
      dataSource = {this.state.dataSource}
      renderRow = {this.renderRow.bind(this)}>
      </ListView>
    )
  }

  deliverytime(){
    if(this.props.list.deriveryrange == ""){
      return (
        <Text style={{color:'#38C872',fontSize:14}}>เวลาส่ง : {moment.utc(this.props.list.deriverydate).local().format('DD MMM YYYY เวลา HH:mm')}</Text>
    );
    }
    else{
        return (
            <Text style={{color:'#38C872',fontSize:14}}>เวลาส่ง : {moment.utc(this.props.list.deriverydate).local().format('DD MMM YYYY')} เวลา {this.props.list.deriveryrange}</Text>

      );
    }

  }

  renderRow(rowData, sec, i){
    if(rowData == null && i == 0){
      return(
        <View>
        <MapView
        style={{
          height:240,}}
          region={{
            latitude: parseFloat(this.props.list.lat),
            longitude: parseFloat(this.props.list.lng),
            zoom:17,
          }}

          annotations={[{
            latitude: parseFloat(this.props.list.lat),
            longitude: parseFloat(this.props.list.lng),
            title:'Your address',
          }]}
          >
          </MapView>
          <Grid>
          <Row style={{width:null,backgroundColor:'#FFFFFF',padding:8,}}>
          <Text style={{color:'#000',fontSize:18}}>ชื่อผู้สั่ง : {this.props.list.fullname}</Text>
          </Row>
          <Row style={{width:null,backgroundColor:'#FFFFFF',padding:8,}}>
          <Text style={{color:'#000',fontSize:18}}>เบอร์โทรติดต่อ : {this.props.list.tel}</Text>
          </Row>

          <View  style={{ backgroundColor:'#FFFFFF',padding:8,}}>
          <Text  adjustsFontSizeToFit={true} numberOfLines={4} style={{color:'#000',fontSize:18,textAlignVertical: 'top' }}>{'ที่อยู่สำหรับจัดส่ง : ' + ' ' + this.props.list.address}</Text>
          </View>

          <Row style={{width:null,backgroundColor:'#FFFFFF',padding:8,}}>
          <Text style={{color:'#F00',fontSize:14}}>เวลาสั่ง : {moment.utc(this.props.list.ordercreatedate).local().format('DD MMM YYYY เวลา HH:mm')}</Text>
          </Row>
          <Row style={{width:null,backgroundColor:'#FFFFFF',padding:8,}}>
          {this.deliverytime()}
          </Row>
          </Grid>
          </View>
        )
      }
      else if(rowData != null){
        return (
          <View style={{  borderBottomWidth: 1,
            borderColor: '#d7d7d7',backgroundColor:'#FFF'}}>
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
            <Row style={{padding:8}}>
            <Text style={{color:'#000000',}}>จำนวน : {rowData.amount}</Text>

            </Row>
            <Row>
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
              <Col style={{alignItems:'flex-start',justifyContent:'center',paddingLeft:8,}}><Text style={{color:'#000',fontSize:18,}}>ค่าอาหาร</Text></Col>
              <Col style={{alignItems:'flex-end',justifyContent:'center',paddingRight:8,}}><Text style={{color:'#38C872',fontWeight:'bold',fontSize:18,}}>{this.numberWithCommas(this.props.list.summary)}฿</Text></Col>
              </Row>

              </Grid>

              </View>
            )
          }

        }



        render() {
          return (
            <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
            <Header>
            <Button transparent onPress={() => this.popRoute()}>
            <Icon name='ios-arrow-back' />
            </Button>

            <Title>Order #{this.props.list.orderno}</Title>


            </Header>

            <View style={styles.container} >
            <LoadingContainer
            onError={e => console.log(e)}
            onLoadStartAsync={this._loadInitialDataAsync.bind(this)}
            onReadyAsync={this._onReadyAsync.bind(this)}>
            {this.rendershop()}
            </LoadingContainer>
            </View>
            </Container>
          )
        }

        async _loadInitialDataAsync() {
          var params = {
            orderid: this.props.list.orderid,
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
          let response = await fetch(this.props.apiaddress + 'api/getorderdetail',request);

          return response.json();
        }

        async _onReadyAsync(data) {
          return new Promise((resolve) => {
            data.result.push(null);
            data.result.splice(0,0,null);
            this.setState({
              dataSource:this.state.dataSource.cloneWithRows(data.result),
            },resolve)
          });
        }
      }


      function bindAction(dispatch) {
        return {
          openDrawer: ()=>dispatch(openDrawer()),
          closeDrawer: ()=>dispatch(closeDrawer()),
          pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
          replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
          replaceRoute:(route)=>dispatch(replaceRoute(route)),
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
          user: state.user.all
        };
      }

      export default connect(mapStateToProps, bindAction)(Orderdetail);
