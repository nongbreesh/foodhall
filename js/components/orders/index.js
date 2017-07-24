
'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  WebView,
  ActivityIndicator,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  PushNotificationIOS,
  Platform,
  Image,
  Modal,
} from 'react-native'
import LoadingContainer from 'react-native-loading-container';
import moment from 'moment';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { setIndex,setShopdetail } from '../../actions/list';
import { replaceRoute, replaceOrPushRoute ,pushNewRoute} from '../../actions/route';

import { setList} from '../../actions/list';
import { Container, Header, Title, Content, View, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import myTheme from '../../themes/base-theme';
import styles from './styles';


class Orders extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      ds:[],
      dataSource:ds,
      dataSourceCate:ds,
      refreshing: false,
      modalVisible:false,
      cateName:'',
    };


  }

  componentDidMount() {
    if(Platform.OS === "ios"){
      PushNotificationIOS.setApplicationIconBadgeNumber(0)
    }
  }


  _onRefresh() {
    this.setState({refreshing: true});
    this._loadInitialDataAsync().then((data) => {
      this._onReadyAsync(data).then(()=>{
        this.setState({refreshing: false});
      });
    });

  }

  replaceRoute(route) {
    this.props.pushNewRoute(route);
  }

  navigateTo(route, index) {
    this.props.closeDrawer();
    this.props.setIndex(index);
    this.props.pushNewRoute(route);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  add3Dots(string, limit)
  {
    var dots = "...";
    if(string.length > limit)
    {
      // you can also use substr instead of substring
      string = string.substring(0,limit) + dots;
    }

    return string;
  }

  render() {
    return (
      <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
      <Header>
      <Title>รายการอาหารที่สั่ง</Title>

      <Button transparent onPress={this.props.openDrawer}>
      <Icon name='ios-menu' />
      </Button>


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



  rendershop = () =>{
    if(this.state.dataSource._dataBlob  != null){
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
    else{
      return (
        <View>
        <Image
        style={{
          height: 240,
          width: null,
          flexDirection: 'row',
        }}
        resizeMode={"cover"}
        source={require('./../img/orderbg.png')}
        />
        <Text style={{
          color: "#000000",
          fontSize: 18,
          padding:16,
        }}>คุณยังไม่มีรายการสั่งซื้อ...</Text>
        </View>
      )
    }

  }

  renderCate = () =>{
    return (
      <ListView
      enableEmptySections={true}
      dataSource = {this.state.dataSourceCate}
      renderRow = {this.renderRowCate.bind(this)}>
      </ListView>
    )
  }


  renderRow(rowData){
    var createdate = moment.utc(rowData.ordercreatedate).local().format('DD MMM YYYY เวลา HH:mm');
    var status = "";
    var color = "#FF4F4F";
    switch (parseInt(rowData.status)) {
      case -1:
      status = "รายการถูกยกเลิก";
      color = "#FF4F4F";
      break;
      case 1:
      status = "รอร้านค้าตอบรับ";
      color = "#F3C42C";
      break;
      case 2:
      status = "รับออเดอร์เรียบร้อย";
      color = "#38C872";
      break;
      case 3:
      status = "จัดส่งเรียบร้อย";
      color = "#358EF7";
      break;
    }

    return (
      <TouchableOpacity
      onPress={()=> this.pressRow(rowData)}
      activeOpacity={90 / 100}>
      <View style={styles.row}>
      <Grid style={{padding:16,}}>
      <Row>
      <Text style={{
        color: "#000000",
        fontSize: 18,
      }}>Order no. {rowData.orderno}</Text>
      </Row>
      <Row style={{flexDirection:'column',paddingBottom:12,}}>

      <Text style={{
        color: "#6C7A89",
        fontSize: 14,
      }}>{createdate}</Text>

      <Text style={{
        color:color,
        fontSize: 14,
        lineHeight:40,
      }}>
      <Image
      style={{
        height: 18,
        width: 24,
        marginRight:3,
      }}
      resizeMode={"cover"}
      source={require('./../img/ic_check.png')}
      />
      {status}</Text>

      </Row>
      </Grid>
      </View>
      </TouchableOpacity>
    )
  }



  pressRow(rowData){
    this.props.setList(rowData);
    this.navigateTo('orderdetail');
  }




  async _loadInitialDataAsync() {
    if(this.props.user != null){
      var userid = this.props.user.id;
      var params = {
        buyerid: userid
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

      let response = await fetch(this.props.apiaddress + 'api/getorderbybuyerid',request);
      return response.json();
    }
    else{
      return;
    }

  }

  async _onReadyAsync(data) {
    return new Promise((resolve) => {
      if(data){
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(data.result),
        },resolve)
      }
      else{
        this.setState(resolve)
      }
    });
  }

}

function bindAction(dispatch) {
  return {
    openDrawer: ()=>dispatch(openDrawer()),
    closeDrawer: ()=>dispatch(closeDrawer()),
    pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
    setIndex:(index)=>dispatch(setIndex(index)),
    setList:(all)=>dispatch(setList(all)),
    setShopdetail:(detail)=>dispatch(setShopdetail(detail)),


  }
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    address: state.address.all,
    apiaddress: state.list.apiaddress,
    imageaddress: state.list.imageaddress,
    shopdetail:state.list.shopdetail,
    user: state.user.all
  };
}

export default connect(mapStateToProps, bindAction)(Orders);
