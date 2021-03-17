import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {register, getIdJabatan} from "../../../Function/UserFunction";
import {Link} from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      nama_user: '',
      nik:'',
      username_user: '',
      email_user:'',
      password_user:'',

      alamat: '',
      notelp:'',
      //array

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

    const newUser = {
      // id_admin: this.state.id_admin({value: e.value + 1}),
      nik: this.state.nik,
      nama_user: this.state.nama_user,
      username_user: this.state.username_user,
      email_user: this.state.email_user,
      password_user: this.state.password_user,
      alamat: this.state.alamat,
      notelp: this.state.notelp
    }
    register(newUser).then(res => {
      this.props.history.push(`/login`)
      console.log("registered")
    })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number"
                             placeholder="Input NIK"
                             autoComplete="nik"
                             name="nik"
                             value={this.state.nik}
                             onChange={this.onChange}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             placeholder="Nama"
                             autoComplete="nama_user"
                             name="nama_user"
                             value={this.state.nama_user}
                             onChange={this.onChange}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             placeholder="Username"
                             autoComplete="username"
                             name="username_user"
                             value={this.state.username_user}
                             onChange={this.onChange}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             placeholder="Email"
                             autoComplete="email"
                             name="email_user"
                             value={this.state.email_user}
                             onChange={this.onChange}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             placeholder="Password"
                             autoComplete="new-password"
                             name="password_user"
                             value={this.state.password_user}
                             onChange={this.onChange}/>
                    </InputGroup>


                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             placeholder="Alamat"
                             autoComplete="alamat"
                             name="alamat"
                             value={this.state.alamat}
                             onChange={this.onChange}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number"
                             placeholder="Nomer Telfon"
                             autoComplete="notelp"
                             name="notelp"
                             value={this.state.notelp}
                             onChange={this.onChange}/>
                    </InputGroup>

                    <Button type="submit" color="success" block>Create Account</Button>
                    <p>Already have account?</p>
                    <Link to="/login">
                      <Button type="submit" color="primary">Sign in</Button>
                    </Link>
                  </Form>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
