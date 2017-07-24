import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";

import styles from "./styles";

class BlankPage extends Component {
 
    popRoute() {
        this.props.popRoute();
    }

    render() {

        const { props: { name, index, list } } = this;

        return (
            <Container theme={myTheme} style={{backgroundColor: '#F9F8F8'}}>
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name='ios-arrow-back' />
                    </Button>

                    <Title>{(name) ? name : 'Blank Page'}</Title>

               
                </Header>

                <Content padder>
                    <Text>
                        { (!isNaN(index)) ? list[index] : 'Create Something Awesome . . .'}
                    </Text>
                </Content>
            </Container>
        )
    } 
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

   
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list
});

export default connect(mapStateToProps, bindAction)(BlankPage);
