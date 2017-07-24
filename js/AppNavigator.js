
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/core';
import { Drawer } from 'native-base';
import { BackAndroid, Platform, StatusBar } from 'react-native';
import { closeDrawer } from './actions/drawer';
import { popRoute } from './actions/route';
import Navigator from 'Navigator';

import Login from './components/login/';
import Home from './components/home/';
import BlankPage from './components/blankPage/';
import Becometomerchant from './components/becometomerchant/';
import Shops from  './components/shops/';
import Orders from  './components/orders/';
import Orderdetail from  './components/orders/orderdetail';

import Mapdetail from './components/mapdetail/';
import ShopDetail from './components/shopdetail/';
import Basket from './components/shopdetail/basket';
import Confirmorder from './components/shopdetail/confirmorder';
import Register from './components/register/';
import Otp from './components/register/otp';
import Verifyotp from './components/register/verifyotp';
import Lastregister from './components/register/lastregister';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sideBar';
import { statusBarColor } from "./themes/base-theme";

Navigator.prototype.replaceWithAnimation = function (route) {
  const activeLength = this.state.presentedIndex + 1;
  const activeStack = this.state.routeStack.slice(0, activeLength);
  const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
  const nextStack = activeStack.concat([route]);
  const destIndex = nextStack.length - 1;
  const nextSceneConfig = this.props.configureScene(route, nextStack);
  const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

  const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
  this._emitWillFocus(nextStack[destIndex]);
  this.setState({
    routeStack: nextStack,
    sceneConfigStack: nextAnimationConfigStack,
  }, () => {
    this._enableScene(destIndex);
    this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
      this.immediatelyResetRouteStack(replacedStack);
    });
  });
};

export var globalNav = {};

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=>{
  const defaultReducer = Reducer(params);
  return (state, action)=>{
    var currentState = state;

    if(currentState){
      while (currentState.children){
        currentState = currentState.children[currentState.index]
      }
    }
    return defaultReducer(state, action);
  }
};

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.2, shadowRadius:3},
}

class AppNavigator extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    globalNav.navigator = this._navigator;

    this.props.store.subscribe(() => {
      if(this.props.store.getState().drawer.drawerState == 'opened')
      this.openDrawer();

      if(this.props.store.getState().drawer.drawerState == 'closed')
      this._drawer.close();
    });

    BackAndroid.addEventListener('hardwareBackPress', () => {
      var routes = this._navigator.getCurrentRoutes();

      if(routes[routes.length - 1].id == 'home' || routes[routes.length - 1].id == 'login') {
        return false;
      }
      else {
        this.popRoute();
        return true;
      }
    });
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if(this.props.store.getState().drawer.drawerState == 'opened') {
      this._drawer.close();
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <Drawer
      ref={(ref) => this._drawer = ref}
      type="overlay"
      styles={drawerStyles}
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
      content={<SideBar navigator={this._navigator} />}
      tapToClose={true}
      acceptPan={false}
      onClose={() => this.closeDrawer()}
      openDrawerOffset={0.2} // 20% gap on the right side of drawer
      panCloseMask={0.2}
      negotiatePan={false}>
      <StatusBar
      backgroundColor={statusBarColor}
      barStyle="light-content"
      />
      <Navigator
      ref={(ref) => this._navigator = ref}
      configureScene={(route) => {
        return Navigator.SceneConfigs.FloatFromRight;
      }}
      initialRoute={{id: (Platform.OS === "android") ? 'splashscreen' : 'Home', statusBarHidden: true}}
      renderScene={this.renderScene}
      />
      </Drawer>
    );
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case 'splashscreen':
      return <SplashPage navigator={navigator} />;
      case 'login':
      return <Login navigator={navigator} />;
      case 'home':
      return <Home navigator={navigator} />;
      case 'shops':
      return <Shops navigator={navigator} />;
      case 'orders':
      return <Orders navigator={navigator} />;
      case 'account':
      return <Register navigator={navigator} />;
      case 'otp':
      return <Otp navigator={navigator} />;
      case 'verifyotp':
      return <Verifyotp navigator={navigator} />;
      case 'lastregister':
      return <Lastregister navigator={navigator} />;
      case 'becometomerchant':
      return <Becometomerchant navigator={navigator} />;
      case 'blankPage':
      return <BlankPage navigator={navigator} />;
      case 'shopdetail':
      return <ShopDetail navigator={navigator} />;
      case 'orderdetail':
      return <Orderdetail navigator={navigator} />;
      case 'basket':
      return <Basket navigator={navigator} />;
      case 'confirmorder':
      return <Confirmorder navigator={navigator} />;
      case 'mapdetail':
      return <Mapdetail navigator={navigator} />;
      default :
      return <Home navigator={navigator}  />;
    }
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: () => dispatch(popRoute())
  }
}

const mapStateToProps = (state) => {
  return {
    drawerState: state.drawer.drawerState
  }
}

export default connect(mapStateToProps, bindAction) (AppNavigator);
