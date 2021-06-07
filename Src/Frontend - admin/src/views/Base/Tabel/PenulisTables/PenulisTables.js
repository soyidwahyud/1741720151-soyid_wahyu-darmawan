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
import {getPenulis, addPenulis, updatePenulis, deletePenulis} from '../../../../Function/PenulisFunction'


class PenulisTables extends Component {
  constructor() {
    super();
    this.state = {
      id_penulis:'',
      nama_penulis:'',
      tbl_penulis:[]
    }
    this.routeEdit = this.routeEdit.bind(this);
    this.routeDelete = this.routeDelete.bind(this);
  }
  componentDidMount() {
    this.getAll()
  }
  //  Nama Penulis
  onPenulis = e => {
    this.setState({
      nama_penulis: e.target.value
    })
  }
  //SELECT
  getAll = () => {
    getPenulis().then(tbl_penulis => {
      this.setState({
          id_penulis: '',
          nama_penulis: '',
          tbl_penulis: [...tbl_penulis]
        },
        () => {
          console.log(
            this.state.id_penulis,
            this.state.nama_penulis)
        })
    })
  }

  //DELETE
  routeDelete = (val, e) =>
  {
    e.preventDefault()
    deletePenulis(val)

    var tbl_penulis = [...this.state.tbl_penulis]
    tbl_penulis.filter((item, index) => {
      if (item[0] === val) {
        tbl_penulis.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_penulis: [...tbl_penulis] })
  }
  //INSERT
  onSubmit = e => {
    e.preventDefault()

    const newPenulis={
      nama_penulis: this.state.nama_penulis
    }

    addPenulis(newPenulis)
      .then(() => {
        this.getAll()
      })
  }
//EDIT
  onUpdate = e => {
    e.preventDefault()
    updatePenulis(
      this.state.nama_penulis,
      this.state.id_penulis).then(() => {
      this.getAll()
    })
  }

  routeEdit = (nama_penulis, id_penulis, e) =>
  {
    e.preventDefault()
    this.setState({
      // id_task: id_task,
      nama_penulis: nama_penulis,
      id_penulis: id_penulis
    })
    console.log(id_penulis)
  }
  render() {
    return (
      <div className="animated fadeIn">

        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Form</strong> Penulis
            </CardHeader>
            <CardBody>
              <Form action="" method="post" onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label htmlFor="nf-email">Nama Penulis</Label>
                  <Input type="text"
                         id="nf-email"
                         name="nf-email"
                         value={this.state.nama_penulis || ''}
                         onChange={this.onPenulis.bind(this)}
                         placeholder="Enter Penulis"/>
                  <FormText className="help-block">Input Penulis</FormText>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button onClick={this.onSubmit.bind(this)} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <br/>
              <br/>
              <Button onClick={this.onUpdate.bind(this)} type="reset" size="sm" color="danger"><i className="fa fa-upload"></i> Update</Button>
            </CardFooter>
          </Card>
        </Col>

        <Row>
          <Col xs="12" lg="16">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Penulis Buku
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No Penulis Buku</th>
                    <th>Nama Penulis</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_penulis.map((tbl_penulis, index) => (
                    <tr key={index}>
                      <td>{tbl_penulis[0]}</td>
                      <td>{tbl_penulis[1]}</td>
                      <td><Button type="submit" size="sm" color="primary" onClick={this.routeEdit.bind(this, tbl_penulis[1], tbl_penulis[0])}><i className="fa fa-dot-circle-o"></i>Edit </Button></td>
                      <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_penulis[0])}><i className="fa fa-ban"></i>Delete </Button></td>
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

export default PenulisTables;
