import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { setUser } from "../../actions/user";
import styles from "./styles";

const background = require("../../../images/shadow.png");

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  if (pw.length > 12) {
    error.password = "max 11 characters";
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = "Weak";
  }
  return error;
};

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.renderInput = this.renderInput.bind(this);
  }

<<<<<<< HEAD
<<<<<<< HEAD
    constructor(props) {
        super(props);
        this.state = {
            visibleHeight: Dimensions.get('window').height,
            scroll: false,
            name: ''
        };
    }

    replaceRoute(route) {
        this.setUser(this.state.name);
        this.props.replaceRoute(route);
    }

    setUser(name) {
        this.props.setUser(name);
    }

    render() {
   

        return (
            <Container theme={myTheme}>
                <View style={styles.container}>
                    <Content> 
                        <Image source={require('../../../images/shadow.png')} style={styles.shadow}>
                            <View style={styles.bg}>
                                <InputGroup style={styles.input}>
                                    <Icon name='ios-person' />
                                    <Input placeholder='EMAIL' onChangeText={(name) => this.setState({name})} />
                                </InputGroup>
                                <InputGroup style={styles.input}>
                                    <Icon name='ios-unlock-outline' />
                                    <Input
                                        placeholder='PASSWORD'
                                        secureTextEntry={true}
                                    />
                                </InputGroup>
                                <Button style={styles.btn} textStyle={{color: '#fff'}} onPress={() => this.replaceRoute('home') }>
                                    Login
                                </Button>
                            </View>
                        </Image>
                    </Content>
                </View>
            </Container>
        )
=======
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
  setUser(name) {
    this.props.setUser(name);
  }
  renderInput({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
<<<<<<< HEAD
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
    }
    return (
      <Item error={hasError}>
        <Icon active name={input.name === "email" ? "person" : "unlock"} />
        <Input
          placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
          {...input}
        />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
              <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
              <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
            </Item>
          : <Text />}
      </Item>
    );
  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Field name="email" component={this.renderInput} />
                <Field name="password" component={this.renderInput} />
                <Button
                  style={styles.btn}
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  <Text>Login</Text>
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}
const LoginSwag = reduxForm(
  {
    form: "test",
    validate
  },
  function bindActions(dispatch) {
    return {
      setUser: name => dispatch(setUser(name))
    };
  }
)(Login);
LoginSwag.navigationOptions = {
  header: null
};
export default LoginSwag;
