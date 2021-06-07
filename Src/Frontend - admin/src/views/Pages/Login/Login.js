import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import {login} from "../../../Function/AdminFunction";
import axios, {post} from 'axios'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username_admin: '',
      password_admin: '',
      errors: {},
      error:{}
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

    const admin = {
      username_admin: this.state.username_admin,
      password_admin: this.state.password_admin
    }

    login(admin).then(res => {
      if(!res.error){
        this.props.history.push(`/dashboard`)
        window.location.reload()
      }
      else if (res.error) {
        this.props.history.push(`/404`)
        window.location.reload()
      }

    })

  }

  render() {
    setTimeout("preventBack()", 0)
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
                               name="username_admin"
                               placeholder="Enter Username"
                               value={this.state.username_admin}
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
                               name="password_admin"
                               placeholder="Enter Password"
                               value={this.state.password_admin}
                               onChange={this.onChange}
                               autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                      </Row>
                    </Form>

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
