import React, { Component } from 'react';
import {
  Badge,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col, Form,
  FormGroup, Input, Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';
import {Button} from 'reactstrap'
import {getNilai, getIdBuku, getIdUser, addNilaiBuku, updateNilaiBuku, deleteNilai} from '../../../../Function/NilaiFunction'


class NilaiTables extends Component {
  constructor() {
    super();
    this.state = {
    //  get
      id_nilai_buku : '',
      kode_buku:'',
      nama_buku:'',
      nama_user:'',
    //  Insert
      id_buku:'',
      id_user:'',
      nilai_buku:'',
      kelayakan_isi:'',
      kebahasaan:'',
      penyajian:'',
      kegrafikaan:'',
   // Array
      tbl_nilai_buku:[],
      idbuku:[],
      iduser:[],
    }
    this.onIdBuku = this.onIdBuku.bind(this);
    this.onIdUser = this.onIdUser.bind(this);
    this.onKelayakanIsi = this.onKelayakanIsi.bind(this);
    this.onKebahasaan = this.onKebahasaan.bind(this);
    this.onPenyajian = this.onPenyajian.bind(this);
    this.onKegrafikaan = this.onKegrafikaan.bind(this);
    this.routeEdit = this.routeEdit.bind(this);
    this.routeDelete = this.routeDelete.bind(this);

  }
  componentDidMount() {
    this.getAll()
    this.getIdBuku()
    this.getIdUser()
  }
  //  id buku
  onIdBuku = e => {
    this.setState({
      id_buku: e.target.value,
      nama_buku: e.target.value
    })
  }
  //  id user
  onIdUser = e => {
    this.setState({
      id_user: e.target.value,
      nama_user: e.target.value
    })
  }
  //  kelayakan_isi
  onKelayakanIsi = e => {
    this.setState({
      kelayakan_isi: e.target.value
    })
  }
  //  kebahasaan
  onKebahasaan = e => {
    this.setState({
      kebahasaan: e.target.value
    })
  }
  //  penyajian
  onPenyajian = e => {
    this.setState({
      penyajian: e.target.value
    })
  }
  //  kegrafikaan
  onKegrafikaan = e => {
    this.setState({
      kegrafikaan: e.target.value
    })
  }
  //SELECT Buku
  getAll = () => {
    getNilai().then(tbl_nilai_buku => {
      this.setState({
          id_nilai_buku: '',
          nama_user: '',
          kode_buku: '',
          nama_buku: '',
          kelayakan_isi: '',
          kebahasaan: '',
          penyajian: '',
          kegrafikaan: '',
          tbl_nilai_buku: [...tbl_nilai_buku]
        },
        () => {
          console.log(
            this.state.id_nilai_buku,
            this.state.nama_user,
            this.state.kode_buku,
            this.state.nama_buku,
            this.state.kelayakan_isi,
            this.state.kebahasaan,
            this.state.penyajian,
            this.state.kegrafikaan)
        })
    })
  }
//SELECT Id Buku
  getIdBuku = () => {
    getIdBuku().then(idbuku => {
      this.setState({
          id_buku: '',
          nama_buku: '',
          idbuku: [...idbuku]
        },
        () => {
          console.log(
            this.state.id_buku,
            this.state.nama_buku)
        })
    })
  }
  //SELECT Id User
  getIdUser = () => {
    getIdUser().then(iduser => {
      this.setState({
          id_user: '',
          nama_user: '',
          iduser: [...iduser]
        },
        () => {
          console.log(
            this.state.id_user,
            this.state.nama_user)
        })
    })
  }
  //INSERT
  onSubmit = e => {
    e.preventDefault()

    const newNilai={
      id_user: this.state.id_user,
      id_buku: this.state.id_buku,
      kelayakan_isi: this.state.kelayakan_isi,
      kebahasaan: this.state.kebahasaan,
      penyajian: this.state.penyajian,
      kegrafikaan: this.state.kegrafikaan
    }

    addNilaiBuku(newNilai)
      .then(() => {
        this.getAll()
      })
  }
//EDIT
  onUpdate = e => {
    e.preventDefault()
    updateNilaiBuku(
      this.state.id_user,
      this.state.id_buku,
      this.state.kelayakan_isi,
      this.state.kebahasaan,
      this.state.penyajian,
      this.state.kegrafikaan,
      this.state.id_nilai_buku).then(() => {
      this.getAll()
    })
  }

  routeEdit = (id_user, id_buku, kelayakan_isi, kebahasaan, penyajian, kegrafikaan, id_nilai_buku, e) =>
  {
    e.preventDefault()
    this.setState({
      // id_task: id_task,
      id_user:id_user,
      id_buku:id_buku,
      kelayakan_isi:kelayakan_isi,
      kebahasaan:kebahasaan,
      penyajian:penyajian,
      kegrafikaan:kegrafikaan,
      id_nilai_buku: id_nilai_buku
    })
    console.log(id_nilai_buku)
  }
  //DELETE
  routeDelete = (val, e) =>
  {
    e.preventDefault()
    deleteNilai(val)

    var tbl_nilai_buku = [...this.state.tbl_nilai_buku]
    tbl_nilai_buku.filter((item, index) => {
      if (item[0] === val) {
        tbl_nilai_buku.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_nilai_buku: [...tbl_nilai_buku] })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {/*Form*/}
          <Col xs="12" md="15">
            <Card>
              <CardHeader>
                <strong>Nilai Buku</strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" onSubmit={this.onSubmit} method="POST" encType="multipart/form-data" className="form-horizontal">

                    {/*User*/}
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="id_user">Pilih User</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select"
                               name="select"
                               value={this.state.id_user || ''}
                               onChange={this.onIdUser.bind(this)}
                               id="select">
                          <option value="0">Silahkan dipilih</option>
                          {this.state.iduser.map((iduser,index)=>(
                            <option key={index}>{iduser[0]}. {iduser[1]}</option>
                          ))}
                        </Input>
                      </Col>
                    </FormGroup>

                  {/*Buku*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id_buku">Pilih Buku</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             name="select"
                             value={this.state.id_buku || ''}
                             onChange={this.onIdBuku.bind(this)}
                             id="select">
                        <option value="0">Silahkan dipilih</option>
                        {this.state.idbuku.map((idbuku,index)=>(
                          <option key={index}>{idbuku[0]}. {idbuku[1]} </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>

                  {/*Kelayakan Isi*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="kelayakan_isi">Kelayakan isi</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             id="select"
                             value={this.state.kelayakan_isi || ''}
                             onChange={this.onKelayakanIsi.bind(this)}>
                        <option value="0">Silahkan dipilih</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </Input>
                    </Col>
                  </FormGroup>

                  {/*Kebahasaan*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="kebahasaan">Kebahasaan</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             id="select"
                             value={this.state.kebahasaan || ''}
                             onChange={this.onKebahasaan.bind(this)}>
                        <option value="0">Silahkan dipilih</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </Input>
                    </Col>
                  </FormGroup>

                  {/*Penyajian*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="penyajian">Penyajian</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             id="select"
                             value={this.state.penyajian || ''}
                             onChange={this.onPenyajian.bind(this)}>
                        <option value="0">Silahkan dipilih</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </Input>
                    </Col>
                  </FormGroup>

                  {/*Kegrafikaan*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="kegrafikaan">Kegrafikaan</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             id="select"
                             value={this.state.kegrafikaan || ''}
                             onChange={this.onKegrafikaan.bind(this)}>
                        <option value="0">Silahkan dipilih</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" onClick={this.onSubmit.bind(this)} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <br/>
                <br/>
                <Button type="Update" onClick={this.onUpdate.bind(this)} size="sm" color="danger"><i className="fa fa-upload"></i> Update</Button>
              </CardFooter>
            </Card>
          </Col>
          {/*Table*/}
          <Col xs="12" lg="20">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Penilaian Buku
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No Nilai Buku</th>
                    <th>Nama User</th>
                    <th>Kode Buku</th>
                    <th>Nama Buku</th>
                    <th>Kelayakan Isi</th>
                    <th>Kebahasaan</th>
                    <th>Penyajian</th>
                    <th>Kegrafikaan</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_nilai_buku.map((tbl_nilai_buku, index) => (
                  <tr key={index}>
                    <td>{tbl_nilai_buku[0]}</td>
                    <td>{tbl_nilai_buku[1]}</td>
                    <td>{tbl_nilai_buku[2]}</td>
                    <td>{tbl_nilai_buku[3]}</td>
                    <td>{tbl_nilai_buku[4]}</td>
                    <td>{tbl_nilai_buku[5]}</td>
                    <td>{tbl_nilai_buku[6]}</td>
                    <td>{tbl_nilai_buku[7]}</td>
                    <td><Button type="submit" size="sm" color="primary" onClick={this.routeEdit.bind(this, tbl_nilai_buku[1], tbl_nilai_buku[2],
                      tbl_nilai_buku[3],tbl_nilai_buku[4],tbl_nilai_buku[5],tbl_nilai_buku[6], tbl_nilai_buku[0])}><i className="fa fa-dot-circle-o"></i>Edit </Button></td>
                    <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_nilai_buku[0])}><i className="fa fa-ban"></i>Delete </Button></td>
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

export default NilaiTables;
