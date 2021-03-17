import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, FormText, Input, Label, } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {Button} from 'reactstrap'
import {getUser, updateUser} from "../../../../Function/UserFunction";
import {deleteUser} from "../../../../Function/UserFunction";

class UserTables extends Component {
  constructor() {
    super();
    this.state = {
      id_user:'',
      nik:'',
      nama_user:'',
      username_user:'',
      email_user:'',
      password_user:'',
      jabatan:'',
      alamat:'',
      notelp:'',
      tbl_user:[]
    }
    this.routeDelete = this.routeDelete.bind(this);
  }
  componentDidMount() {
    this.getAll()
  }
  onNik = e => {
    this.setState({
      nik: e.target.value
    })
  }
  onUsernameUser = e => {
    this.setState({
      username_user: e.target.value
    })
  }
  onEmailUser = e => {
    this.setState({
      email_user: e.target.value
    })
  }
  onPasswordUser = e => {
    this.setState({
      password_user: e.target.value
    })
  }
  onNamaUser = e => {
    this.setState({
      nama_user: e.target.value
    })
  }
  onAlamat = e => {
    this.setState({
      alamat: e.target.value
    })
  }
  onNotelp = e => {
    this.setState({
      notelp: e.target.value
    })
  }
//SELECT
  getAll = () => {
    getUser().then(tbl_user => {
      this.setState({
          id_user: '',
          nik:'',
          nama_user: '',
          username_user: '',
          email_user: '',
          password_user: '',
          alamat: '',
          notelp: '',
          tbl_user: [...tbl_user]
        },
        () => {
          console.log(
            this.state.id_user,
            this.state.nik,
            this.state.nama_user,
            this.state.username_user,
            this.state.email_user,
            this.state.password_user,
            this.state.jabatan,
            this.state.alamat,
            this.state.notelp)
        })
    })
  }
  //DELETE
  routeDelete = (val, e) =>
  {
    e.preventDefault()
    deleteUser(val)

    var tbl_user = [...this.state.tbl_user]
    tbl_user.filter((item, index) => {
      if (item[0] === val) {
        tbl_user.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_user: [...tbl_user] })
  }
  //EDIT
  onUpdate = e => {
    e.preventDefault()
    updateUser(
      this.state.nik,
      this.state.username_user,
      this.state.email_user,
      this.state.password_user,
      this.state.nama_user,
      this.state.alamat,
      this.state.notelp,
      this.state.id_user).then(() => {
      this.getAll()
    })
  }

  routeEdit = (nik, nama_user, username_user, email_user, password_user, alamat, notelp, id_user, e) =>
  {
    e.preventDefault()
    this.setState({
      // id_task: id_task,
      nik: nik,
      nama_user: nama_user,
      username_user: username_user,
      email_user: email_user,
      password_user: password_user,

      alamat: alamat,
      notelp: notelp,
      id_user: id_user
    })
    console.log(id_user)
  }

  render() {
    return (
      <div className="animated fadeIn">
          <Col xs="15" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel User
              </CardHeader>
              <CardBody>

                  <Form action="" method="post">
                    <FormGroup>
                      <Label htmlFor="nf-email">NIK</Label>
                      <Input type="text"
                             id="nf-email"
                             name="nf-email"
                             value={this.state.nik || ''}
                             onChange={this.onNik.bind(this)}
                             placeholder="Enter NIK"/>
                      <FormText className="help-block">Input NIK</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="nf-email">Nama</Label>
                      <Input type="text"
                             id="nf-email"
                             name="nf-email"
                             value={this.state.nama_user || ''}
                             onChange={this.onNamaUser.bind(this)}
                             placeholder="Enter Nama"/>
                      <FormText className="help-block">Input nama</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="nf-email">Username</Label>
                      <Input type="text"
                             id="nf-email"
                             name="nf-email"
                             value={this.state.username_user || ''}
                             onChange={this.onUsernameUser.bind(this)}
                             placeholder="Enter Username"/>
                      <FormText className="help-block">Input Username</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="nf-email">Email</Label>
                      <Input type="email"
                             id="nf-email"
                             name="nf-email"
                             value={this.state.email_user || ''}
                             onChange={this.onEmailUser.bind(this)}
                             placeholder="Enter Email"/>
                      <FormText className="help-block">Input Email</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="nf-email">Password</Label>
                      <Input type="password"
                             id="nf-email"
                             name="nf-email"
                             value={this.state.password_user || ''}
                             onChange={this.onPasswordUser.bind(this)}
                             placeholder="Enter Password"/>
                      <FormText className="help-block">Input Password</FormText>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="nf-email">Alamat</Label>
                      <Input type="text"
                             id="nf-email"
                             name="nf-email"
                             value={this.state.alamat || ''}
                             onChange={this.onAlamat.bind(this)}
                             placeholder="Enter Alamat"/>
                      <FormText className="help-block">Input Alamat</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="nf-email">Nomer Telfon</Label>
                      <Input type="number"
                             id="nf-email"
                             name="nf-email"
                             value={this.state.notelp || ''}
                             onChange={this.onNotelp.bind(this)}
                             placeholder="Enter Nomer Telfon"/>
                      <FormText className="help-block">Input Nomer Telfon</FormText>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.onUpdate.bind(this)} type="reset" size="sm" color="danger"><i className="fa fa-upload"></i> Update</Button>
                </CardFooter>
            </Card>
          </Col>

          <Row>
            <Col xs="12" lg="18">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Tabel User
                </CardHeader>
                <CardBody>

                <Table responsive>
                  <thead>
                  <tr>
                    <th>No User</th>
                    <th>NIK</th>
                    <th>Nama User</th>
                    <th>Username User</th>
                    <th>Email User</th>
                    <th>Password User</th>
                    <th>Alamat</th>
                    <th>Telp</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_user.map((tbl_user, index) => (
                    <tr key={index}>
                      <td>{tbl_user[0]}</td>
                      <td>{tbl_user[1]}</td>
                      <td>{tbl_user[2]}</td>
                      <td>{tbl_user[3]}</td>
                      <td>{tbl_user[4]}</td>
                      <td>{tbl_user[5]}</td>
                      <td>{tbl_user[7]}</td>
                      <td>{tbl_user[8]}</td>

                      <td><Button type="submit" size="sm" color="primary" onClick={this.routeEdit.bind(this, tbl_user[1], tbl_user[2],
                        tbl_user[3],tbl_user[4],tbl_user[5],tbl_user[7],tbl_user[8],tbl_user[0])}><i className="fa fa-dot-circle-o"></i>Edit </Button></td>
                      <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_user[0])}><i className="fa fa-ban"></i>Delete </Button></td>
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

export default UserTables;
