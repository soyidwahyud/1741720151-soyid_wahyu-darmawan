import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col, Form, FormGroup, FormText, Input, Label,
  Row,
  Table
} from 'reactstrap';

import {getKriteria, updateKriteria} from '../../../../Function/KriteriaFunction'
import axios from "axios";
import {Pie, Doughnut} from "react-chartjs-2";


class KriteriaTables extends Component {
  constructor() {
    super();
    this.state = {
      id_kriteria:'',
      kode:'',
      nama_kriteria:'',
      bobot:'',
      tipe_kriteria:'',
      //  Grafik
      grafik_bobot:{},

      tbl_kriteria:[]
    }
    this.onKode = this.onKode.bind(this)
    this.onBobot = this.onBobot.bind(this)
    this.onTipeKriteria = this.onTipeKriteria.bind(this)
  }
  componentDidMount() {
    this.getAll()
    this.getGrafikBobotKriteria()
  }
  //Get Grafik Bobot
  getGrafikBobotKriteria = () =>{
    axios.get('/grafik_bobot_kriteria')
      .then(res => {
        console.log(res)
        const nilai_bobot = res.data
        let nama_kriteria = []
        let bobot = []
        nilai_bobot.forEach(record => {
          nama_kriteria.push(record.nama_kriteria)
          bobot.push(record.bobot)
        })
        this.setState({
          grafik_bobot: {
            labels: nama_kriteria,
            datasets:[
              {
                label: 'Bobot Kriteria',
                data: bobot,
                backgroundColor: [
                  "#3cb371",
                  "#0000FF",
                  "#9966FF",
                  "#4C4CFF",
                  "#00FFFF",
                  "#f990a7",
                  "#aad2ed",
                  "#FF00FF",
                  "Blue",
                  "Red"
                ]
              }
            ]
          }
        })
      })
  }

  //  kode
  onKode = e => {
    this.setState({
      kode: e.target.value
    })
  }
  //  bobot
  onBobot = e => {
    this.setState({
      bobot: e.target.value
    })
  }
  //  tipe_kriteria
  onTipeKriteria = e => {
    this.setState({
      tipe_kriteria: e.target.value
    })
  }

  //SELECT
  getAll = () => {
    getKriteria().then(tbl_kriteria => {
      this.setState({
          id_kriteria: '',
          kode: '',
          nama_kriteria: '',
          bobot: '',
          tipe_kriteria: '',
          tbl_kriteria: [...tbl_kriteria]
        },
        () => {
          console.log(
            this.state.id_kriteria,
            this.state.kode,
            this.state.nama_kriteria,
            this.state.bobot,
            this.state.tipe_kriteria)
        })
    })
  }

  //EDIT
  onUpdate = e => {
    e.preventDefault()
    updateKriteria(
      this.state.kode,
      this.state.nama_kriteria,
      this.state.bobot,
      this.state.tipe_kriteria,
      this.state.id_kriteria).then(() => {
      this.getAll()
    }).then(()=>{
      this.getGrafikBobotKriteria()
    })
  }

  routeEdit = (kode, nama_kriteria, bobot, tipe_kriteria, id_kriteria, e) =>
  {
    e.preventDefault()
    this.setState({
      // id_task: id_task,
      kode: kode,
      nama_kriteria: nama_kriteria,
      bobot: bobot,
      tipe_kriteria:tipe_kriteria,
      id_kriteria: id_kriteria
    })
    console.log(id_kriteria)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {/*Form*/}
          <Col xs="12" md="3">
            <Card>
              <CardHeader>
                <strong>Form</strong> Kriteria Buku
              </CardHeader>
              <CardBody>
                <Form action="" method="post" >
                  {/*kode*/}
                  <FormGroup>
                    <Label htmlFor="kode">Kode Buku</Label>
                    <Input type="text"
                           id="kode"
                           name="kode"
                           // disabled={true}
                           value={this.state.kode || ''}
                           onChange={this.onKode.bind(this)}
                           placeholder="Enter Kode Buku"/>
                    <FormText className="help-block">Input Kode Buku</FormText>
                  </FormGroup>
                  {/*nama kriteria*/}
                  <FormGroup>
                    <Label htmlFor="nama_kriteria">Nama Kriteria</Label>
                    <Input type="text"
                           id="nama_kriteria"
                           name="nama_kriteria"
                           disabled={true}
                           value={this.state.nama_kriteria || ''}
                           placeholder="Enter Nama Kriteria"/>
                    <FormText className="help-block">Input Nama Kriteria</FormText>
                  </FormGroup>
                  {/*bobot*/}
                  <FormGroup>
                    <Label htmlFor="bobot">Bobot Buku</Label>
                    <Input type="text"
                           id="bobot"
                           name="bobot"
                      // disabled={true}
                           value={this.state.bobot || ''}
                           onChange={this.onBobot.bind(this)}
                           placeholder="Enter Bobot Buku"/>
                    <FormText className="help-block">Input Bobot Buku</FormText>
                  </FormGroup>
                  {/*tipe kriteria*/}
                  <FormGroup>
                    <Label htmlFor="tipe_kriteria">Tipe Kriteria Buku</Label>
                    <Input type="select"
                           id="tipe_kriteria"
                           name="tipe_kriteria"
                      // disabled={true}
                           value={this.state.tipe_kriteria || ''}
                           onChange={this.onTipeKriteria.bind(this)}
                    >
                      <option value="0">Silahkan dipilih</option>
                      <option value="benefit">benefit</option>
                      <option value="cost">cost</option>
                    </Input>
                    <FormText className="help-block">Input Tipe Kriteria Buku</FormText>
                  </FormGroup>

                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.onUpdate.bind(this)} type="reset" size="sm" color="danger"><i className="fa fa-upload"></i> Update</Button>
              </CardFooter>
            </Card>
          </Col>

          {/*Grafik*/}
          <Col xs="12" md="7">
            <Card>
              <CardHeader>
                <strong>Grafik</strong> Kriteria Buku
              </CardHeader>
              <CardBody>
                <Doughnut data={this.state.grafik_bobot}
                     options={{maintainAspectRatio: true}}
                />
              </CardBody>
            </Card>
          </Col>

          {/*Tabel*/}
          <Col xs="12" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Kriteria Buku
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No Kriteria Buku</th>
                    <th>Kode</th>
                    <th>Nama Kriteria</th>
                    <th>Bobot</th>
                    <th>Tipe Kriteria</th>
                    <th>Update</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_kriteria.map((tbl_kriteria, index) => (
                    <tr key={index}>
                      <td>{tbl_kriteria[0]}</td>
                      <td>{tbl_kriteria[1]}</td>
                      <td>{tbl_kriteria[2]}</td>
                      <td>{tbl_kriteria[3]}</td>
                      <td>{tbl_kriteria[4]}</td>
                      <td><Button type="submit" size="sm" color="primary" onClick={this.routeEdit.bind(this, tbl_kriteria[1], tbl_kriteria[2], tbl_kriteria[3], tbl_kriteria[4], tbl_kriteria[0])}><i className="fa fa-dot-circle-o"></i>Edit </Button></td>
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

export default KriteriaTables;
