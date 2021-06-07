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
import testPDF from './Draft Jurnal.pdf'

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
        <Row>
          <Col xs="10" md="14">
            <Card>
              <CardBody>
                <Form action="" method="post" onSubmit={this.onSubmit}>
                  {/*nama depan*/}
                  <h1>Ulasan</h1>
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

          <Col xs="10" md="14">
            <Card>
              <CardBody>
                <h4>Lokasi</h4>
                <br/>
                <h6>13530 Rumah Sakit Umum Universitas Kristen Indonesia</h6>
                <h6>Jakarta Timur, DKI Jakarta</h6>
                <br/>
                <h4>Telepon</h4>
                <h6>(021) 8092317</h6>
                <br/>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.099464257705!2d106.86986331473202!3d-6.250623295475574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3eae128b4c9%3A0x28aa0b4ab11d8c0f!2sRumah%20Sakit%20UKI!5e0!3m2!1sen!2sid!4v1611631069885!5m2!1sen!2sid"
                  width="600" height="450"></iframe>
                <br/>

                {/*<iframe src={`${process.env.PUBLIC_URL + "/Draft Jurnal.pdf" }`} width="1000" height="950" />*/}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default UlasanTables;
