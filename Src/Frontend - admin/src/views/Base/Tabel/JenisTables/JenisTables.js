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
import {getJenis, addJenis, updateJenis, deleteJenis} from '../../../../Function/JenisFunction'
import {addJabatan, deleteJabatan, getJabatan, updateJabatan} from "../../../../Function/NakesFunction";

class JenisTables extends Component {
  constructor() {
    super();
    this.state = {
      id_jenis:'',
      jenis_buku:'',
      tbl_jenis:[]
    }
    this.onJenisBuku = this.onJenisBuku.bind(this)
    this.routeEdit = this.routeEdit.bind(this);
    this.routeDelete = this.routeDelete.bind(this);
  }
  componentDidMount() {
    this.getAll()
  }
//  Jenis Buku
  onJenisBuku = e => {
    this.setState({
      jenis_buku: e.target.value
    })
  }
  //SELECT
  getAll = () => {
    getJenis().then(tbl_jenis => {
      this.setState({
          id_jenis: '',
          jenis_buku: '',
          tbl_jenis: [...tbl_jenis]
        },
        () => {
          console.log(
            this.state.id_jenis,
            this.state.jenis_buku)
        })
    })
  }
  //DELETE
  routeDelete = (val, e) =>
  {
    e.preventDefault()
    deleteJenis(val)

    var tbl_jenis = [...this.state.tbl_jenis]
    tbl_jenis.filter((item, index) => {
      if (item[0] === val) {
        tbl_jenis.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_jenis: [...tbl_jenis] })
  }
  //INSERT
  onSubmit = e => {
    e.preventDefault()

    const newJenis={
      jenis_buku: this.state.jenis_buku
    }

    addJenis(newJenis)
      .then(() => {
        this.getAll()
      })
  }
//EDIT
  onUpdate = e => {
    e.preventDefault()
    updateJenis(
      this.state.jenis_buku,
      this.state.id_jenis).then(() => {
      this.getAll()
    })
  }

  routeEdit = (jenis_buku, id_jenis, e) =>
  {
    e.preventDefault()
    this.setState({
      // id_task: id_task,
      jenis_buku: jenis_buku,
      id_jenis: id_jenis
    })
    console.log(id_jenis)
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Form</strong> Jenis Buku
            </CardHeader>
            <CardBody>
              <Form action="" method="post" onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label htmlFor="nf-email">Jenis Buku</Label>
                  <Input type="text"
                         id="nf-email"
                         name="nf-email"
                         value={this.state.jenis_buku || ''}
                         onChange={this.onJenisBuku.bind(this)}
                         placeholder="Enter Jenis Buku"/>
                  <FormText className="help-block">Input jenis Buku</FormText>
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
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Jenis Buku
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No Jenis Buku</th>
                    <th>Jenis Buku</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>

                  {this.state.tbl_jenis.map((tbl_jenis, index) => (
                    <tr key={index}>
                      <td>{tbl_jenis[0]}</td>
                      <td>{tbl_jenis[1]}</td>
                      <td><Button type="submit" size="sm" color="primary" onClick={this.routeEdit.bind(this, tbl_jenis[1], tbl_jenis[0])}><i className="fa fa-dot-circle-o"></i>Edit </Button></td>
                      <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_jenis[0])}><i className="fa fa-ban"></i>Delete </Button></td>
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

export default JenisTables;
