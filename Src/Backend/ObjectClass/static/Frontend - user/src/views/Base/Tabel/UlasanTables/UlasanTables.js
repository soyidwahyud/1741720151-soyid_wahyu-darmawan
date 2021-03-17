import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {Button} from 'reactstrap'
import {getUlasan, addUlasan} from "../../../../Function/UlasanFunction";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import FormText from "reactstrap/es/FormText";
import CardFooter from "reactstrap/es/CardFooter";

class UlasanTables extends Component {
  constructor() {
    super();
    this.state = {
      id_ulasan:'',
      nama_depan:'',
      nama_belakang:'',
      email:'',
      judul:'',
      pesan:'',
      tbl_ulasan:[]
    }
    this.onNamaDepan = this.onNamaDepan.bind(this)
    this.onNamaBelakang = this.onNamaBelakang.bind(this)
    this.onEmail = this.onEmail.bind(this)
    this.onJudul = this.onJudul.bind(this)
    this.onPesan = this.onPesan.bind(this)
  }
  componentDidMount() {
    this.getAll()
  }
  getAll = () => {
    getUlasan().then(tbl_ulasan => {
      this.setState({
          id_ulasan:'',
          nama_depan:'',
          nama_belakang:'',
          email:'',
          judul:'',
          pesan:'',
          tbl_ulasan: [...tbl_ulasan]
        },
        () => {
          console.log(
            this.state.id_ulasan,
            this.state.nama_depan,
            this.state.nama_belakang,
            this.state.email,
            this.state.judul,
            this.state.pesan)
        })
    })
  }

  //nama depan
  onNamaDepan = e => {
    this.setState({
      nama_depan: e.target.value
    })
  }
  //nama belakang
  onNamaBelakang = e => {
    this.setState({
      nama_belakang: e.target.value
    })
  }
  //email
  onEmail = e => {
    this.setState({
      email: e.target.value
    })
  }
  //judul
  onJudul = e => {
    this.setState({
      judul: e.target.value
    })
  }
  //pesan
  onPesan = e => {
    this.setState({
      pesan: e.target.value
    })
  }
  //INSERT
  onSubmit = e => {
    e.preventDefault()

    const newUlasan={
      nama_depan: this.state.nama_depan,
      nama_belakang: this.state.nama_belakang,
      email: this.state.email,
      judul: this.state.judul,
      pesan: this.state.pesan
    }

    addUlasan(newUlasan)
      .then(() => {
        this.getAll()
      })
  }



  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="14">
          <Card>
            <CardBody>
              <Form action="" method="post" onSubmit={this.onSubmit}>
                {/*nama depan*/}
                <FormGroup>
                  <Label htmlFor="nama_depan">Nama Depan</Label>
                  <Input type="text"
                         id="nama_depan"
                         name="nama_depan"
                         value={this.state.nama_depan || ''}
                         onChange={this.onNamaDepan.bind(this)}
                         placeholder="Masukan Nama Depan"/>
                </FormGroup>

              {/*nama belakang*/}
                <FormGroup>
                  <Label htmlFor="nama_belakang">Nama Belakang</Label>
                  <Input type="text"
                         id="nama_belakang"
                         name="nama_belakang"
                         value={this.state.nama_belakang || ''}
                         onChange={this.onNamaBelakang.bind(this)}
                         placeholder="Masukan Nama Belakang"/>
                </FormGroup>

              {/* email*/}
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email"
                         id="email"
                         name="email"
                         value={this.state.email || ''}
                         onChange={this.onEmail.bind(this)}
                         placeholder="Masukan Email"/>
                </FormGroup>

              {/*judul*/}
                <FormGroup>
                  <Label htmlFor="judul">Judul Pesan</Label>
                  <Input type="text"
                         id="judul"
                         name="judul"
                         value={this.state.judul || ''}
                         onChange={this.onJudul.bind(this)}
                         placeholder="Masukan Judul Pesan"/>
                </FormGroup>

              {/*  pesan*/}
                <FormGroup>
                  <Label htmlFor="pesan">Isi Pesan</Label>
                  <Input type="textarea"
                         id="pesan"
                         name="pesan"
                         value={this.state.pesan || ''}
                         onChange={this.onPesan.bind(this)}
                         placeholder="Masukan Isi Pesan"/>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button onClick={this.onSubmit.bind(this)} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
            </CardFooter>
          </Card>
        </Col>
      </div>

    );
  }
}

export default UlasanTables;
