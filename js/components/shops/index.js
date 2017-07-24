
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
  Image,
  Modal,
} from 'react-native'
import LoadingContainer from 'react-native-loading-container';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import { setIndex,setShopdetail } from '../../actions/list';
import { replaceRoute, replaceOrPushRoute ,pushNewRoute} from '../../actions/route';

import { Container, Header, Title, Content, View, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import myTheme from '../../themes/base-theme';
import styles from './styles';


class Shops extends Component {

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
      <Title>{(this.props.address.subdistrict) ? this.add3Dots( this.props.address.subdistrict,20) : 'รายการร้านอาหาร'}</Title>

      <Button transparent onPress={this.props.openDrawer}>
      <Icon name='ios-menu' />
      </Button>

      <Button transparent   onPress={() => this.setModalVisible(true)}>
      <Icon name='ios-apps-outline' />
      </Button>
      </Header>

      <View style={styles.container} >

      <LoadingContainer
      onError={e => console.log(e)}
      onLoadStartAsync={this._loadInitialDataAsync.bind(this)}
      onReadyAsync={this._onReadyAsync.bind(this)}>
      {this.rendershop()}
      </LoadingContainer>
      <Modal
      animationType={"fade"}
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={{marginTop: 0,flex:1,backgroundColor:'rgba(0,0,0,.3)'}}>
      <View style={{backgroundColor:'#FFFFFF',flex:1,margin:16,marginTop:92,borderRadius:5}}>
      <Grid style={{position:'absolute',left:10,top:10}}>
      <Row>
      <Image
      style={{
        height: 25,
        width: 25,
        marginRight:10,
      }}
      resizeMode={"cover"}
      source={require('./../img/ic_dish.png')}
      />
      <Text style={{fontSize:16,color:"#000000" , }}>Select Category :-</Text>
      </Row>
      </Grid>
      <TouchableOpacity onPress={() => {
        this.setModalVisible(!this.state.modalVisible)
      }}>
      <Icon style={{color:'#000000',position:'absolute',right:10,top:0,fontSize:42,}} name='ios-close-outline' />
      </TouchableOpacity>

      <Grid style={{marginTop:50,}}>
      <Col>
      <LoadingContainer
      onError={e => console.log(e)}
      onLoadStartAsync={this._loadCateAsync.bind(this)}
      onReadyAsync={this._onCateReadyAsync.bind(this)}>
      {this.renderCate()}
      </LoadingContainer>
      </Col>
      </Grid>

      </View>
      </View>
      </Modal>
      </View>
      </Container>


    )
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

  renderCate = () =>{
    return (
      <ListView
      enableEmptySections={true}
      dataSource = {this.state.dataSourceCate}
      renderRow = {this.renderRowCate.bind(this)}>
      </ListView>
    )
  }

  renderShopstatus(isshopopen){
    if(isshopopen == 'false'){
      return(
        <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,height:240,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center', alignItems: 'center',}}>
        <Text style={{fontSize:24,color:"#FFFFFF",lineHeight:30, }}>Closed</Text>
        </View>
      )
    }
  }

  renderRow(rowData){
    return (
      <TouchableOpacity
      onPress={()=> this.pressRow(rowData)}
      activeOpacity={90 / 100}>
      <View style={styles.row}>
      <Image
      style={{
        height: 240,
        width: null,
      }}
      resizeMode={"cover"}
      source={{uri:this.props.imageaddress + rowData.img}}
      >
      <Image
      style={{
        height: 240,
        width: null,
        flexDirection: 'row',
      }}
      resizeMode={"cover"}
      source={require('./../img/gradianframe.png')}
      >
      <View style={{position:'absolute',bottom:0,right:0 ,backgroundColor: 'rgba(0,0,0,0)',padding:8}}>
      <View style={{ flexDirection: 'row',justifyContent: 'flex-end' }}>
      <Image
      style={{
        height: 18,
        width: 18,
        marginTop:4,
        marginRight:0,
        marginLeft:8,
      }}
      resizeMode={"cover"}
      source={require('./../img/ic_timeorder.png')}
      />
      <Text style={{fontSize:18,color:"#FFFFFF", textAlign:'right',lineHeight:24,}}>{rowData.ordertime == 0?'ส่งได้เดี๋ยวนี้':'สั่งล่วงหน้า '+rowData.ordertime+' ชั่วโมง'} </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end',}}>
      <Image
      style={{
        height: 12,
        width: 12,
        marginTop:5,
        marginRight:3,
        marginLeft:8,
      }}
      resizeMode={"cover"}
      source={require('./../img/ic_correct.png')}
      />
      <Text style={{fontSize:14,color:"#FFFFFF", }}>รับเงินสด</Text>

      <Image
      style={{
        height: 12,
        width: 12,
        marginTop:5,
        marginRight:3,
        marginLeft:8,
      }}
      resizeMode={"cover"}
      source={require('./../img/ic_correct.png')}
      />
      <Text style={{fontSize:14,color:"#FFFFFF", }}>บริการส่งถึงที่</Text>
      </View>
      </View>
      </Image>
      </Image>
      {this.renderShopstatus(rowData.isshopopen)}
      <View style={styles.row,{flex:1,padding:8,flexDirection:'row'}}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={{flex:.8,fontSize:18,color:"#000000",fontWeight: '600',}}>{rowData.title}</Text>
      <Text style={styles.selectionText}>{rowData.distance_in_km}KM </Text>
      </View>
      </View>
      </TouchableOpacity>
    )
  }

  renderRowCate(rowData){
    return (
      <TouchableOpacity
      onPress={()=> this.pressRowCate(rowData)}
      activeOpacity={90 / 100}>
      <View style={styles.row}>
      <Text style={{fontSize:16,color:"#000000",padding:16, }}>{rowData.title}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  pressRowCate(rowData){
    if(rowData.id == 0){
      this.setState({cateName:''.title,modalVisible:false});
    }
    else{
      this.setState({cateName:rowData.title,modalVisible:false});
    }

    var lat = this.props.address.address.geometry.location.lat;
    var lng = this.props.address.address.geometry.location.lng;
    var cateName = rowData.title;
    var params = {
      lat: lat,
      lng: lng,
      cateName: cateName
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

    fetch(this.props.apiaddress + 'api/getshop',request).then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(responseData.result),
      })
    })
    .done();
  }

  pressRow(rowData){
    this.navigateTo('shopdetail');
    this.props.setShopdetail(rowData);
    //     var newDs = [];
    //     newDs = this.state.ds.slice();
    //     newDs[0].Selection = newDs[0] == "AwayTeam" ? "HomeTeam" : "AwayTeam";
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(newDs)
    //     })

  }

  async _loadCateAsync() {
    let response = await fetch(this.props.apiaddress + 'api/getcategory');
    return response.json();
  }


  async _onCateReadyAsync(data) {
    return new Promise((resolve) => {
      data.result.splice(0,0,{id: "0", title: "ทั้งหมด/All"});
      this.setState({
        dataSourceCate:this.state.dataSourceCate.cloneWithRows(data.result),
      },resolve)
    });
  }

  async _loadInitialDataAsync() {
    var lat = this.props.address.address.geometry.location.lat;
    var lng = this.props.address.address.geometry.location.lng;
    var cateName = this.state.cateName;

    var params = {
      lat: lat,
      lng: lng,
      cateName: cateName
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

    let response = await fetch(this.props.apiaddress + 'api/getshop',request);
    return response.json();
  }

  async _onReadyAsync(data) {
    return new Promise((resolve) => {
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
    setIndex:(index)=>dispatch(setIndex(index)),
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
    shopdetail:state.list.shopdetail
  };
}

export default connect(mapStateToProps, bindAction)(Shops);
