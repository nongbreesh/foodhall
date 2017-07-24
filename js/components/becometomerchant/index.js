
'use strict';

import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import {
  WebView,
  ActivityIndicator,
} from 'react-native'
import LoadingContainer from 'react-native-loading-container';
import { TouchableOpacity } from 'react-native';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import { replaceRoute, replaceOrPushRoute ,pushNewRoute} from '../../actions/route';

import { Container, Header, Title, Content, View, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import myTheme from '../../themes/base-theme';
import styles from './styles';


 type State = { animating: boolean }; 
class Becometomerchant extends Component {

  constructor(props) {
    super(props);   
  } 
    replaceRoute(route) {
        this.props.pushNewRoute(route);
    }

    navigateTo(route, index) {
        this.props.closeDrawer();
        this.props.setIndex(index);
        this.props.pushNewRoute(route);
    }
 


 
  
    render() {
        return (        
       <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
                <Header> 
                    <Title>{(this.props.name) ? this.props.name : 'เข้ามาร่วมเปิดร้านกับเรา'}</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>

                 <View style={styles.container} >  
                   <LoadingContainer
                  onError={e => console.log(e)}
        onLoadStartAsync={this._loadInitialDataAsync.bind(this)}
        onReadyAsync={this._onReadyAsync.bind(this)}>
                   <WebView
        source={{uri: 'http://leafood.servewellsolution.com/becometomerchant/index'}}
        style={styles.webcomp}
      /> 
                      </LoadingContainer>
                </View>
            </Container>
     
            
        )
    }

  async _loadInitialDataAsync() {
    let response = await fetch('https://www.reddit.com/r/reactnative.json'); 
    return response.json();
  }

  async _onReadyAsync({data: {children: rs}}) {
    return new Promise((resolve) => { 
      this.setState({animating:false}, resolve);
    });
  }
    
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)), 
        setIndex:(index)=>dispatch(setIndex(index))

    }
}

function mapStateToProps(state) {
    return {
        name: state.user.name,
        list: state.list.list
    };
}

export default connect(mapStateToProps, bindAction)(Becometomerchant);
