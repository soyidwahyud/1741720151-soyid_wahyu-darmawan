import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Button} from 'reactstrap'
import {getAdmin, deleteAdmin} from '../../../../Function/AdminFunction'

class AdminTables extends Component {
  constructor() {
    super();
    this.state = {
      id_admin:'',
      nama_admin:'',
      username_admin:'',
      email_admin:'',
      password_admin:'',

      tbl_admin:[]
    }

    this.routeDelete = this.routeDelete.bind(this);
  }
  componentDidMount() {
    this.getAll()
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
