import React, { Component } from 'react';
import {
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col, Form,
  FormGroup, FormText, Input, Label,
  Row,
  Table
} from 'reactstrap';
import {Button} from 'reactstrap'
import {
  getBuku, getIdJenis,
  getIdPenerbit, getIdPenulis,
  addBuku, updateBuku, deleteBuku, getIdNakes
} from '../../../../Function/BukuFunction'

import axios, {post} from 'axios'

class BookTables extends Component {
  constructor() {
    super();
    this.state = {
      //Get
      id_buku:'',
      jenis_buku:'',
      tenaga_kesehatan:'',
      nama_penerbit:'',
      tahun_terbit:'',
      nama_penulis:'',
      //Insert
      kode_buku:'',
      nama_buku:'',
      id_jenis:'',
      id_nakes:'',
      id_penerbit:'',
      id_penulis:'',
      gambar:null,
      userfile:null,
      //Array
      tbl_buku:[],
      idjenis:[],
      idnakes:[],
      idpenerbit:[],
      idpenulis:[]
    }
    this.onKodeBuku = this.onKodeBuku.bind(this);
    this.onNamaBuku = this.onNamaBuku.bind(this);
    this.onIdJenisBuku = this.onIdJenisBuku.bind(this);
    this.onIdNakes = this.onIdNakes.bind(this);
    this.onIdPenerbitBuku = this.onIdPenerbitBuku.bind(this);
    this.onIdPenulisBuku = this.onIdPenulisBuku.bind(this);
    this.onGambarBuku = this.onGambarBuku.bind(this);
    this.onUserFileBuku = this.onUserFileBuku.bind(this);
    this.routeEdit = this.routeEdit.bind(this);
    this.routeDelete = this.routeDelete.bind(this);

   // insert, upload, and edit
  this.onBukuSubmit = this.onBukuSubmit.bind(this)
  this.onBukuUpdate = this.onBukuUpdate.bind(this)
  this.bookUpload = this.bookUpload.bind(this)
  this.bookEdit = this.bookEdit.bind(this)
  }
  componentDidMount() {
    this.getAll()
    this.getIdJenis()
    this.getIdNakes()
    this.getIdPenerbit()
    this.getIdPenulis()
  }
  //  Kode buku
  onKodeBuku(e) {
        this.setState({kode_buku:e.target.value})
    }
  //  nama buku
  onNamaBuku(e) {
        this.setState({nama_buku:e.target.value})
    }
  //  id jenis buku
  onIdJenisBuku(e) {
        this.setState({id_jenis:e.target.value})
    }
  //  id nakes
  onIdNakes(e) {
    this.setState({id_nakes:e.target.value})
  }
  //  id Penerbit buku
  onIdPenerbitBuku(e) {
        this.setState({id_penerbit:e.target.value})
    }
  //  id penulis buku
  onIdPenulisBuku(e) {
        this.setState({id_penulis:e.target.value})
    }
  //  gambar buku
  onGambarBuku(e) {
        this.setState({gambar:e.target.files[0]})
    }
  //  userfile buku
  onUserFileBuku(e) {
        this.setState({userfile:e.target.files[0]})
    }
//SELECT Buku
  getAll = () => {
    getBuku().then(tbl_buku => {
      this.setState({
          id_kriteria: '',
          kode_buku: '',
          nama_buku: '',
          jenis_buku: '',
          tenaga_kesehatan:'',
          nama_penerbit: '',
          tahun_terbit: '',
          nama_penulis: '',
          gambar: null,
          userfile: null,
          tbl_buku: [...tbl_buku]
        },
        () => {
          console.log(
            this.state.id_kriteria,
            this.state.kode_buku,
            this.state.nama_buku,
            this.state.jenis_buku,
            this.state.tenaga_kesehatan,
            this.state.nama_penerbit,
            this.state.tahun_terbit,
            this.state.nama_penulis,
            this.state.gambar,
            this.state.userfile)
        })
    })
  }
  //SELECT Id Jenis
  getIdJenis = () => {
    getIdJenis().then(idjenis => {
      this.setState({
          id_jenis: '',
          jenis_buku: '',
          idjenis: [...idjenis]
        },
        () => {
          console.log(
            this.state.id_jenis,
            this.state.jenis_buku)
        })
    })
  }
  //SELECT Id Jenis
  getIdNakes = () => {
    getIdNakes().then(idnakes => {
      this.setState({
          id_nakes: '',
          tenaga_kesehatan: '',
          idnakes: [...idnakes]
        },
        () => {
          console.log(
            this.state.id_nakes,
            this.state.tenaga_kesehatan)
        })
    })
  }
  //SELECT Id Penerbit
  getIdPenerbit = () => {
    getIdPenerbit().then(idpenerbit => {
      this.setState({
          id_penerbit: '',
          nama_penerbit: '',
          tahun_terbit: '',
          idpenerbit: [...idpenerbit]
        },
        () => {
          console.log(
            this.state.id_penerbit,
            this.state.nama_penerbit,
            this.state.tahun_terbit)
        })
    })
  }
  //SELECT Id Penulis
  getIdPenulis = () => {
    getIdPenulis().then(idpenulis => {
      this.setState({
          id_penulis: '',
          nama_penulis: '',
          idpenulis: [...idpenulis]
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
    deleteBuku(val)

    var tbl_buku = [...this.state.tbl_buku]
    tbl_buku.filter((item, index) => {
      if (item[0] === val) {
        tbl_buku.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_buku: [...tbl_buku] })
  }

// Insert 2
onBukuSubmit(e){
  e.preventDefault() // Stop form submit
  this.bookUpload(
    this.state.kode_buku,
    this.state.nama_buku,
    this.state.id_jenis,
    this.state.id_nakes,
    this.state.id_penerbit,
    this.state.id_penulis,
    this.state.gambar,
    this.state.userfile)
    .then((response)=>{
    console.log(response.data);
  }).then(()=>{
    this.getAll()
  })
}

  bookUpload(kode_buku, nama_buku, id_jenis, id_nakes, id_penerbit, id_penulis, gambar, userfile){
  const url = '/buku';
  const formData = new FormData();

  formData.append('kode_buku', kode_buku)
  formData.append('nama_buku', nama_buku)
  formData.append('id_jenis', id_jenis)
  formData.append('id_nakes', id_nakes)
  formData.append('id_penerbit', id_penerbit)
  formData.append('id_penulis', id_penulis)
  formData.append('gambar', gambar)
  formData.append('userfile', userfile)

  const config = {
   headers: {
                'content-type': 'multipart/form-data'
            }
      }
      return  axios.post(url, formData,config)
}

//EDIT
  onBukuUpdate = e => {
    e.preventDefault()
    this.bookEdit(
      this.state.kode_buku,
      this.state.nama_buku,
      this.state.id_jenis,
      this.state.id_nakes,
      this.state.id_penerbit,
      this.state.id_penulis,
      this.state.gambar,
      this.state.userfile,
      this.state.id_buku)
      .then((response)=>{
        console.log(response.data);
      }).then(()=>{
      this.getAll()
    })
  }
  bookEdit(kode_buku, nama_buku, id_jenis, id_nakes, id_penerbit, id_penulis, gambar, userfile, id_buku){
    const url = `/buku/${id_buku}`;
    const formData2 = new FormData();

    formData2.append('kode_buku', kode_buku)
    formData2.append('nama_buku', nama_buku)
    formData2.append('id_jenis', id_jenis)
    formData2.append('id_nakes', id_nakes)
    formData2.append('id_penerbit', id_penerbit)
    formData2.append('id_penulis', id_penulis)
    formData2.append('gambar', gambar)
    formData2.append('userfile', userfile)
    formData2.append('id_buku', id_buku)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return  axios.put(url, formData2,config)
  }

  routeEdit = (kode_buku, nama_buku, id_jenis, id_nakes, id_penerbit, id_penulis, gambar, userfile, id_buku, e) =>
  {
    e.preventDefault()
    this.setState({
      // id_task: id_task,
      kode_buku: kode_buku,
      nama_buku:nama_buku,
      id_jenis:id_jenis,
      id_nakes:id_nakes,
      id_penerbit:id_penerbit,
      id_penulis:id_penulis,
      gambar:gambar,
      userfile: userfile,
      id_buku: id_buku
    })
    console.log(id_buku)
  }

  render() {
    return (
      <div className="animated fadeIn">
        {/*Form*/}
        <Row>
          <Col xs="12" md="15">
            <Card>
              <CardHeader>
                <strong>Buku </strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" onSubmit={this.onBukuSubmit} className="form-horizontal">
                  {/*Kode Buku*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="kode_buku">Kode Buku</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"
                             id="kode_buku"
                             value={this.state.kode_buku || ''}
                             onChange={this.onKodeBuku.bind(this)}
                             name="kode_buku" placeholder="kode buku" />

                    </Col>
                  </FormGroup>
                  {/*Nama Buku*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="nama_buku">Nama Buku</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"
                             id="nama_buku"
                             value={this.state.nama_buku || ''}
                             onChange={this.onNamaBuku.bind(this)}
                             name="nama_buku" placeholder="nama buku" />

                    </Col>
                  </FormGroup>
                  {/*Jenis Buku*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id_jenis">Pilih Jenis Buku</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             name="select"
                             value={this.state.id_jenis || ''}
                             onChange={this.onIdJenisBuku.bind(this)}
                             id="select">
                        <option value="0">Silahkan dipilih</option>
                        {this.state.idjenis.map((idjenis,index)=>(
                          <option key={index}>{idjenis[0]}. {idjenis[1]} </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  {/*Nakes*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id_nakes">Pilih Tenaga Kesehatan</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             name="select"
                             value={this.state.id_nakes || ''}
                             onChange={this.onIdNakes.bind(this)}
                             id="select">
                        <option value="0">Silahkan dipilih</option>
                        {this.state.idnakes.map((idnakes,index)=>(
                          <option key={index}>{idnakes[0]}. {idnakes[1]} </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  {/*Penerbit*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id_penerbit">Pilih Penerbit Buku</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             name="select"
                             value={this.state.id_penerbit || ''}
                             onChange={this.onIdPenerbitBuku.bind(this)}
                             id="select">
                        <option value="0">Silahkan dipilih</option>
                        {this.state.idpenerbit.map((idpenerbit,index)=>(
                          <option key={index}>{idpenerbit[0]}. {idpenerbit[1] } - ({idpenerbit[2] }) </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  {/*Penulis*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="id_penulis">Pilih Penulis Buku</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select"
                             name="select"
                             value={this.state.id_penulis || ''}
                             onChange={this.onIdPenulisBuku.bind(this)}
                             id="select">
                        <option value="0">Silahkan dipilih</option>
                        {this.state.idpenulis.map((idpenulis,index)=>(
                          <option key={index}>{idpenulis[0]}. {idpenulis[1]} </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  {/*Gambar*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="gambar">Input Gambar</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file"
                             id="gambar"
                             accept="image/jpeg, image/png "
                             files={this.state.gambar || ''}
                             onChange={this.onGambarBuku.bind(this)}
                             name="gambar" />
                    </Col>
                  </FormGroup>
                  {/*Userfile*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="userfile">Input Userfile</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file"
                             id="userfile"
                             accept="application/pdf"
                             files={this.state.userfile || ''}
                             onChange={this.onUserFileBuku.bind(this)}
                             name="userfile" />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" onClick={this.onBukuSubmit.bind(this)} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <br/>
                <br/>
                <Button type="Update" onClick={this.onBukuUpdate.bind(this)} size="sm" color="danger"><i className="fa fa-upload"></i> Update</Button>
              </CardFooter>
            </Card>
          </Col>

          {/*Tabel*/}
          <Col xs="15" lg="15">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Buku
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No Buku</th>
                    <th>Kode Buku</th>
                    <th>Nama Buku</th>
                    <th>Jenis Buku</th>
                    <th>Tenaga Kesehatan</th>
                    <th>Nama Penerbit</th>
                    <th>Tahun Terbit</th>
                    <th>Nama Penulis</th>
                    <th>Gambar</th>
                    <th>User File</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_buku.map((tbl_buku, index) => (
                    <tr key={index}>
                      <td>{tbl_buku[0]}</td>
                      <td>{tbl_buku[1]}</td>
                      <td>{tbl_buku[2]}</td>
                      <td>{tbl_buku[3]}</td>
                      <td>{tbl_buku[4]}</td>
                      <td>{tbl_buku[5]}</td>
                      <td>{tbl_buku[6]}</td>
                      <td>{tbl_buku[7]}</td>
                      <td>{tbl_buku[8]}</td>
                      <td>{tbl_buku[9]}</td>
                      <td><Button type="submit" size="sm" color="primary" onClick={this.routeEdit.bind(this, tbl_buku[1], tbl_buku[2],
                                                                                                             tbl_buku[3], tbl_buku[4],
                                                                                                             tbl_buku[5], tbl_buku[6], tbl_buku[8],
                                                                                                             tbl_buku[7], tbl_buku[0])}><i className="fa fa-dot-circle-o"></i>Edit </Button></td>
                      <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_buku[0])}><i className="fa fa-ban"></i>Delete </Button></td>
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

export default BookTables;
