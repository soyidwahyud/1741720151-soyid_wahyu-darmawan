import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {login} from "../../../Function/UserFunction";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username_user: '',
      password_user: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
//    onChange
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
//    onSubmit
  onSubmit(e){
    e.preventDefault()

    const user = {
      username_user: this.state.username_user,
      password_user: this.state.password_user
    }
    login(user).then(res => {

      if(!res.error){
        this.props.history.push(`/beranda`)
        window.location.reload()
      }
      else if (res.error) {
        this.props.history.push(`/404`)
        window.location.reload()
      }
    })
  }

  render() {
    function preventBack() {
      window.history.forward()
    }
    setTimeout("preventBack()", 0)
    window.unload = function () {
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form noValidate onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               placeholder="Username"
                               name="username_user"
                               placeholder="Enter Username"
                               value={this.state.username_user}
                               onChange={this.onChange}
                               autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                               placeholder="Password"
                               name="password_user"
                               placeholder="Enter Password"
                               value={this.state.password_user}
                               onChange={this.onChange}
                               autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                      </Row>
                      <Link to="/forget_password">
                        Forgot Password?
                      </Link>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Sign Up User Click here..</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Login;
