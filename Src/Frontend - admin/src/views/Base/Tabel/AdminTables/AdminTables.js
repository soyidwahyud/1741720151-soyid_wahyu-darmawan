import React, { Component } from 'react';
import {
  Badge,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col,
  Form, FormGroup, FormText, Input, Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';
import {Button} from 'reactstrap'
import {getAdmin, deleteAdmin, register} from '../../../../Function/AdminFunction'
import {addPenulis} from "../../../../Function/PenulisFunction";

class AdminTables extends Component {
  constructor() {
    super();
    this.state = {
      id_admin:'',
      nama_admin:'',
      username_admin:'',
      email_admin:'',
      password_admin:'',
      errors: {},

      tbl_admin:[]
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.routeDelete = this.routeDelete.bind(this);
  }
  componentDidMount() {
    this.getAll()
  }
  // onNamaAdmin
  onNamaAdmin = e => {
    this.setState({
      nama_admin: e.target.value
    })
  }
  // onUsernameAdmin
  onUsernameAdmin = e => {
    this.setState({
      username_admin: e.target.value
    })
  }
  //onEmailAdmin
  onEmailAdmin = e => {
    this.setState({
      email_admin: e.target.value
    })
  }
  //onPasswordAdmin
  onPasswordAdmin = e => {
    this.setState({
      password_admin: e.target.value
    })
  }

  //    onChange
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
//    onSubmit
  onSubmit(e){
    e.preventDefault()

    const newAdmin = {
      // id_admin: this.state.id_admin({value: e.value + 1}),
      username_admin: this.state.username_admin,
      email_admin: this.state.email_admin,
      password_admin: this.state.password_admin,
      nama_admin: this.state.nama_admin
    }
    register(newAdmin)
      .then(() => {
        this.getAll()
      })
  }

  //SELECT
  getAll = () => {
    getAdmin().then(tbl_admin => {
      this.setState({
          id_admin: '',
          nama_admin: '',
          username_admin: '',
          email_admin: '',
          password_admin: '',
          tbl_admin: [...tbl_admin]
        },
        () => {
          console.log(
            this.state.id_admin,
            this.state.nama_admin,
            this.state.username_admin,
            this.state.email_admin,
            this.state.password_admin)
        })
    })
  }
  //DELETE
  routeDelete = (val, e) =>
  {
    e.preventDefault()
    deleteAdmin(val)

    var tbl_admin = [...this.state.tbl_admin]
    tbl_admin.filter((item, index) => {
      if (item[0] === val) {
        tbl_admin.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_admin: [...tbl_admin] })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="15" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Admin
              </CardHeader>
              <CardBody>

                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="nf-email">Nama Admin</Label>
                    <Input type="text"
                           id="nf-email"
                           name="nf-email"
                           value={this.state.nama_admin || ''}
                           onChange={this.onNamaAdmin.bind(this)}
                           placeholder="Masukan Nama"/>
                    <FormText className="help-block">Input Nama</FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Username</Label>
                    <Input type="text"
                           id="nf-email"
                           name="nf-email"
                           value={this.state.username_admin || ''}
                           onChange={this.onUsernameAdmin.bind(this)}
                           placeholder="Enter Nama"/>
                    <FormText className="help-block">Input Username</FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-email">Email</Label>
                    <Input type="email"
                           id="nf-email"
                           name="nf-email"
                           value={this.state.email_admin || ''}
                           onChange={this.onEmailAdmin.bind(this)}
                           placeholder="Enter Email"/>
                    <FormText className="help-block">Input Email</FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Password</Label>
                    <Input type="password"
                           id="nf-email"
                           name="nf-email"
                           value={this.state.password_admin || ''}
                           onChange={this.onPasswordAdmin.bind(this)}
                           placeholder="Enter Password"/>
                    <FormText className="help-block">Input Password</FormText>
                  </FormGroup>


                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.onSubmit.bind(this)} type="reset" size="sm" color="danger"><i className="fa fa-upload"></i> Add</Button>
              </CardFooter>
            </Card>
          </Col>

          <Col xs="15" lg="15">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Admin
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No Admin</th>
                    <th>Nama Admin</th>
                    <th>Username Admin</th>
                    <th>Email Admin</th>
                    <th>Password Admin</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_admin.map((tbl_admin, index) => (
                    <tr key={index}>
                      <td>{tbl_admin[0]}</td>
                      <td>{tbl_admin[1]}</td>
                      <td>{tbl_admin[4]}</td>
                      <td>{tbl_admin[2]}</td>
                      <td>{tbl_admin[3]}</td>

                      <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_admin[0])}><i className="fa fa-ban"></i>Delete </Button></td>
                    </tr>
                  ))}
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>


      </div>

    );
  }
}

export default AdminTables;
