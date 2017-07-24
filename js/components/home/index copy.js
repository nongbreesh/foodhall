
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TouchableOpacity } from 'react-native';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import { replaceRoute, replaceOrPushRoute ,pushNewRoute} from '../../actions/route';

import { Container, Header, Title, Content, View, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import myTheme from '../../themes/base-theme';
import styles from './styles';

class Home extends Component {


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
                    <Title>{(this.props.name) ? this.props.name : 'Address'}</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>

                <Content>
                    <Grid style={{marginTop: 20}}>
                        {this.props.list.map((item, i) =>
                            <Row key={i}>
                                <TouchableOpacity style={styles.row} onPress={() => this.replaceRoute('blankPage', i)} >
                                    <Text style={styles.text}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            </Row>
                        )}
                            <Row>
                                <TouchableOpacity style={styles.row}  onPress={() => this.replaceRoute('login')} >
                                    <Text style={styles.text}>
                                  Logout
                                    </Text>
                                </TouchableOpacity>
                            </Row>
                    </Grid>
                </Content>
            </Container>
        )
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

export default connect(mapStateToProps, bindAction)(Home);
