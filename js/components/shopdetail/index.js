
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
  Navigator,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import { openDrawer } from '../../actions/drawer';
import { popRoute ,replaceOrPushRoute,pushNewRoute} from '../../actions/route';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import LoadingContainer from 'react-native-loading-container';
import { setBasket} from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import Lightbox   from 'react-native-lightbox';
import Carousel  from 'react-native-looped-carousel';

class ShopDetail extends Component {
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
      floatshow:false,
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
    this.setState({refreshing: true,floatshow:false,});
    this._loadInitialDataAsync().then((data) => {
      this._onReadyAsync(data).then(()=>{
        this.setState({refreshing: false});
      });
    });

  }

  renderCarousel=(uri)=>{
     return (
       <Image
         style={{ width:Dimensions.get('window').width, height: Dimensions.get('window').width }}
         resizeMode="contain"
         source={{uri:this.props.imageaddress + uri}}
       />
     );
   }

  onnumpadChange=(rowData,index,type)=>{
    var amount =  rowData.amount? rowData.amount:0;
    if(type  == 'minute'){
      var num = parseInt(amount) - 1;
    }
    else{
      var num = parseInt(amount) + 1;
    }
    if(num < 0){
      num = 0;
    }
    rowData.amount = num;
    this.setState({});
    this.checkAmoumt();
  }

  checkAmoumt=()=>{
    var amount = 0;
    this.state.dataSource._dataBlob.s1.map((data)=>{
      amount += data.amount?data.amount:0;
    });
    if(amount > 0){
      this.setState({floatshow:true});
    }
    else{
      this.setState({floatshow:false});
    }

  }

  gobasket=()=>{
    var user = this.state.userdetail;
    if(user != null){
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
    }else {
      this.navigateTo('account');
    }
  }

  numberPad =(rowData,index)=>{
    if(this.props.shopdetail.isshopopen != 'false'){
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
  }

  rendershop = () =>{
    return (
      <ListView
      enableEmptySections={false}
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

  renderShopstatus(isshopopen){
    if(isshopopen == 'false'){
      return(
        <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,height:240,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center', alignItems: 'center',}}>
        <Text style={{fontSize:24,color:"#FFFFFF",lineHeight:30, }}>Closed</Text>
        </View>
      )
    }
  }


  renderRow(rowData, sec, i){
    if(rowData.category != null){
      return (
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
        <View style={{flex:1,padding:8,flexDirection:'row',backgroundColor:"#FFFFFF"}}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={{flex:.8,fontSize:18,color:"#000000",fontWeight: '600',}}>{rowData.title}</Text>
        <Text style={styles.selectionText}>{rowData.distance_in_km}KM </Text>
        </View>
        <View style={{flex:1,padding:8,flexDirection:'row',backgroundColor:"#FFFFFF"}}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={{flex:1,fontSize:16,color:"#000000",}}>เบอร์โทรศัพท์ : {rowData.tel}</Text>
        </View>
        <View style={{flex:1,padding:8,flexDirection:'row',backgroundColor:"#FFFFFF"}}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={{flex:1,fontSize:16,color:"#000000",}}>อีเมลล์ : {rowData.email}</Text>
        </View>
        </View>
      )
    }
    else{
      return (
        <View style={{  borderBottomWidth: 1,
          borderColor: '#d7d7d7',backgroundColor:'#FFF'}}>
          <Grid>
          <Col style={{  width: 96,}}>
          <Lightbox   underlayColor="white" springConfig={{tension: 15, friction: 5}} swipeToDismiss={true} renderContent={()=> this.renderCarousel(rowData.img)}>

          <Image
          style={{
            height: 80,
            width: 80,
            margin:8,
          }}
          resizeMode={"cover"}
          source={{uri:this.props.imageaddress + rowData.img}}
          />
          </Lightbox>
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
    }

    floatbutton =()=>{
      if(this.state.floatshow){
        return (<TouchableWithoutFeedback   onPress={()=> this.gobasket()} >
        <Animatable.View style={styles.floatbutton}     animation="zoomIn" duration={200} easing	="ease-out" >
        <Image
        style={{
          height: 22,
          width: 20,
        }}
        resizeMode={"stretch"}
        source={require('./../img/ic_completed.png')}
        />
        </Animatable.View>
        </TouchableWithoutFeedback>)
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

        <Title>{this.props.shopdetail.title}</Title>


        </Header>

        <View style={styles.container} >
        <LoadingContainer
        onError={e => console.log(e)}
        onLoadStartAsync={this._loadInitialDataAsync.bind(this)}
        onReadyAsync={this._onReadyAsync.bind(this)}>
        {this.rendershop()}
        </LoadingContainer>

        {this.floatbutton()}

        </View>

        </Container>
      )
    }

    async _loadInitialDataAsync() {
      var params = {
        shopid: this.props.shopdetail.id,
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
      let response = await fetch(this.props.apiaddress + 'api/getitemlist',request);

      return response.json();
    }

    async _onReadyAsync(data) {
      return new Promise((resolve) => {
        var shops = [];
        data.result.splice(0,0,this.props.shopdetail);
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

  export default connect(mapStateToProps, bindAction)(ShopDetail);
