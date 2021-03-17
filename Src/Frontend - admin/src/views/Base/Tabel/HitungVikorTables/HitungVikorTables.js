import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import {getMatriks, getNilaiMax, getNilaiMin} from '../../../../Function/VikorFunction'


class HitungVikorTables extends Component {
  constructor() {
    super();
    this.state = {
      kode_buku:'',
      kelayakan_isi:'',
      kebahasaan:'',
      penyajian:'',
      kegrafikaan:'',
      matriks_keputusan:[],
      nilai_maks:[],
      nilai_min:[]
    }
  }
  componentDidMount() {
    this.getMatriks()
    this.getNilaiMaks()
    this.getNilaiMin()
  }

  //SELECT Matriks
  getMatriks = () => {
    getMatriks().then(matriks_keputusan => {
      this.setState({
          kode_buku: '',
          kelayakan_isi: '',
          kebahasaan: '',
          penyajian: '',
          kegrafikaan: '',
          matriks_keputusan: [...matriks_keputusan]
        },
        () => {
          console.log(
            this.state.kode_buku,
            this.state.kelayakan_isi,
            this.state.kebahasaan,
            this.state.penyajian,
            this.state.kegrafikaan)
        })
    })
  }
  //SELECT Nilai Maks
  getNilaiMaks = () => {
    getNilaiMax().then(nilai_maks => {
      this.setState({
          kelayakan_isi: '',
          kebahasaan: '',
          penyajian: '',
          kegrafikaan: '',
          nilai_maks: [...nilai_maks]
        },
        () => {
          console.log(
            this.state.kelayakan_isi,
            this.state.kebahasaan,
            this.state.penyajian,
            this.state.kegrafikaan)
        })
    })
  }
  //SELECT Min
  getNilaiMin = () => {
    getNilaiMin().then(nilai_min => {
      this.setState({
          kelayakan_isi: '',
          kebahasaan: '',
          penyajian: '',
          kegrafikaan: '',
          nilai_min: [...nilai_min]
        },
        () => {
          console.log(
            this.state.kelayakan_isi,
            this.state.kebahasaan,
            this.state.penyajian,
            this.state.kegrafikaan)
        })
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {/*Matriks Keputusan*/}
          <Col xs="12" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Matriks Keputusan
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Alternatif</th>
                    <th>C1</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C4</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.matriks_keputusan.map((matriks_keputusan, index) => (
                    <tr key={index}>
                      <td>{matriks_keputusan[0]}</td>
                      <td>{matriks_keputusan[1]}</td>
                      <td>{matriks_keputusan[2]}</td>
                      <td>{matriks_keputusan[3]}</td>
                      <td>{matriks_keputusan[4]}</td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        {/*  Nilai Maks */}
          <Col xs="12" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Nilai Maksimum
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Kelayakan Isi</th>
                    <th>Kebahasaan</th>
                    <th>Penyajian</th>
                    <th>Kegrafikaan</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.nilai_maks.map((nilai_maks, index) => (
                    <tr key={index}>
                      <td>{nilai_maks[0]}</td>
                      <td>{nilai_maks[1]}</td>
                      <td>{nilai_maks[2]}</td>
                      <td>{nilai_maks[3]}</td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        {/*  Nilai Min */}
          <Col xs="12" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Nilai Minimum
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Kelayakan Isi</th>
                    <th>Kebahasaan</th>
                    <th>Penyajian</th>
                    <th>Kegrafikaan</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.nilai_min.map((nilai_min, index) => (
                    <tr key={index}>
                      <td>{nilai_min[0]}</td>
                      <td>{nilai_min[1]}</td>
                      <td>{nilai_min[2]}</td>
                      <td>{nilai_min[3]}</td>
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

export default HitungVikorTables;
