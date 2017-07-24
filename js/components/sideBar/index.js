import {
  Image,
  View,
} from 'react-native'

'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AsyncStorage,
} from 'react-native'
import { closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import { replaceRoute, replaceOrPushRoute } from '../../actions/route';
import { setUser } from '../../actions/user';
import {Content, Text, List, ListItem } from 'native-base';

import styles from './style';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userdetail:null,
    }
  }

  componentDidMount(){
    AsyncStorage.getItem("userdetail").then((value) => {
      this.props.setUser(JSON.parse(value));
      this.setState({userdetail:JSON.parse(value)});
    }).done();
  }

  navigateTo(route) {
    this.props.closeDrawer();
    this.props.setIndex(undefined);
    this.props.replaceOrPushRoute(route);
  }

  _renderUserImg(){
    if(!this.props.user) return;
    if (this.props.user.fbid == '' || this.props.user.fbid == 0){
      return
    }
    else{
      return (<Image
        style={{
          width: 50,
          height: 50,
          marginBottom:8,
          borderRadius: 25
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
          color: "rgba(255,255,255,1)",
          fontSize: 14,
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
          color: "rgba(255,255,255,1)",
          fontSize: 16,
          fontWeight: 'normal',
          fontFamily: 'Helvetica Neue',
        }}>
        {this.props.user.fullname}
        </Text>
      );
    }


    render(){
      return (
        <Content style={styles.sidebar} >
        <Image
        style={{
          height: 150,
          width: null,
        }}
        resizeMode={"cover"}
        source={require('./img/header_bg.png')}
        >
        <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: 'stretch',
          backgroundColor: 'rgba(0,0,0,0)',
          paddingLeft: 16,
          paddingBottom: 8,
        }}>

        {this._renderUserImg()}

        {this._renderFullname()}

        {this._renderEmail()}

        </View>
        </Image>


        <List foregroundColor={'black'}>
        <ListItem  button onPress={() => this.navigateTo('home')} >
        <View
        style={styles.listitem}>
        <Image
        style={{
          width: 25,
          height: 25,
          marginRight:16,
        }}
        resizeMode={"stretch"}
        source={require('./img/ic_address.png')}
        />
        <Text>Address</Text>
        </View>
        </ListItem>
        <ListItem button onPress={() => this.navigateTo('shops')} >
        <View
        style={styles.listitem}>
        <Image
        style={{
          width: 25,
          height: 25,
          marginRight:16,
        }}
        resizeMode={"stretch"}
        source={require('./img/ic_shop.png')}
        />
        <Text>Shops</Text>
        </View>
        </ListItem>
        <ListItem button onPress={() => this.navigateTo('orders')} >
        <View
        style={styles.listitem}>
        <Image
        style={{
          width: 25,
          height: 25,
          marginRight:16,
        }}
        resizeMode={"stretch"}
        source={require('./img/ic_order.png')}
        />
        <Text>Orders</Text>
        </View>
        </ListItem>
        <ListItem button onPress={() => this.navigateTo('account')} >
        <View
        style={styles.listitem}>
        <Image
        style={{
          width: 25,
          height: 25,
          marginRight:16,
        }}
        resizeMode={"stretch"}
        source={require('./img/ic_user.png')}
        />
        <Text>Account</Text>
        </View>
        </ListItem>
        <ListItem button onPress={() => this.navigateTo('becometomerchant')} >
        <View
        style={styles.listitem}>
        <Image
        style={{
          width: 25,
          height: 25,
          marginRight:16,
        }}
        resizeMode={"stretch"}
        source={require('./img/ic_merchant.png')}
        />
        <Text>Become to merchant</Text>
        </View>
        </ListItem>
        </List>
        </Content>
      );
    }
  }

  function bindAction(dispatch) {
    return {
      closeDrawer: ()=>dispatch(closeDrawer()),
      replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
      setIndex:(index)=>dispatch(setIndex(index)),
      setUser:(all)=>dispatch(setUser(all)),
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user.all,
      apiaddress: state.list.apiaddress,
      imageaddress: state.list.imageaddress,
    };
  }

  export default connect(mapStateToProps, bindAction)(SideBar);
