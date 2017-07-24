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
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  render() {
    const { props: { name, index, list } } = this;
    console.log(this.props.navigation, "000000000");
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{name ? this.props.name : "Blank Page"}</Title>
          </Body>

          <Right />
        </Header>

        <Content padder>
          <Text>
            {this.props.navigation.state.params.name.item !== undefined
              ? this.props.navigation.state.params.name.item
              : "Create Something Awesome . . ."}
          </Text>
        </Content>
      </Container>
    );
  }
<<<<<<< HEAD
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
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
