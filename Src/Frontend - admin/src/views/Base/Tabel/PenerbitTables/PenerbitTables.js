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
import {getPenerbit, addPenerbit, updatePenerbit, deletePenerbit} from '../../../../Function/PenerbitFunction'
import {addJenis, deleteJenis, getJenis, updateJenis} from "../../../../Function/JenisFunction";

class PenerbitTables extends Component {
  constructor() {
    super();
    this.state = {
      id_penerbit:'',
      nama_penerbit:'',
      tahun_terbit:'',
      tbl_penerbit:[]
    }
    this.onPenerbit = this.onPenerbit.bind(this)
    this.routeEdit = this.routeEdit.bind(this);
    this.routeDelete = this.routeDelete.bind(this);

  }
  componentDidMount() {
    this.getAll()
  }
  //  Nama Penerbit
  onPenerbit = e => {
    this.setState({
      nama_penerbit: e.target.value
    })
  }
  // Tahun Terbit
  onTahunTerbit = e => {
    this.setState({
      tahun_terbit: e.target.value
    })
  }
  //SELECT
  getAll = () => {
    getPenerbit().then(tbl_penerbit => {
      this.setState({
          id_penerbit: '',
          nama_penerbit: '',
          tahun_terbit: '',
          tbl_penerbit: [...tbl_penerbit]
        },
        () => {
          console.log(
            this.state.id_penerbit,
            this.state.nama_penerbit,
            this.state.tahun_terbit)
        })
    })
  }

  //DELETE
  routeDelete = (val, e) =>
  {
    e.preventDefault()
    deletePenerbit(val)

    var tbl_penerbit = [...this.state.tbl_penerbit]
    tbl_penerbit.filter((item, index) => {
      if (item[0] === val) {
        tbl_penerbit.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_penerbit: [...tbl_penerbit] })
  }
  //INSERT
  onSubmit = e => {
    e.preventDefault()

    const newPenerbit={
      nama_penerbit: this.state.nama_penerbit,
      tahun_terbit: this.state.tahun_terbit
    }

    addPenerbit(newPenerbit)
      .then(() => {
        this.getAll()
      })
  }
//EDIT
  onUpdate = e => {
    e.preventDefault()
    updatePenerbit(
      this.state.nama_penerbit,
      this.state.tahun_terbit,
      this.state.id_penerbit).then(() => {
      this.getAll()
    })
  }

  routeEdit = (nama_penerbit, tahun_terbit, id_penerbit, e) =>
  {
    e.preventDefault()
    this.setState({
      // id_task: id_task,
      nama_penerbit: nama_penerbit,
      tahun_terbit: tahun_terbit,
      id_penerbit: id_penerbit
    })
    console.log(id_penerbit)
  }
  render() {
    return (
      <div className="animated fadeIn">

        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <strong>Form</strong> Penerbit
            </CardHeader>
            <CardBody>
              <Form action="" method="post" onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label htmlFor="nf-email">Nama Penerbit</Label>
                  <Input type="text"
                         id="nf-email"
                         name="nf-email"
                         value={this.state.nama_penerbit || ''}
                         onChange={this.onPenerbit.bind(this)}
                         placeholder="Enter Penerbit"/>
                  <FormText className="help-block">Input Penerbit</FormText>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="nf-email">Tahun Terbit</Label>
                  <Input type="text"
                         id="nf-email"
                         name="nf-email"
                         value={this.state.tahun_terbit || ''}
                         onChange={this.onTahunTerbit.bind(this)}
                         placeholder="Enter Tahun Penerbit"/>
                  <FormText className="help-block">Input Tahun Terbit</FormText>
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
                <i className="fa fa-align-justify"></i> Tabel Penerbit Buku
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No Penerbit Buku</th>
                    <th>Nama Penerbit</th>
                    <th>Tahun Terbit</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_penerbit.map((tbl_penerbit, index) => (
                    <tr key={index}>
                      <td>{tbl_penerbit[0]}</td>
                      <td>{tbl_penerbit[1]}</td>
                      <td>{tbl_penerbit[2]}</td>
                      <td><Button type="submit" size="sm" color="primary" onClick={this.routeEdit.bind(this, tbl_penerbit[1], tbl_penerbit[2], tbl_penerbit[0])}><i className="fa fa-dot-circle-o"></i>Edit </Button></td>
                      <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_penerbit[0])}><i className="fa fa-ban"></i>Delete </Button></td>
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

export default PenerbitTables;
