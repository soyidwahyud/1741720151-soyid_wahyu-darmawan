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
import {getNakes, addNakes, deleteNakes, updateNakes} from '../../../../Function/NakesFunction'


class NakesTables extends Component {
  constructor() {
    super();
    this.state = {
      id_nakes: '',
      tenaga_kesehatan: '',
      tbl_nakes:[]
    }
    this.onNakes = this.onNakes.bind(this)
    this.routeEdit = this.routeEdit.bind(this);
    this.routeDelete = this.routeDelete.bind(this);
  }
  componentDidMount() {
    this.getAll()
  }
//  nakes
  onNakes = e => {
    this.setState({
      tenaga_kesehatan: e.target.value
    })
  }
//SELECT
  getAll = () => {
    getNakes().then(tbl_nakes => {
      this.setState({
          id_nakes: '',
          tenaga_kesehatan: '',
          tbl_nakes: [...tbl_nakes]
        },
        () => {
          console.log(
            this.state.id_nakes,
            this.state.tenaga_kesehatan)
        })
    })
  }
  //DELETE
  routeDelete = (val, e) =>
  {
    e.preventDefault()
    deleteNakes(val)

    var tbl_nakes = [...this.state.tbl_nakes]
    tbl_nakes.filter((item, index) => {
      if (item[0] === val) {
        tbl_nakes.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_nakes: [...tbl_nakes] })
  }
  //INSERT
  onSubmit = e => {
    e.preventDefault()

    const newNakes={
      tenaga_kesehatan: this.state.tenaga_kesehatan
    }

    addNakes(newNakes)
      .then(() => {
        this.getAll()
      })
  }
//EDIT
  onUpdate = e => {
    e.preventDefault()
    updateNakes(
      this.state.tenaga_kesehatan,
      this.state.id_nakes).then(() => {
      this.getAll()
    })
  }

  routeEdit = (tenaga_kesehatan, id_nakes, e) =>
  {
    e.preventDefault()
    this.setState({
      // id_task: id_task,
      tenaga_kesehatan: tenaga_kesehatan,
      id_nakes: id_nakes
    })
    console.log(id_nakes)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Form</strong> Tenaga Kesehatan
            </CardHeader>
            <CardBody>
              <Form action="" method="post" onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label htmlFor="nf-email">Tenaga Kesehatan</Label>
                  <Input type="text"
                         id="nf-email"
                         name="nf-email"
                         value={this.state.tenaga_kesehatan || ''}
                         onChange={this.onNakes.bind(this)}
                         placeholder="Enter nakes"/>
                  <FormText className="help-block">Input Tenaga Kesehatan</FormText>
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
                <i className="fa fa-align-justify"></i> Tabel Tenaga Kesehatan
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Tenaga Kesehatan</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_nakes.map((tbl_nakes, index) => (
                    <tr key={index}>
                      <td>{tbl_nakes[0]}</td>
                      <td>{tbl_nakes[1]}</td>
                      <td><Button type="submit" size="sm" color="primary" onClick={this.routeEdit.bind(this, tbl_nakes[1], tbl_nakes[0])}><i className="fa fa-dot-circle-o"></i>Edit </Button></td>
                      <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_nakes[0])}><i className="fa fa-ban"></i>Delete </Button></td>
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

export default NakesTables;
